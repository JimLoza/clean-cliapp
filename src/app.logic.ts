import fs from 'fs';
import { yarg } from "./config/plugins/args.plugin";
console.log('logic yarg', yarg);

const { b: base, l: limit, s: canShow } = yarg;


let outputMessage: string = ""

const header: string = `
    ============================
            Tabla del ${base}
    ============================\n    
`
for (let i = 1; i <= limit; i++) {

    outputMessage += `${base} x ${i} = ${base * i}\n`;
}


outputMessage = header + outputMessage;

if (canShow) console.log(outputMessage);

const outputPath = `outputs`;

// Create the outputs folder if it doesn't exist
fs.mkdirSync(outputPath, { recursive: true });

// Write the file
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created!');

