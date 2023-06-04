const inputTarea = document.querySelector('#tarea')
const btn = document.querySelector('#top .btn')
const select = document.querySelector('#prioridad')
const seccionTarea = document.querySelector('#lista')
let id = 4



//printOneTarea()pata crear y agragar los elementos al DOM cuando se cree una nueva tarea
function printOneTarea(pTarea, pDom) {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const btn = document.createElement('button')
    ul.className = 'list-group'
    li.textContent = pTarea.titulo
    li.className = 'list-group-item'
    btn.textContent = 'Eliminar'
    btn.className = 'btn btn-outline-danger'
    ul.append(li, btn)
    pDom.appendChild(ul)
}

//printTareas() para agragar las tareas al DOM
function printTareas(pLista, pDom) {
    pLista.forEach(tarea => printOneTarea(tarea, pDom)
    );
}

//saveTarea() con el fin de no duplicar la tarea
function saveTarea(pLista, pTarea) {
    let duplicado = pLista.findIndex(tarea => tarea.titulo === pTarea.titulo)
    if (duplicado === -1) {

        pLista.push(pTarea);
        return 'success';
    }
    return 'Tarea existente'

}


//
function getTarea(event) {

    if (inputTarea.value === '' || select.value === '') {
        alert('no hay nah')
        return
    }
    event.preventDefault()

    const newTarea = {
        id: id,
        titulo: inputTarea.value,
        prioridad: select.value
    }
    let guardado = saveTarea(tareas, newTarea)

    if (guardado === 'success') {
        printOneTarea(newTarea, seccionTarea)
        id++;

        //event.target.reset()
    } else {
        alert(guardado)
        //event.target.mail.style.border = '3px solid red'
    }
}


//para crear evento
btn.addEventListener('click', getTarea)


printTareas(tareas, seccionTarea)


