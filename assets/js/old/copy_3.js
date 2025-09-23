// copie dans le presse-papier du markdown convertie depuis html
// https://stackoverflow.com/questions/5002111/how-to-convert-html-to-markdown 
// https://stackoverflow.com/questions/39501289/copy-as-markdown-in-chrome-extension
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API


// PROPRE

/**
 * Copie du contenu HTML vers Markdown
 * Convertit la structure HTML en texte Markdown formaté
 */




document.addEventListener('DOMContentLoaded', initializeCopyButton);

function initializeCopyButton() {
  const elements = {
    button: document.getElementById('copy-button'),
    feedback: document.getElementById('copy-success'),
    content: document.getElementById('message-content')
  };

  if (!elements.button || !elements.content) return;

  elements.button.addEventListener('click', () => handleCopy(elements));
}


async function handleCopy({ content, feedback }) {
  try {
    const markdown = convertToMarkdown(content);
    await copyToClipboard(markdown);
    showSuccessFeedback(feedback);
  } catch (error) {
    console.error('Copy failed:', error);
    alert('Erreur lors de la copie.');
  }
}


async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback pour environnements non sécurisés
  const userChoice = window.prompt(
    'Environnement non sécurisé. Copiez manuellement (Ctrl+C), puis Entrée :',
    text
  );
  
  if (userChoice === null) {
    throw new Error('Copie annulée par l\'utilisateur');
  }
}



function showSuccessFeedback(feedbackElement) {
  if (!feedbackElement) return;
  
  feedbackElement.classList.add('show');
  setTimeout(() => feedbackElement.classList.remove('show'), 2000);
}

function convertToMarkdown(root) {
  const clone = root.cloneNode(true);
  
  // Pipeline de transformation
  const transformations = [
    removeBreaks,
    handleSummaryLinks,
    handleRegularLinks,
    handleHeadings,
    handleImportantText
  ];
  
  transformations.forEach(transform => transform(clone));
  
  return cleanupText(clone.textContent);
}




// TRANSFORMATIONS INDIVIDUELLES

function removeBreaks(node) {
  node.querySelectorAll('br').forEach(br => br.remove());
}

function handleSummaryLinks(node) {
  node.querySelectorAll('summary a').forEach(link => {
    const text = extractText(link);
    link.replaceWith(text);
  });
}

function handleRegularLinks(node) {
  node.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href') || '';
    
    if (href.startsWith('#')) {
      link.replaceWith(extractText(link));
    } else {
      link.replaceWith(href);
    }
  });
}

function handleHeadings(node) {
  node.querySelectorAll('h2').forEach(heading => {
    const text = extractText(heading);
    heading.replaceWith(`## ${text}`);
  });
}

function handleImportantText(node) {
  node.querySelectorAll('p .important').forEach(element => {
    const text = extractText(element);
    element.replaceWith(`**${text}**`);
  });
}


// 
function extractText(element) {
  const priorityText = element.querySelector('.txt-part')?.textContent;
  return (priorityText || element.textContent || '').trim();
}

function cleanupText(text) {
  return text
    .replace(/\r\n/g, '\n')           // Normaliser les retours
    .replace(/\n{3,}/g, '\n\n')       // Limiter les lignes vides
    .replace(/\u00A0/g, ' ')          // Espaces insécables → espaces
    .replace(/^[ \t]+/gm, '')         // Supprimer indentation
    .replace(/^(#+.*)$\n+/gm, '$1\n') // Nettoyer après titres
    .trim();
}