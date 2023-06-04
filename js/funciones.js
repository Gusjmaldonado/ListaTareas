const inputTarea = document.querySelector('#top .tarea')
const btn = document.querySelector('#top .btn')
const seccionTarea = document.querySelector('#lista')
let id = 4

btn.addEventListener('click', getTarea)


function printOneTarea(pTarea, pdom) {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const btn = document.createElement('button')
    ul.className = 'list-group'
    li.textContent = pTarea.titulo
    li.className = 'list-group-item'
    btn.textContent = 'Eliminar'
    btn.className = 'btn btn-outline-danger'
    ul.append(li, btn)
    pdom.appendChild(ul)
}

function printTareas(pLista, pDom) {
    pLista.forEach(tarea => printOneTarea(tarea, pDom)
    );
}

function saveTarea(pLista, pTarea) {
    let duplicado = pLista.findIndex(tarea => tarea.titulo === tarea.mail)
    if (duplicado === -1) {

        pLista.push(pTarea);
        return 'success';
    }

    return 'Tarea existente'

}

function getTarea(event) {


}

printTareas(tareas, seccionTarea)


