// copie dans le presse-papier du markdown convertie depuis html
// https://stackoverflow.com/questions/5002111/how-to-convert-html-to-markdown 
// https://stackoverflow.com/questions/39501289/copy-as-markdown-in-chrome-extension
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API




document.addEventListener('DOMContentLoaded',  () => {
  const btn = document.getElementById('copy-button');
  const ok = document.getElementById('copy-success');
  const content = document.getElementById('message-content');

  if (!btn || !content) return;

  btn.addEventListener('click', async () => {
    const markdown = htmlToMarkdown(content);
    try {
      await navigator.clipboard.writeText(markdown);
      if (ok){ ok.classList.add('show'); setTimeout(()=> ok.classList.remove('show'), 2000); }
    } catch (e){
      alert('Erreur lors de la copie.');
      console.error(e);
    }
  });
});




// Conversion très simple HTML -> Markdown adaptée à notre structure
function htmlToMarkdown(root){
  // Cloner pour ne pas modifier le DOM
  const node = root.cloneNode(true);

  // Remplacer les <br> par \n
  node.querySelectorAll('br').forEach(br=> br.replaceWith(''));

  

  // Traiter les liens: href seul
  node.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');

    if (href.startsWith('#')) { 
      a.replaceWith("");

    }
    else {
      a.replaceWith(href);

    }

  });


  // Titres h2 -> ## Titre
  // node.querySelectorAll('h2').forEach(  h2 => {
  //     h2.querySelectorAll('a').forEach(a => a.remove());

  //   h2.replaceWith(`## ${h2.textContent.trim()}`);
  // });



  node.querySelectorAll('h2').forEach(  h2 => {
    const text = (h2.querySelector('.txt-part')?.textContent || h2.textContent).trim();
    h2.replaceWith(`## ${text}`);
  });


  // // Paragraphes -> ligne telle quelle avec double saut
  // node.querySelectorAll('p').forEach(p => {
  //   const t = p.textContent.replace(/\s+$/,'');
  //   p.replaceWith(`${t}`);
  // });




  node.querySelectorAll('p strong').forEach( s => {
    const text = (s.querySelector('.txt-part')?.textContent || s.textContent).trim();
    console.log(text);
    s.replaceWith(`**${text}**`);
  });





  // Strong -> **texte**
  // node.querySelectorAll('strong').forEach(s => {
  //   s.replaceWith(`**${s.textContent.trim()}**`);
    
  // });


  // Texte final + nettoyage
  const text = node.textContent
    .replace(/\r\n/g, '\n')   // normaliser les retours
    .replace(/\n{3,}/g, '\n\n') // limiter les lignes vides
    .replace(/\u00A0/g, ' ')  // remplacer les espaces insécables
    .trim();



    
  // Supprimer l’indentation en début de ligne
  const noindent = text.replace(/^[ \t]+/gm, '');
  // Supprimer les lignes vides après les titres
  const cleaned = noindent.replace(/^(#+.*)$\n+/gm, '$1\n');

  return cleaned;
}

