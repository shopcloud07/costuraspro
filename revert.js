const fs = require('fs');
const filePath = 'assets/index-CThngms2.js';
let fileContent = fs.readFileSync(filePath, 'utf8');

// 1. Revert top block
const currentTopBlockRegex = /w\.jsxs\("div",\{className:"text-center mb-6 mt-2",children:\[w\.jsxs\("p",\{className:"text-primary-foreground\/50 text-sm",style:\{textDecoration:"line-through"\},children:\["De R\$ 137,00"\]\}\),w\.jsx\("p",\{className:"text-primary-foreground\/80 font-semibold text-sm mt-1 mb-1",children:"POR APENAS"\}\),w\.jsxs\("p",\{className:"text-primary font-heading font-black text-6xl",style:\{color:"#FF8C00"\},children:\["R\$ 24",w\.jsx\("span",\{className:"text-3xl",children:",90"\}\)\]\}\)\]\}\),/;

const originalTopBlock = `w.jsxs("p",{className:"text-primary-foreground/60 text-xs mb-4 flex items-center gap-1",children:[w.jsx(xf,{className:"w-3 h-3 text-gold fill-gold"}),"97,32% escolhem este pacote"]}),w.jsx("img",{src:nD,alt:"Kit Premium",className:"w-full max-w-[200px] mx-auto mb-4"}),`;

if (fileContent.match(currentTopBlockRegex)) {
    fileContent = fileContent.replace(currentTopBlockRegex, originalTopBlock);
    console.log('Top block reverted.');
} else {
    console.log('Current top block not found.');
}

// 2. Revert bottom block
// The bottom block string that was previously deleted:
const originalBottomBlock = `w.jsxs("div",{className:"text-center mb-4",children:[w.jsxs("p",{className:"text-primary-foreground/50 text-sm",children:["De ",w.jsx("span",{className:"text-strike",children:"R$ 137,00"})]}),w.jsx("p",{className:"text-primary-foreground/60 font-semibold text-xs",children:"POR APENAS"}),w.jsxs("p",{className:"text-primary font-heading font-black text-4xl",children:["R$ 24",w.jsx("span",{className:"text-xl",children:",90"})]}),w.jsx("p",{className:"text-primary-foreground/50 text-xs mt-1",children:"PAGAMENTO ÚNICO"})]}),`;

const targetButton = `})}),w.jsx("a",{href:"https://pay.lowify.com.br/checkout.php?product_id=hKicMT"`;
const replacementButton = `})}),${originalBottomBlock}w.jsx("a",{href:"https://pay.lowify.com.br/checkout.php?product_id=hKicMT"`;

if (fileContent.includes(targetButton)) {
    // Make sure we only insert it once if the script is run multiple times
    if (!fileContent.includes('children:"PAGAMENTO ÚNICO"')) {
        fileContent = fileContent.replace(targetButton, replacementButton);
        console.log('Bottom block reverted.');
    } else {
        console.log('Bottom block seems to already exist.');
    }
} else {
    console.log('Target button for bottom block not found.');
}

fs.writeFileSync(filePath, fileContent, 'utf8');
