function finalizeText(node) {
  const text = node.textContent
    .replace(/\r\n/g, '\n')     // normaliser
    .replace(/\n{3,}/g, '\n') // limiter les lignes vides
    .replace(/\u00A0/g, '')    // espaces insécables
    .replace(/^[ \t]+/gm, '')           // indentation
    .replace(/^(#+.*)$\n+/gm, '$1\n') // lignes vides après titres
    .trim()
  return text;
}


export {finalizeText};