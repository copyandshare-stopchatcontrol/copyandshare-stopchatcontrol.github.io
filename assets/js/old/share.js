// Partage via Web Share API si dispo

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('share-button');
  const content = document.getElementById('message-content');
  if (!btn || !content) return;

  if (!navigator.share){
    // masquer si non supporté
    btn.style.display = 'none';
    return;
  }

  btn.addEventListener('click', async () => {
    const text = htmlToPlainText(content);
    try{
      await navigator.share({ title: document.title, text, url: location.href });
    }catch(e){ console.error(e); }
  });
});

function htmlToPlainText(root){
  const node = root.cloneNode(true);
  node.querySelectorAll('br').forEach(br=> br.replaceWith('\n'));
  return node.innerText.trim();
}
