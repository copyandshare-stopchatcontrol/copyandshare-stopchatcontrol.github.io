import * as setup    from  "./lib/setup.js";
import {manager}  from  "./lib/html2/html2md.js";






// Conversion HTML -> ... (orchestrateur)
function html2(root) {
    const node = root.cloneNode(true);
    return manager(node);

    // html2md.transformPmsgtxtToMarkdown(node);

    
}



function main() {

    document.addEventListener('DOMContentLoaded', () =>{
        let elements  = setup.getCopyElements() ; 
        
        if (!elements) {
            return null;
        }   

        setup.attachCopyHandler(elements, html2);
    
    });








}

main();
