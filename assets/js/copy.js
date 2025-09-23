import * as cleaner from "./lib/cleaner.js";
import  * as setup from   "./lib/setup.js";
import * as html2md from  "./lib/html2/html2md.js";


function cleaner(node) {
    deleteIndentation(node);
    deleteBR(node);
    deleteBreaksAfterHeadings(node);
    deleteBreaksAfterParagraphs(node);  
    trimLinks(node);
    trimSpan(node);
    trimParagraphs(node);
    trimSummary(node);
    trimHeadings(node);

}


// Conversion HTML -> Markdown (orchestrateur)
function htmlToMarkdown(root) {
    const node = root.cloneNode(true);

    transformPmsgtxtToMarkdown(node);
    // transformBRtoBreak(node);
    // transformLinks(node);              // règle générale pour <a>
    // transformSummaryAnchors(node);     // garde le texte dans <summary>
    // transformParagraphs(node); // <p>...</p>
    // transformStrongToMarkdown(node); // <p><strong>...</strong></p>
    // transformHeadings(node);           // h2 -> ## titre
}



function main() {
    
    document.addEventListener('DOMContentLoaded', cleaner.setupCopy);
    safeCopy(); 
    cleaner(node);
    htmlToMarkdown(node);
}

main();
