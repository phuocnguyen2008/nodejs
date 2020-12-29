const deleteBtn = document.getElementById('delete-btn');
const checkbox = document.getElementById('kg_customCheck0');
const table_kg = document.getElementById('table-kg');
const table_la = document.getElementById('table-la');

let userToDelete = [];

const sendHttpRequest = (method, url, data) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function (e) {
        console.log(xhr.response);
    });
    xhr.send(JSON.stringify(data));
};

const myFunction = () => {
    let N = table_kg.rows.length;
    for (let i = 1; i < table_kg.rows.length; i++) {
        let obj = {};
        let row = table_kg.rows[i].innerText.split('\t');
        if (document.getElementById(`kg_customCheck${i - 1}`).checked) {
            obj['KG'] = row.slice(3, 5);
            userToDelete.push(obj);
        }
    }
    for (let i = 1; i < table_la.rows.length; i++) {
        let obj = {};
        let row = table_la.rows[i].innerText.split('\t');
        if (document.getElementById(`la_customCheck${i - 1}`).checked) {
            obj['LA'] = row.slice(3, 5);
            userToDelete.push(obj);
        }
    }
    sendHttpRequest('POST', 'http://localhost:8000/login/delete', {
        data: userToDelete,
    });
    sendHttpRequest('GET', 'http://localhost:8000/login/delete', {});
};

deleteBtn.addEventListener('click', myFunction);
