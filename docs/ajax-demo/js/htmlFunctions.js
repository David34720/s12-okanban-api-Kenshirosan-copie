// export default function makeHTML(data) {
//     console.log(data);
// }

// ! Si on n'exporte pas par défaut, on devra destructurer quand on importe
// export const makeHTML = function (data) {
//     console.log(data);
// };

// export function makeHTML(data) {
//     console.log(data);
// }

function makeHTML(data) {
    const ul = document.createElement('ul');

    for (let i = 0; i < data.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${data[i].title}`;

        ul.appendChild(li);
    }

    document.querySelector('.users').append(ul);
}

export { makeHTML };
