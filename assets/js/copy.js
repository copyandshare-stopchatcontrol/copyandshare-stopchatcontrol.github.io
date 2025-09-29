import * as setup    from  "./lib/setup.js";
import * as html2md  from  "./lib/html2/html2md.js";




// Conversion HTML -> Markdown (orchestrateur)
function htmlToMarkdown(root) {
    const node = root.cloneNode(true);

    return node.textContent

    // html2md.transformPmsgtxtToMarkdown(node);
    // transformBRtoBreak(node);
    // transformLinks(node);              // règle générale pour <a>
    // transformSummaryAnchors(node);     // garde le texte dans <summary>
    // transformParagraphs(node); // <p>...</p>
    // transformStrongToMarkdown(node); // <p><strong>...</strong></p>
    // transformHeadings(node);           // h2 -> ## titre
}



function main() {

    document.addEventListener('DOMContentLoaded', () =>{
        let elements  = setup.getCopyElements() ; 
        
        setup.attachCopyHandler(elements, htmlToMarkdown);


    });








}

main();
