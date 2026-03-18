const fs = require('fs');

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix incorrectly closed HTML blocks (replace closing brace with triple backticks)
    content = content.replace(/<\/script>\r?\n\}/g, '<\/script>\n```');
    
    if (file.includes('vjezba_03.qmd')) {
        // Expand Task 28 text
        content = content.replace(
            '28. Solarna jezera su umjetna jezera manjih zapremnina duboka nekoliko metara... Promjena gustoće zadana izrazom $\\rho = \\rho_0 \\cdot \\sqrt{1 + \\tan^2 (\\frac{\\pi z}{4 h})}$. Potrebno je odrediti pretlak na donjem rubu gradijentne zone.',
            '28. Solarna jezera su umjetna jezera manjih zapremnina duboka nekoliko metara, a koriste se za pohranjivanje solarne energije. Podizanje zagrijane vode (smanjene gustoće) prema površini sprečava se dodavanjem soli na dnu jezera. Kod uobičajenih izvedbi gradijentnih solarnih jezera, gustoća vode se povećava u gradijentnoj zoni, kao što je prikazano na slici, pri čemu je promjena gustoće zadana izrazom $\\rho = \\rho_0 \\cdot \\sqrt{1 + \\tan^2 (\\frac{\\pi z}{4 h})}$, pri čemu je $\\rho_0$ - gustoća vode pri površini, z - vertikalna udaljenost mjerena u negativnom vertikalnom smjeru, dok je h geodetska visina gradijentne zone. Ukoliko imamo zadane vrijednosti h = 4 [m], $\\rho_0 = 1040 [kg/m^3]$ , pri čemu debljina površinskog sloja iznosi 0,8 [m], potrebno je odrediti pretlak na donjem rubu gradijentne zone, na slici označeno brojem 2. Prilikom proračuna pretpostaviti gustoću površinskog sloja konstantnom.'
        );
        
        // Expand Task 29 text
        content = content.replace(
            '29. Naftovod i spremnik zraka volumena 1,3[m3] povezani su međusobno manometrom... Odrediti apsolutan tlak u naftovodu $p_n$ i promjenu razlike visina $\\Delta h_{Hg2}$.',
            '29. Naftovod i spremnik zraka volumena 1,3[m3] povezani su međusobno manometrom na način kao što je prikazano na slici. Ukoliko spremnik sadrži 15 [kg] zraka temperature 80[°C], potrebno je odrediti apsolutan tlak u naftovodu, kao i promjenu razlike visina $\\Delta h_{Hg2}$ koja će nastupiti kada se temperatura u spremniku zraka smanji na 20[°C]. Pretpostaviti konstantan tlak u naftovodu, volumen zraka u manometru zanemariti zbog relativno niskog udjela naspram volumena spremnika.'
        );
        
        // Expand Task 30 text
        content = content.replace(
            '30. Gustoću tekućine potrebno je odrediti starim areometrom prikazanim na slici... Odrediti gustoću druge tekućine.',
            '30. Gustoću tekućine potrebno je odrediti starim areometrom prikazanim na slici čiji promjer iznosi $d = 1 [cm]$, a oznake su potpuno izblijedile. Areometar se prvo uranja u vodu, pri čemu se obilježava mjesto na kojemu areometar izvire iz vode (pazeći pri tome da označimo očitanje meniskusa). Potom se areometar ubacuje u drugu tekućinu, te se primjećuje da je očitanje sada na mjestu koje je za $h_2 = 0,5 [cm]$ geodetski više od prethodnog očitanja. Ukoliko je visina očitanja od dna areometra do oznake za vodu iznosila $h_1 = 10 [cm]$, potrebno je odrediti gustoću druge tekućine.'
        );
    }
    
    fs.writeFileSync(file, content, 'utf8');
}

fixFile('C:\\\\Users\\\\mandr\\\\Desktop\\\\MF1_github\\\\vjezba_01.qmd');
fixFile('C:\\\\Users\\\\mandr\\\\Desktop\\\\MF1_github\\\\vjezba_03.qmd');
fixFile('C:\\\\Users\\\\mandr\\\\Desktop\\\\MF1_github\\\\vjezba_04.qmd');
console.log("Done");
