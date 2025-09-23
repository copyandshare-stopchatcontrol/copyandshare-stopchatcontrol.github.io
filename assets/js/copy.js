import * as cleaner  from  "./lib/cleaner.js";
import * as setup    from  "./lib/setup.js";
import * as html2md  from  "./lib/html2/html2md.js";



function cleanerManager(node) {
    cleaner.deleteIndentation(node);
    cleaner.deleteBR(node);
    cleaner.deleteBreaksAfterHeadings(node);
    cleaner.deleteBreaksAfterParagraphs(node);  
    cleaner.trimLinks(node);
    cleaner.trimSpan(node);
    cleaner.trimParagraphs(node);
    cleaner.trimSummary(node);
    cleaner.trimHeadings(node);

}


// Conversion HTML -> Markdown (orchestrateur)
function htmlToMarkdown(root) {
    const node = root.cloneNode(true);

    html2md.transformPmsgtxtToMarkdown(node);
    // transformBRtoBreak(node);
    // transformLinks(node);              // règle générale pour <a>
    // transformSummaryAnchors(node);     // garde le texte dans <summary>
    // transformParagraphs(node); // <p>...</p>
    // transformStrongToMarkdown(node); // <p><strong>...</strong></p>
    // transformHeadings(node);           // h2 -> ## titre
}



function main() {
    
    document.addEventListener('DOMContentLoaded', setup.setupCopy);

    setup.safeCopy();
    htmlToMarkdown(node);
    cleanerManager(node);
}

main();
