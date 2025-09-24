// Point d’entrée


function getCopyElements() {
  const button = document.getElementById('copy-button');
  const success = document.getElementById('copy-success');
  const content = document.getElementById('message-content');

  if (!button || !content) {  
    console.warn('Copy elements not found.');
    return null;
  }

  return { button, success, content };


}




function attachCopyHandler({ button, success, content } , htmlToMarkdown) {

    button.addEventListener('click', async () => {
    const markdown = htmlToMarkdown(content);


    try {
      await safeCopy(markdown);
      if (success) {
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 2000);
      }
    }
    
    
    catch (e) {
      alert('Erreur lors de la copie.');
      console.error(e);
    }
  });

}


// Copie robuste (Clipboard API si dispo, sinon fallback <textarea>)
async function safeCopy(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  console.log('Clipboard API non disponible, fallback vers prompt.');

  // Fallback: prompt (bloquant, mais fiable)
  window.prompt('Environnement unsecurized copy manualy (Ctrl+C / Cmd+C), then enter :', text);
}



export { getCopyElements, attachCopyHandler, safeCopy } ;