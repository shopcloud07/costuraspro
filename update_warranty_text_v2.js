const fs = require('fs');
const filePath = 'assets/index-CThngms2.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

// The new content structure
const title = "RISCO ZERO: TESTE POR 7 DIAS";
const p1 = "Temos tanta certeza que voc\u00ea vai amar os moldes que oferecemos uma garantia incondicional.";
const p2 = "Se voc\u00ea apenas visualizar e n\u00e3o gostar dos modelos ou simplesmente mudar de ideia, n\u00f3s devolvemos 100% do seu dinheiro. Sem perguntas, sem letras mi\u00fadas. Basta um e-mail.";

// Target the previous update I made
const previousTarget = /w\.jsx\("p",\{className:"text-lg text-slate-600 mb-6 max-w-2xl mx-auto",children:"[^"]*"\}\)/;

const replacement = `w.jsxs("div",{className:"max-w-3xl mx-auto",children:[w.jsx("p",{className:"text-xl font-semibold text-slate-800 mb-4",children:"${p1}"}),w.jsx("p",{className:"text-lg text-slate-600",children:"${p2}"})]})`;

if (fileContent.match(previousTarget)) {
    fileContent = fileContent.replace(previousTarget, replacement);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log('Warranty text updated with full structure.');
} else {
    console.log('Previous target not found.');
}
