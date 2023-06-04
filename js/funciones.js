const inputTarea = document.querySelector('#top .tarea')
const btn = document.querySelector('#top .btn')
const seccionTarea = document.querySelector('#lista')


function printOneTarea(pTarea, pdom) {
    const ul = document.createElement('ul')
    ul.innerHTML = `<li>${pTarea.titulo}</li> 
    <li>${pTarea.prioridad}</li>`
}

