/* 
TRIM 
*/


function Manager(node) {
    trimLinks(node);
    trimSpan(node);
    trimParagraphs(node);
    trimSummary(node);
    trimHeadings(node);

    // deleteIndentation(node);
    // deleteBR(node);
    // deleteBreaksAfterHeadings(node);
    // deleteBreaksAfterParagraphs(node);  

}


function trimer(node , ElementType){
        node.querySelectorAll(ElementType).forEach(element => {
        element.textContent = element.textContent.trim();
    })
}

function trimLinks(node) {
    trimer(node, 'a')
}


function trimSpan(node) {
    trimer(node,'span')
}


function trimParagraphs(node) {
    trimer(node, 'p')
}


function trimSummary(node) {
    trimer(node, 'summary')
}

function trimHeadings(node) {
    trimer(node, 'h2, h3, h4, h5, h6')
}



/*
REGEX DELETION FOR :
indentation,
<br>,
breaks lines after headings,
breaks after paragraphs
*/


function deleter(node, regex, replacement) {
  const text = node.textContent
    .replace(regex, replacement)

  return text;
}

function deleteIndentation(node) {
    return deleter(node, /^[ \t]+/gm, '')
}

function deleteBreaksAfterHeadings(node) {
    return deleter(node, /^(#+.*)$\n+/gm, '$1\n') 

}

function deleteBreaksAfterParagraphs(node) {
  return deleter(node, /<p\s*\/?>\s*/gi, '</p>\n\n') 
}

function deleteBR(node) {
  return deleter(node, /<br\s*\/?>/gi, '') 
}



export {Manager} ;


// function normalizeLineBreaksAndSpaces(node) {
//   const text = node.textContent
//     .replace(/\r\n/g, '\n')     // normaliser
//     .replace(/\n{3,}/g, '\n') // limiter les lignes vides
//     .replace(/\u00A0/g, ' ')    // espaces insécables
//     .replace(/^[ \t]+/gm, '')           // indentation
//     .replace(/^(#+.*)$\n+/gm, '$1\n') // lignes vides après titres
//     // .replace(/\**$(\n\n)+/gm, '**\n')
//     .trim()

//   return text;
// }