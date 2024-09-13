import { url } from './app.js';

// *AJAX : Asynchronous JavaScript and XML
function handleEvent(e) {
    console.log(JSON.parse(e.target.response));
}

function addListeners(xhr) {
    xhr.addEventListener('loadend', handleEvent);
}

function olderxmlreq() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    addListeners(xhr);
    xhr.send();
}

export { olderxmlreq };
