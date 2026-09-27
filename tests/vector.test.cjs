const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const {createCanvas} = require('@napi-rs/canvas');
const sharp = require('sharp');

// The reference canvas is used only by the tests. Inside the adapter's window,
// native drawing is forbidden: only font metrics may come from a canvas.
function surface(width = 220, height = 160) {
  const dom = new JSDOM(`<main><canvas id="physics-scene" class="scene graph" width="${width}" height="${height}" role="img" aria-label="Pressure and force" data-model="hydrostatic" style="max-width:100%"></canvas></main>`, {runScripts: 'outside-only'});
  const w = dom.window;
  let measurements = 0;
  w.HTMLCanvasElement.prototype.getContext = function(kind) {
    assert.equal(kind, '2d');
    const native = createCanvas(1, 1).getContext('2d');
    return new Proxy(native, {
      get(target, key) {
        const value = Reflect.get(target, key, target);
        if (typeof value !== 'function') return value;
        assert.equal(key, 'measureText', `adapter must not use native ${String(key)}`);
        return (...args) => { measurements++; return value.apply(target, args); };
      },
      set(target, key, value) { return Reflect.set(target, key, value, target); }
    });
  };
  w.eval(fs.readFileSync(path.join(__dirname, '../assets/mf1-vector.js'), 'utf8'));
  const original = w.document.getElementById('physics-scene');
  const svg = w.MF1.vectorSurface(original);
  const ctx = svg.getContext('2d');
  return {dom, w, original, svg, ctx, get measurements() { return measurements; }};
}

function serialize(a) { return new a.w.XMLSerializer().serializeToString(a.svg); }
async function raster(a) {
  const {data, info} = await sharp(Buffer.from(serialize(a))).ensureAlpha().raw().toBuffer({resolveWithObject: true});
  return {data, width: info.width, height: info.height};
}
function pixel(image, x, y) {
  assert.ok(x >= 0 && y >= 0 && x < image.width && y < image.height, `sample (${x}, ${y}) lies inside the scene`);
  return Array.from(image.data.subarray((y * image.width + x) * 4, (y * image.width + x) * 4 + 4));
}
function color(image, x, y, expected, tolerance = 5) {
  const actual = pixel(image, x, y);
  for (let k = 0; k < 4; k++) assert.ok(Math.abs(actual[k] - expected[k]) <= tolerance,
    `pixel (${x}, ${y}): ${actual} should match ${expected} (channel ${k})`);
}
function transparent(image, x, y) { assert.ok(pixel(image, x, y)[3] <= 5, `pixel (${x}, ${y}) should remain transparent`); }
function vectorOnly(a) {
  assert.equal(a.svg.querySelector('image, foreignObject, canvas'), null, 'scene contains actual SVG geometry, not an embedded bitmap');
  assert.doesNotMatch(serialize(a), /data:image|\b(?:NaN|Infinity|undefined)\b/);
}
async function check(draw, inspect, width = 220, height = 160) {
  const a = surface(width, height);
  try {
    draw(a.ctx, a);
    vectorOnly(a);
    await inspect(await raster(a), a);
  } finally { a.dom.window.close(); }
}
async function compareNative(draw, points, tolerance = 7) {
  const native = createCanvas(220, 160);
  const reference = native.getContext('2d');
  draw(reference);
  const expected = {data: reference.getImageData(0, 0, 220, 160).data, width: 220, height: 160};
  await check(draw, image => {
    for (const [x, y] of points) color(image, x, y, pixel(expected, x, y), tolerance);
  });
}

