const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
    'https://www.autotrolej.hr/linije/gradske-linije/linija-1/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-1a/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-1b/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-2/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-2a/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-3/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-3a/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-4/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-4a/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-5/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-5a/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-5b/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-6/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-7/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-7a/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-8/',
    'https://www.autotrolej.hr/linije/gradske-linije/linija-13/',
];

(async () => {
    for (const url of urls) {
        console.log(`Scraping: ${url}`);
        const response = await fetch(url);
        const $ = cheerio.load(await response.text());

        let output = '';
        
        $('h3').each((i, el) => {
            const h3Text = $(el).text();
            if (h3Text.includes('Smjer A') || h3Text.includes('Smjer B')) {
                let l3formatted = h3Text.replace('Smjer A', 'Smjer A ').replace('Smjer B', 'Smjer B ');
                output += `${l3formatted}\n`;
            }
        });

        $('li').each((i, el) => {
            const strongText = $(el).find('strong').text();
            const fullLiText = $(el).text();

            if (fullLiText.includes('Sljedeći polasci')) {
                let afterStrong = fullLiText.replace(strongText, '').replace('Vozni red (PDF)', '').trim();
                output += `${strongText} - ${afterStrong}\n`;
            }

        });

        const filename = url.split('/').slice(-2, -1)[0];

        fs.writeFileSync(`${filename}.txt`, output.trim());
        console.log(`Saved to ${filename}.txt!`);
    }
})();