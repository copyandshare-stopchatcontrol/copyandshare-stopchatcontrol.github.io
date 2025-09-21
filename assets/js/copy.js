// copie dans le presse-papier du markdown convertie depuis html
// https://stackoverflow.com/questions/5002111/how-to-convert-html-to-markdown 
// https://stackoverflow.com/questions/39501289/copy-as-markdown-in-chrome-extension
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API

// VERSION 2: simplification, suppression des gras (pb de rendu dans certains contextes)


document.addEventListener('DOMContentLoaded', setupCopy);


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


// Conversion HTML -> Markdown (orchestrateur)
function htmlToMarkdown(root) {
  const node = root.cloneNode(true);
  normalizeBreaks(node);
  transformLinks(node);              // règle générale pour <a>
  transformSummaryAnchors(node);     // garde le texte dans <summary>
  // transformParagraphs(node); // <p>...</p>
  transformStrongInParagraphs(node); // <p><strong>...</strong></p>

  transformHeadings(node);           // h2 -> ## titre
  return finalizeText(node);
}



// --- Étapes de transformation ---

function transformPmsgtxtToMarkdown(node) {
  // Transformer les paragraphes de .message-txt en texte brut
  node.querySelectorAll('.message-txt p').forEach(p => {
    // Remplacer les <br> par des sauts de ligne d'abord
    const html = p.innerHTML.replace(/<br\s*\/?>/gi, '\n');
    

    // Remplacer le <p> par son contenu texte
    p.replaceWith(temp.textContent || '');
  });
}

// function transformParagraphs(node) {
//   // Transformer tous les <p> (sauf ceux déjà traités) en texte + double saut
//   node.querySelectorAll('p').forEach(p => {
//     const text = p.textContent.trim();
//     if (text) {
//       p.replaceWith(`${text}\n\n`);
//     } else {
//       p.remove();
//     }
//   });
// }



function transformStrongInParagraphs(node) {
    // <strong>...</strong> -> **texte**
  node.querySelectorAll('p .important').forEach(s => {
    const text = (s.querySelector('.txt-part')?.textContent || s.textContent).trim();
    s.replaceWith(`**${text}**`);
  });

}




function normalizeBreaks(node) {
  // Remplacer les <br> par des sauts de ligne
  node.querySelectorAll('br').forEach(br => br.replaceWith(''));
}



function transformSummaryAnchors(node) {
  // Dans <summary>, toujours garder uniquement le texte
  node.querySelectorAll('summary a').forEach(a => {
    const text = (a.querySelector('.txt-part')?.textContent ?? a.textContent).trim();
    a.replaceWith(text);
  });


}


function transformLinks(node) {
  // Liens: ancres internes -> texte; externes -> href seul
  node.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      a.replaceWith((a.textContent || '').trim());
    } else {
      a.replaceWith(href);
    }
  });


}




function transformHeadings(node) {
  // Titres h2 -> ## Titre (priorité au .txt-part si présent)
  node.querySelectorAll('h2').forEach(h2 => {
    const text = (h2.querySelector('.txt-part')?.textContent || h2.textContent).trim();
    h2.replaceWith(`## ${text}`);
  });


}



function finalizeText(node) {
  const text = node.textContent
    // .replace(/\r\n/g, '\n')     // normaliser
    // .replace(/\n{3,}/g, '\n') // limiter les lignes vides
    // .replace(/\u00A0/g, ' ')    // espaces insécables
    // .replace(/^[ \t]+/gm, '')           // indentation
    // .replace(/^(#+.*)$\n+/gm, '$1\n') // lignes vides après titres
    // .trim()
  return text;
}