test('vector surface replaces the canvas while preserving sizing, identity and accessibility attributes', () => {
  const a = surface(240, 180);
  try {
    assert.equal(a.svg.namespaceURI, 'http://www.w3.org/2000/svg');
    assert.equal(a.svg.localName, 'svg');
    assert.equal(a.w.document.getElementById('physics-scene'), a.svg);
    assert.equal(a.original.isConnected, false);
    for (const attr of ['id', 'class', 'role', 'aria-label', 'data-model', 'style']) {
      assert.equal(a.svg.getAttribute(attr), a.original.getAttribute(attr), `${attr} is preserved`);
    }
    assert.equal(a.svg.width, 240);
    assert.equal(a.svg.height, 180);
    assert.deepEqual(a.svg.getAttribute('viewBox').trim().split(/[\s,]+/).map(Number), [0, 0, 240, 180]);
    assert.equal(a.svg.getContext('2d'), a.ctx);
    assert.equal(a.ctx.canvas, a.svg);
    const methods = ['arc', 'arcTo', 'beginPath', 'clearRect', 'clip', 'closePath', 'createLinearGradient', 'createRadialGradient', 'fill', 'fillRect', 'fillText', 'lineTo', 'measureText', 'moveTo', 'rect', 'restore', 'rotate', 'roundRect', 'save', 'setLineDash', 'setTransform', 'stroke', 'strokeRect', 'strokeText', 'translate'];
    for (const method of methods) assert.equal(typeof a.ctx[method], 'function', `${method} is required by the existing scenes`);
    vectorOnly(a);
  } finally { a.dom.window.close(); }
});

test('fill, stroke, alpha and noncommuting transforms reproduce canvas coordinates', async () => {
  await check(ctx => {
    ctx.fillStyle = '#e02030';
    ctx.translate(70, 30);
    ctx.rotate(Math.PI / 2);
    ctx.translate(6, 0);
    ctx.fillRect(0, 0, 20, 10);
    ctx.setTransform(2, 0, 0, 3, 100, 5);
    ctx.fillStyle = '#1020e0';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(5, 5, 10, 10);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#008040';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 90, 50, 35);
  }, image => {
    color(image, 65, 45, [224, 32, 48, 255]);
    transparent(image, 75, 45);
    transparent(image, 65, 32);
    color(image, 120, 35, [16, 32, 224, 128], 7);
    transparent(image, 105, 35);
    color(image, 20, 105, [0, 128, 64, 255]);
    transparent(image, 40, 105);
  });
});

test('path points capture each command transform and save/restore does not restore the current path', async () => {
  await check(ctx => {
    ctx.fillStyle = '#101010';
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.translate(30, 0);
    ctx.lineTo(10, 10);
    ctx.lineTo(10, 30);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(10, 70);
    ctx.save();
    ctx.lineTo(60, 70);
    ctx.restore();
    ctx.lineTo(60, 100);
    ctx.closePath();
    ctx.fill();
  }, image => {
    color(image, 34, 15, [16, 16, 16, 255]);
    transparent(image, 15, 25);
    color(image, 50, 76, [16, 16, 16, 255]);
    transparent(image, 20, 95);
  });
});

test('a clip established before rotation remains in its original coordinates', async () => {
  await check(ctx => {
    ctx.beginPath();
    ctx.rect(20, 20, 60, 40);
    ctx.clip();
    ctx.translate(50, 50);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#2040e0';
    ctx.fillRect(-100, -100, 200, 200);
  }, image => {
    color(image, 25, 25, [32, 64, 224, 255]);
    color(image, 75, 55, [32, 64, 224, 255]);
    transparent(image, 15, 30);
    transparent(image, 85, 30);
    transparent(image, 30, 65);
  });
});

test('nested clipping intersects and restore recovers the previous clip and paint state', async () => {
  await check(ctx => {
    ctx.fillStyle = '#008040';
    ctx.beginPath(); ctx.rect(20, 20, 100, 70); ctx.clip();
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, 60, 150); ctx.clip();
    ctx.fillStyle = '#e02030'; ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, 200, 150);
    ctx.restore();
    ctx.fillRect(80, 0, 80, 150);
  }, image => {
    color(image, 30, 40, [224, 32, 48, 128], 7);
    transparent(image, 70, 40);
    color(image, 90, 40, [0, 128, 64, 255]);
    transparent(image, 130, 40);
    transparent(image, 30, 100);
  });
});

test('arcTo constructs a tangent quarter circle instead of a sharp or chamfered corner', async () => {
  await check(ctx => {
    ctx.strokeStyle = '#101010'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(10, 20);
    ctx.arcTo(70, 20, 70, 90, 20);
    ctx.lineTo(70, 100); ctx.stroke();
  }, image => {
    color(image, 35, 20, [16, 16, 16, 255]);
    color(image, 64, 26, [16, 16, 16, 255]);
    color(image, 70, 70, [16, 16, 16, 255]);
    transparent(image, 68, 21);
    transparent(image, 54, 32);
  });
});

