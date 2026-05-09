const fs = require('fs');
const filePath = 'assets/index-CThngms2.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

// The new message
const newMessage = "Voc\u00ea mostrou interesse nos Moldes de Roupa, ent\u00e3o queremos te ajudar. Leve o ARSENAL PREMIUM (Completo) com um pre\u00e7o exclusivo agora.";

// Target the entire div containing the offer in the popup
const targetDiv = /w\.jsxs\("div",\{className:"bg-primary\/5 border border-primary\/20 rounded-2xl p-5 mb-5",children:\[w\.jsxs\("p",\{className:"font-heading font-bold text-foreground text-lg mb-3",children:\["Leve o ",w\.jsx\("span",\{className:"text-primary",children:"ARSENAL PREMIUM"\}\)," completo"\]\}\),w\.jsx\("ul",\{className:"space-y-2 text-left mb-4",children:\["Mais de 1\.500 Moldes Prontos Para Uso","Modelos Femininos, Masculinos e Infantis","Acesso Vital\u00edcio","Garantia de 7 Dias","Curso de Corte e Costura \(Em v\u00eddeo aulas\)","Tabela de Medidas Profissional","Manual T\u00e9cnico de Modelagem","Suporte para Tirar D\u00favidas"\]\.map\(t=>w\.jsxs\("li",\{className:"flex items-start gap-2 text-sm",children:\[w\.jsx\(xf,\{className:"w-4 h-4 text-green-600 shrink-0 mt-0\.5"\}\),t\]\},t\)\)\}\),w\.jsxs\("p",\{className:"text-muted-foreground text-\[10px\] flex items-center justify-center gap-1",children:\[w\.jsx\([a-zA-Z0-9_]+,\{className:"w-3 h-3 text-gold fill-gold"\}\),"97,32% escolhem este pacote"\]\}\)\]\}\)/;

// Replacement: Just the message in a nice paragraph
const replacement = `w.jsx("div",{className:"bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6",children:w.jsx("p",{className:"text-foreground font-medium text-base leading-relaxed",children:"${newMessage}"})})`;

if (fileContent.match(targetDiv)) {
    fileContent = fileContent.replace(targetDiv, replacement);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log('Popup content replaced with message.');
} else {
    // Try matching only the parts
    console.log('Target div not found, trying partial replacement...');
    const messageTag = `w.jsx("p",{className:"text-foreground font-medium text-base leading-relaxed",children:"${newMessage}"})`;
    
    // Find ESPERA! and replace everything between it and the price section
    const startMarker = 'children:"ESPERA!"}),w.jsx("p",{className:"text-primary-foreground/80 text-sm",children:"Temos uma oferta exclusiva pra você!"})]}),w.jsxs("div",{className:"p-6 text-center",children:[';
    const endMarker = ',w.jsxs("div",{className:"text-center mb-4",children:[w.jsxs("p",{className:"text-primary-foreground/50 text-sm",children:["De "';
    
    if (fileContent.includes(startMarker)) {
        const startPos = fileContent.indexOf(startMarker) + startMarker.length;
        const endPos = fileContent.indexOf(endMarker, startPos);
        if (endPos > startPos) {
            const oldContent = fileContent.substring(startPos, endPos);
            // Replace everything inside the p-6 div (intro + offer div) with the new message
            // oldContent likely starts with w.jsx("p",{className:"text-muted-foreground text-sm mb-2",children:"Já que você escolheu..."})
            fileContent = fileContent.replace(oldContent, messageTag);
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log('Popup content replaced via block search.');
        } else {
            console.log('End marker not found.');
        }
    } else {
        console.log('Start marker not found.');
    }
}
