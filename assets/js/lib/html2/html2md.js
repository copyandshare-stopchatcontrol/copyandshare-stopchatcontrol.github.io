// copie dans le presse-papier du markdown convertie depuis html
// https://stackoverflow.com/questions/5002111/how-to-convert-html-to-markdown 
// https://stackoverflow.com/questions/39501289/copy-as-markdown-in-chrome-extension
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API

/*
function transformBaliseToMarkdownLevel2(node, element1, element2, transformFunc) {
    node.querySelectorAll(element1).forEach(el => {
        const text =  
        el.querySelector(element2)?.textContent || el.textContent;
        el.replaceWith(transformFunc(text));
  });
}
*/


import {finalizeText} from './cleaner.js';

function manager(node) {
    transformPmsgtxtToMarkdown(node); // <div class="message-txt"><p>...</p></div>
    retrieveHashtag(node);
    transformBRtoBreak(node);
    transformLinks(node);              // règle générale pour <a>
    transformSummaryAnchors(node);     // garde le texte dans <summary>
    transformParagraphsToMarkdown(node); // <p>...</p>
    transformStrongToMarkdown(node); // <p><strong>...</strong></p>
    transformHeadings(node);           // h2 -> ## titre

    return finalizeText(node);
}




function transformBaliseToMarkdownLevel1(node, element1, transformFunc) {
    node.querySelectorAll(element1).forEach(el => {
        
        el.replaceWith(transformFunc(el.textContent).trim());
    });
}

function transformBaliseToMarkdownLevel_notrim(node, element1, transformFunc) {
    node.querySelectorAll(element1).forEach(el => {
        
        el.replaceWith(transformFunc(el.textContent));
    });
}




// function retrieveHashtag(node) {
//     const hashtagDiv = document.getElementById('hashtag_invisible');
//     if (hashtagDiv) {
//         const hashtagText = hashtagDiv.textContent || '';
//         const hashtagNode = document.createElement('div');
//         hashtagNode.textContent = `${hashtagText}`;
//         node.appendChild(hashtagNode);
//     }
// }



function retrieveHashtag(node) {
    transformBaliseToMarkdownLevel_notrim(node, '#hashtags', text => `${text} \n`);
}

// function retrieveHashtag(node) {
//     transformBaliseToMarkdownLevel1(node, '#hashtag_invisible', text => text);
// }

// --- Étapes de transformation ---

function transformPmsgtxtToMarkdown(node) {
    // Transformer les paragraphes de .message-txt en texte brut
    transformBaliseToMarkdownLevel1(node, '.message-txt p', text => text);


//     node.querySelectorAll('.message-txt p').forEach(p => {
//         p.replaceWith(p.textContent);
//   });
}
// p.textContent.trim() + '\n\n'


function transformStrongToMarkdown(node) {
    transformBaliseToMarkdownLevel1(node, 'p .important .txt-part', text => `**${text}**`);

//     node.querySelectorAll('p .important .txt-part').forEach(s =>
//         {
//             const text =s.textContent;
//             s.replaceWith(`**${text}**`);
//   });
}






function transformParagraphsToMarkdown(node) {
    transformBaliseToMarkdownLevel1(node, 'p', text => text + '\n\n');
}

function transformBRtoBreak(node) {
    node.querySelectorAll('br').forEach(br => br.replaceWith(''));
}



function transformSummaryAnchors(node) {
    node.querySelectorAll('summary a').forEach(a => {
        const text = (a.querySelector('.txt-part')?.textContent ?? a.textContent);
        a.replaceWith(text);
  });


}


function transformLinks(node) {
    node.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#')) {
            a.replaceWith((a.textContent || '').trim());
        }

        else {
            a.replaceWith(`- ${href}`);
        }
});

}




function transformHeadings(node) {
    node.querySelectorAll('h2').forEach(h2 => {
        const text = (h2.querySelector('.txt-part')?.textContent || h2.textContent).trim();
        h2.replaceWith(`## ${text}`);
    });


}


export {manager};