test('roundRect and full circles retain their interiors and correct corner geometry', async () => {
  await check(ctx => {
    ctx.fillStyle = '#1020e0';
    ctx.beginPath(); ctx.roundRect(20, 20, 80, 60, 12); ctx.fill();
    ctx.beginPath(); ctx.arc(150, 45, 22, 0, 2 * Math.PI); ctx.fill();
    ctx.beginPath(); ctx.arc(150, 110, 22, 2 * Math.PI, 0, true); ctx.fill();
  }, image => {
    color(image, 60, 50, [16, 32, 224, 255]);
    color(image, 21, 50, [16, 32, 224, 255]);
    transparent(image, 21, 21);
    for (const y of [45, 110]) {
      color(image, 150, y, [16, 32, 224, 255]);
      color(image, 168, y, [16, 32, 224, 255]);
      transparent(image, 175, y);
    }
  });
});

test('opposite arc directions and anisotropically transformed arcs match a native geometric reference', async () => {
  await compareNative(ctx => {
    ctx.fillStyle = '#306090';
    ctx.beginPath(); ctx.moveTo(45, 45); ctx.arc(45, 45, 30, 0, Math.PI / 2, false); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(130, 45); ctx.arc(130, 45, 30, 0, Math.PI / 2, true); ctx.closePath(); ctx.fill();
    ctx.setTransform(2, 0, 0, 0.6, 15, 95);
    ctx.beginPath(); ctx.arc(35, 35, 25, 0, 2 * Math.PI); ctx.fill();
  }, [[55, 55], [35, 35], [140, 55], [120, 35], [85, 116], [127, 116], [85, 135]]);
});

test('line dash, cap, width and restored paint properties remain effective', async () => {
  await check(ctx => {
    ctx.strokeStyle = '#008040'; ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.save(); ctx.setLineDash([]); ctx.strokeStyle = '#e02030'; ctx.lineWidth = 9; ctx.restore();
    ctx.beginPath(); ctx.moveTo(10, 30); ctx.lineTo(100, 30); ctx.stroke();
    ctx.setLineDash([]); ctx.lineCap = 'round'; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(30, 80); ctx.lineTo(80, 80); ctx.stroke();
  }, image => {
    color(image, 14, 30, [0, 128, 64, 255]);
    transparent(image, 21, 30);
    color(image, 27, 30, [0, 128, 64, 255]);
    transparent(image, 14, 35);
    color(image, 27, 80, [0, 128, 64, 255]);
    transparent(image, 23, 80);
  });
});

test('linear gradients match canvas when created and painted under different transforms', async () => {
  await compareNative(ctx => {
    ctx.translate(10, 0);
    const g = ctx.createLinearGradient(0, 0, 100, 0);
    g.addColorStop(0, '#ff0000'); g.addColorStop(1, '#0000ff');
    ctx.fillStyle = g;
    ctx.translate(20, 0);
    ctx.fillRect(0, 10, 80, 40);
  }, [[35, 25], [60, 25], [90, 25], [15, 25]]);
});

test('radial gradient colors and opacity reproduce the Moody marker halo without a bitmap', async () => {
  await compareNative(ctx => {
    const g = ctx.createRadialGradient(90, 70, 0, 90, 70, 35);
    g.addColorStop(0, 'rgba(255,100,0,0.9)');
    g.addColorStop(0.5, 'rgba(255,100,0,0.5)');
    g.addColorStop(1, 'rgba(255,100,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(90, 70, 35, 0, 2 * Math.PI); ctx.fill();
  }, [[90, 70], [100, 70], [113, 70], [119, 70], [130, 70]], 10);
});

test('text stays selectable SVG text, preserves special characters, and uses real font metrics', async () => {
  await check((ctx, a) => {
    ctx.font = '18px Arial';
    const reference = createCanvas(1, 1).getContext('2d'); reference.font = ctx.font;
    const label = 'F < ρgV & τ';
    assert.ok(Math.abs(ctx.measureText(label).width - reference.measureText(label).width) < 0.01);
    assert.ok(a.measurements > 0, 'native canvas is limited to text measurement');
    ctx.fillStyle = '#102030'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, 105, 40);
    ctx.strokeStyle = '#e02030'; ctx.lineWidth = 1.5;
    ctx.strokeText('A', 30, 95);
    ctx.save(); ctx.translate(170, 120); ctx.rotate(-Math.PI / 2); ctx.fillText('z / m', 0, 0); ctx.restore();
  }, (image, a) => {
    const labels = Array.from(a.svg.querySelectorAll('text'), node => node.textContent);
    assert.ok(labels.includes('F < ρgV & τ'));
    assert.ok(labels.includes('A'));
    assert.ok(labels.includes('z / m'));
    assert.ok(image.data.some((value, i) => i % 4 === 3 && value > 0), 'labels produce visible vector text');
  });
});

