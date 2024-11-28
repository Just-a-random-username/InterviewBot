
const fs = require('fs');
const pdf = require('pdf-parse');

function pdfparse(file){
    let dataBuffer = fs.readFileSync(file);

    let metaData;

    pdf(dataBuffer).then(function(data) {
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata); 
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text); 
            
    });
}
// path='/Users/abhishekmanral/Desktop/new-lord/InterviewBot/routes/uploads/1732770446490-Untitled design (1).pdf'

// pdfparse(path)

module.exports=pdfparse