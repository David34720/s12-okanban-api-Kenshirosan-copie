// * on doit mettre l'extension en JS vanilla
import { makeHTML } from './htmlFunctions.js';
import { olderxmlreq } from './xmlhttpreq.js';
// * fetch : est une promesse
export const url = 'https://jsonplaceholder.typicode.com/users';

function getData() {
    console.log('get data');
    setTimeout(() => {
        fetch(url)
            .then(response => {
                // * c'est l'équivalent de JSON.parse()
                return response.json();
            })
            .then(data => {
                makeHTML(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, 5000);
}

//  * IIFE : Immediatly Invoked Function Expression : 2 paires de parenthèses : la première pour évaluer le code, le 2nde pour exécuter le code
(async () => {
    console.log('IIFE');

    try {
        const response = await fetch(url);
        const data = await response.json();
        makeHTML(data);
    } catch (error) {
        console.error(error.message);
    }

    olderxmlreq();

    // ! envoie de données : POST
    try {
        const user = {
            name: 'Lorenzo',
            username: 'Kenshirosan',
        };

        const response = await fetch(url, {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify(user),
        });

        console.log('RESPONSE FROM TYPICODE', response);
    } catch (error) {
        console.error(error);
    }
})();

document.addEventListener('DOMContentLoaded', getData);
