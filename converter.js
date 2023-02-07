const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, 'svgs');
const destinationPath = path.join(__dirname, 'renamed-svgs');
fs.readdir(fullPath, (err, files) => {
    if (err) console.log(err);
    const svgFiles = files.filter(f => f.split('.').reverse()[0] === 'svg');

    svgFiles.forEach(svg => {
        const destinationName = kebabize(svg.split('.').reverse()[1]);
        fs.copyFile(`${fullPath}/${svg}`, `${destinationPath}/${destinationName}.svg`, (err) => {
            if (err) throw err;
        });
    });
});


const kebabize = str => {
    return str.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter
            ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
            : letter;
    }).join('');
}
