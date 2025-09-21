document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('copy-button');
  const zone = document.getElementById('message-content');
  const ok = document.getElementById('copy-success');
  if (!btn || !zone) return;

  btn.addEventListener('click', async () => {
    const md = convertToMarkdown(zone);
    const done = await copy(md);
    if (done && ok) {
      ok.classList.add('show');
      setTimeout(() => ok.classList.remove('show'), 1600);
    }
  });
});

function convertToMarkdown(root) {
  const blocks = [];
  
  // 1. D'abord traiter .message-txt (intro)
  const messageText = root.querySelector('.message-txt');
  if (messageText) {
    messageText.querySelectorAll('p').forEach(p => {
      if (!p.textContent.trim()) return;
      const html = p.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      const txt = normalizeInline(html);
      if (txt) blocks.push(txt);
    });
  }

  // 2. Traiter le reste dans l'ordre DOM naturel (pas par type d'élément)
  // On prend tous les enfants directs après .message-txt
  const allElements = Array.from(root.children);
  const messageTextIndex = allElements.findIndex(el => el.classList.contains('message-txt'));
  
  // Traiter tous les éléments après .message-txt dans l'ordre
  allElements.slice(messageTextIndex + 1).forEach(el => {
    if (!el.textContent.trim()) return;
    
    if (el.tagName === 'H2') {
      const title = pickText(el);
      console.log('H2 title:', title);
      blocks.push(`## ${title}`);
    }
    else if (el.tagName === 'SUMMARY') {
      const txt = normalizeInline(el.innerHTML);
      if (txt) blocks.push(txt);
    }
    else if (el.tagName === 'P') {
      const html = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      const txt = normalizeInline(html);
      if (txt) blocks.push(txt);
    }
    // Traiter le texte libre (pas dans des balises)
    else if (el.nodeType === Node.TEXT_NODE && el.textContent.trim()) {
      blocks.push(el.textContent.trim());
    }
  });

  // Alternative : traiter tous les nœuds (éléments ET texte) dans l'ordre
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function(node) {
        // Exclure .message-txt et ses enfants (déjà traités)
        if (node.closest('.message-txt')) return NodeFilter.FILTER_REJECT;
        // Prendre seulement les éléments de premier niveau
        if (node.parentNode === root) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  // Remplacer la boucle précédente par le walker
  blocks.length = messageText ? blocks.length : 0; // Garder seulement .message-txt si présent
  
  let currentNode;
  while (currentNode = walker.nextNode()) {
    if (!currentNode.textContent.trim()) continue;
    
    if (currentNode.tagName === 'H2') {
      const title = pickText(currentNode);
      blocks.push(`## ${title}`);
    }
    else if (currentNode.tagName === 'SUMMARY') {
      const txt = normalizeInline(currentNode.innerHTML);
      if (txt) blocks.push(txt);
    }
    else if (currentNode.tagName === 'P') {
      const html = currentNode.innerHTML.replace(/<br\s*\/?>/gi, '\n');
      const txt = normalizeInline(html);
      if (txt) blocks.push(txt);
    }
  }

  // Assemblage
  let out = blocks
    .map(block => block.trim())
    .filter(block => block.length > 0)
    .join('\n\n');

  // Nettoyage final
  out = out
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\u00A0/g, ' ')
    .replace(/^[ \t]+/gm, '')
    .trim();

  return out;
}

function normalizeInline(html) {
  const div = document.createElement('div');
  div.innerHTML = html;

  div.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const txt = pickText(a);
    if (!href || href.startsWith('#')) {
      a.replaceWith(txt || '');
    } else {
      a.replaceWith(href);
    }
  });

  div.querySelectorAll('.important, strong').forEach(s => {
    const t = pickText(s);
    s.replaceWith(t ? `**${t}**` : '');
  });

  let text = div.textContent || '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{2,}/g, '\n')
    .replace(/(^#+.*$)\n\n/g, '$1\n') // éviter double saut après titres
    .trim();
}

function pickText(el) {
  const sub = el.querySelector?.('.txt-part');
  return (sub ? sub.textContent : el.textContent || '').trim();
}

async function copy(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }
  const res = window.prompt('Copie manuelle (Ctrl+C puis Entrée) :', text);
  return res !== null;
}