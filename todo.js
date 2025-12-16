let form = document.getElementById('form');
let add = document.getElementById('showlist');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("add");

    let todo = document.getElementById('usertodo');

    let lst = document.createElement('div');
    lst.className = "work";

    let del = document.createElement('button');
    del.type = "submit";
    del.textContent = 'x';

    let label = document.createElement('label');
    label.className = 'todowork';

    let sp = document.createElement('span');
    sp.textContent = "  " + todo.value.trim() + "       ";

    let checkk = document.createElement('input');
    checkk.type = "checkbox";
    checkk.className = 'checkked';

    let hof = document.createElement('span');

    if (todo.value.trim()) {
        hof.appendChild(checkk);
        label.appendChild(hof);
        label.appendChild(sp);
        lst.appendChild(label);
        lst.appendChild(del);
        add.appendChild(lst);
    }

    todo.value = "";

    checkk.addEventListener('click', function (e) {
        if (checkk.checked) {
            sp.style.textDecoration = "line-through";
            sp.style.color = "grey";
        } else {
            sp.style.textDecoration = "none";
            sp.style.color = "black";
        }
    });

    del.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('pop');
        add.removeChild(lst);

        let eodo = document.querySelectorAll('.todowork');
        let ok = document.querySelectorAll('.checkked');
    });

    let okwork = document.querySelectorAll('.work');

    for (let i = 0; i < okwork.length; i++) {
        if (i % 2 == 0) {
            okwork[i].style.backgroundColor = "pink";
            console.log("mai pink color kr rha huu");
        } else {
            okwork[i].style.backgroundColor = "blue";
            console.log("mai blue color kr rha huu");
        }
    }
});

let rem = document.getElementById('reset');

rem.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("a");

    add.innerHTML = "";

    let eodo = document.querySelectorAll('.todowork');
    let ok = document.querySelectorAll('.checkked');

    if (eodo.length == 0) {
        alldone.textContent = "All done";
        alldone.id = "alldone";
    }
});

let alldone = document.getElementById('alldone');

alldone.addEventListener('click', function (e) {
    e.preventDefault();

    let eodo = document.querySelectorAll('.todowork');
    let ok = document.querySelectorAll('.checkked');

    if (alldone.id == "alldone") {
        if (eodo.length) {
            for (let i = 0; i < ok.length; i++) {
                ok[i].checked = "checked";
                eodo[i].style.textDecoration = "line-through";
                eodo[i].style.color = "grey";
            }

            alldone.textContent = "All undone";
            alldone.id = "allundone";
            console.log("done");
        }
    } else {
        let eodo = document.querySelectorAll('.todowork');
        let ok = document.querySelectorAll('.checkked');

        for (let i = 0; i < ok.length; i++) {
            ok[i].checked = false;
            eodo[i].style.textDecoration = "none";
            eodo[i].style.color = "black";
        }

        alldone.textContent = "All done";
        alldone.id = "alldone";
        console.log("redone");
    }
});


let isLoading = true;

function saveTodos() {
    if (isLoading) return;

    let data = [];
    let works = document.querySelectorAll('.work');

    works.forEach(work => {
        let text = work.querySelector('.todowork span').innerText.trim();
        let checked = work.querySelector('.checkked').checked;
        data.push({ text, checked });
    });

    localStorage.setItem('todos', JSON.stringify(data));
}

function loadTodos() {
    let data = JSON.parse(localStorage.getItem('todos'));
    if (!data) {
        isLoading = false;
        return;
    }

    data.forEach(item => {
        document.getElementById('usertodo').value = item.text;
        document.getElementById('form').dispatchEvent(new Event('submit'));

        let last = document.querySelectorAll('.checkked');
        last = last[last.length - 1];

        if (item.checked) last.click();
    });

    isLoading = false;
}

// listeners
document.getElementById('showlist').addEventListener('click', saveTodos);
document.getElementById('reset').addEventListener('click', saveTodos);
window.addEventListener('load', loadTodos);