test('partial clearRect erases only the transformed rectangle intersected with the current clip', async () => {
  await compareNative(ctx => {
    ctx.fillStyle = '#204080'; ctx.fillRect(0, 0, 180, 120);
    ctx.save(); ctx.beginPath(); ctx.rect(20, 20, 80, 60); ctx.clip();
    ctx.translate(10, 5); ctx.clearRect(30, 0, 50, 100); ctx.restore();
  }, [[10, 10], [30, 40], [50, 40], [50, 15], [95, 40], [50, 90], [190, 130]]);
});

test('width and height assignments reset drawing, transform, clip, path and context state', async () => {
  const a = surface(180, 120);
  try {
    const ctx = a.ctx;
    ctx.fillStyle = '#e02030'; ctx.globalAlpha = 0.4; ctx.lineWidth = 7;
    ctx.translate(40, 30); ctx.beginPath(); ctx.rect(10, 10, 30, 30); ctx.clip(); ctx.fill();
    a.svg.width = 180; // Assigning even the same dimension resets a real canvas.
    assert.equal(a.svg.getContext('2d'), ctx);
    assert.equal(ctx.globalAlpha, 1);
    assert.equal(ctx.lineWidth, 1);
    ctx.fill();
    let image = await raster(a);
    transparent(image, 60, 50);
    ctx.fillRect(2, 2, 10, 10);
    image = await raster(a);
    color(image, 5, 5, [0, 0, 0, 255]);
    transparent(image, 45, 35);
    a.svg.height = 150;
    assert.equal(a.svg.width, 180);
    assert.equal(a.svg.height, 150);
    assert.deepEqual(a.svg.getAttribute('viewBox').trim().split(/[\s,]+/).map(Number), [0, 0, 180, 150]);
    image = await raster(a);
    assert.equal(image.height, 150);
    transparent(image, 5, 5);
    vectorOnly(a);
  } finally { a.dom.window.close(); }
});

test('nonfinite geometry cannot corrupt later finite geometry or leak invalid SVG numbers', async () => {
  await check(ctx => {
    ctx.fillStyle = '#008040';
    ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(NaN, 60); ctx.lineTo(70, 20); ctx.lineTo(70, 70); ctx.closePath(); ctx.fill();
    ctx.fillRect(Infinity, 0, 20, 20);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(100, 30, 30, 30);
  }, image => {
    color(image, 60, 30, [0, 128, 64, 255]);
    color(image, 110, 40, [0, 128, 64, 255]);
  });
});

test('repeated complete redraws replace obsolete geometry and gradient definitions', async () => {
  await check(ctx => {
    for (let frame = 0; frame < 120; frame++) {
      ctx.clearRect(0, 0, 220, 160);
      const g = ctx.createLinearGradient(0, 0, 100, 0);
      g.addColorStop(0, '#ff0000'); g.addColorStop(1, '#0000ff');
      ctx.fillStyle = g; ctx.fillRect(10, 10, 100, 40);
    }
  }, (image, a) => {
    color(image, 50, 30, [126, 0, 129, 255]);
    assert.ok(a.svg.querySelectorAll('*').length < 50, 'animation redraws do not accumulate invisible old scenes or definitions');
    vectorOnly(a);
  });
});

test('negative rectangle dimensions and individual roundRect corner radii match native geometry', async () => {
  await compareNative(ctx => {
    ctx.fillStyle = '#306090'; ctx.fillRect(60, 50, -40, -30);
    ctx.beginPath(); ctx.rect(110, 50, -30, 40); ctx.fill();
    ctx.strokeStyle = '#306090'; ctx.lineWidth = 4; ctx.strokeRect(170, 80, -30, -30);
    ctx.beginPath(); ctx.roundRect(20, 90, 70, 55, [0, 18, 25, 6]); ctx.fill();
  }, [[30, 30], [65, 30], [90, 70], [115, 70], [140, 65], [155, 65],
    [21, 91], [88, 91], [84, 96], [88, 143], [20, 144], [45, 120]]);
});

