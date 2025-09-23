// Point d’entrée
function setupCopy() {
  const btn = document.getElementById('copy-button');
  const ok = document.getElementById('copy-success');
  const content = document.getElementById('message-content');

  if (!btn || !content) return;

  btn.addEventListener('click', async () => {
    const markdown = htmlToMarkdown(content);
    try {
      await safeCopy(markdown);
      if (ok) {
        ok.classList.add('show');
        setTimeout(() => ok.classList.remove('show'), 2000);
      }
    } catch (e) {
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



export { setupCopy, safeCopy } ;