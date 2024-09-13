import { makeHTML } from './htmlFunctions.js';

export const url = 'http://localhost:3000/lists';

(async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        makeHTML(data);
    } catch (error) {
        console.error(error.message);
    }
})();