test('negative roundRect dimensions reflect the designated corner radii in both axes', async () => {
  // WHATWG requires each negative dimension to flip the radii on that axis:
  // https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-roundrect
  // @napi-rs/canvas 1.0.9 does not do this reliably, so it is not the oracle here.
  // The physical corners are TL=25, TR=6, BR=0 and BL=18 after both reflections.
  await check(ctx => {
    ctx.fillStyle = '#306090';
    ctx.beginPath(); ctx.roundRect(200, 150, -70, -55, [0, 18, 25, 6]); ctx.fill();
  }, image => {
    for (const [x, y] of [[198, 148], [170, 120], [142, 108], [194, 97], [135, 135]]) color(image, x, y, [48, 96, 144, 255]);
    for (const [x, y] of [[131, 96], [131, 149], [199, 95]]) transparent(image, x, y);
  });
});

test('one negative roundRect dimension reverses winding and therefore cuts a nonzero-fill hole', async () => {
  await check(ctx => {
    ctx.fillStyle = '#306090';
    ctx.beginPath(); ctx.rect(20, 20, 100, 100); ctx.roundRect(100, 40, -60, 60, 10); ctx.fill();
    ctx.beginPath(); ctx.rect(130, 20, 80, 100); ctx.roundRect(145, 100, 50, -60, 10); ctx.fill();
  }, image => {
    color(image, 25, 70, [48, 96, 144, 255]);
    color(image, 135, 70, [48, 96, 144, 255]);
    transparent(image, 70, 70);
    transparent(image, 170, 70);
  });
});

test('maxWidth text compression preserves left, center and right anchor positions', async () => {
  await check(ctx => {
    ctx.font = '30px Arial'; ctx.fillStyle = '#102030';
    for (const [align, y] of [['left', 35], ['center', 80], ['right', 125]]) {
      ctx.textAlign = align; ctx.fillText('MMMMMMMM', 110, y, 50);
    }
  }, image => {
    for (const [top, bottom, expectedLeft] of [[0, 44, 110], [45, 89, 85], [90, 134, 60]]) {
      let left = Infinity, right = -Infinity;
      for (let y = top; y <= bottom; y++) for (let x = 0; x < image.width; x++) {
        if (pixel(image, x, y)[3] > 32) { left = Math.min(left, x); right = Math.max(right, x); }
      }
      assert.ok(left >= expectedLeft - 1 && left <= expectedLeft + 3, `compressed label starts at its ${expectedLeft} anchor range, actual ${left}`);
      assert.ok(right <= expectedLeft + 51 && right >= expectedLeft + 45, `compressed label occupies the requested 50 px, actual end ${right}`);
    }
  });
});

test('dash offsets and save/restore survive SVG export with transformed strokes', async () => {
  await compareNative(ctx => {
    ctx.setTransform(1.5, 0, 0, 1.5, 10, 10);
    ctx.strokeStyle = '#008040'; ctx.lineWidth = 3; ctx.setLineDash([10, 6]); ctx.lineDashOffset = 4;
    ctx.save(); ctx.setLineDash([1, 1]); ctx.lineDashOffset = 0; ctx.lineWidth = 10; ctx.restore();
    ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(100, 30); ctx.stroke();
  }, [[14, 55], [24, 55], [35, 55], [43, 55], [47, 55], [57, 55], [14, 61]]);
});

test('bitmap drawing and external paint references are explicitly rejected without changing solid paint', async () => {
  await check(ctx => {
    ctx.fillStyle = '#008040';
    assert.throws(() => { ctx.fillStyle = 'url(https://example.invalid/bitmap.png)'; });
    assert.throws(() => { ctx.strokeStyle = 'url(data:image/png;base64,AAAA)'; });
    assert.throws(() => ctx.drawImage(createCanvas(10, 10), 0, 0));
    assert.throws(() => ctx.createPattern(createCanvas(10, 10), 'repeat'));
    ctx.fillRect(20, 20, 50, 40);
  }, image => color(image, 30, 30, [0, 128, 64, 255]));
});
