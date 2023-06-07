const inputTarea = document.querySelector('#tarea')
const btn = document.querySelector('#top .btn')
const selectPrioridad = document.querySelector('#prioridad')
const seccionTarea = document.querySelector('#lista')
const selectSelector = document.querySelector('#selector')
const inputBuscador = document.querySelector('#buscador')
let id = 4



//printOneTarea()pata crear y agragar los elementos al DOM cuando se cree una nueva tarea
function printOneTarea(pTarea, pDom) {
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const btn = document.createElement('button')
    ul.className = 'list-group col-12'
    li.textContent = pTarea.titulo
    li.className = 'list-group-item col-6'
    btn.textContent = 'Eliminar'
    btn.className = 'btn btn-outline-danger col-6'
    ul.append(li, btn)
    pDom.appendChild(ul)
}

//printTareas() para agragar las tareas al DOM
function printTareas(pLista, pDom) {

    pDom.innerHTML = '';
    if (pLista.length !== 0) {
        pLista.forEach(tarea => printOneTarea(tarea, pDom))
    } else {
        pDom.innerHTML = `<h2>NO HAY RESULTADO</h2>`
    }

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


//event getTarea para agregar las tareas nuevas, condicionando el input y el select para que no esten vacios
function getTarea(event) {

    if (inputTarea.value === '' || selectPrioridad.value === '') {
        alert('no hay nah')
        return
    }

    const newTarea = {
        id: id,
        titulo: inputTarea.value,
        prioridad: selectPrioridad.value
    }
    let guardado = saveTarea(tareas, newTarea)

    if (guardado === 'success') {
        printOneTarea(newTarea, seccionTarea)
        id++;


    } else {
        alert(guardado)
        //event.target.mail.style.border = '3px solid red'
    }
}


function filterByTarea(pTareaLista, pTitulo) {
    const filterList = [];
    for (let tarea of pTareaLista) {
        if (tarea.titulo.toLowerCase().includes(pTitulo.toLowerCase())) {
            filterList[filterList.length] = tarea;
        }
    }
    return filterList;
}





//filterByWord() filtra a traves de una palabra 
function filterByWord(pLista, pWord) {
    return pLista.filter(tarea => tarea.titulo.toLowerCase().includes(pWord.toLowerCase()))
}

//getSearch() se usa para buscar o filtrar las tareas registradas a traves del input solo cuando se usa el enter
function getSearch(event) {

    let tittle = event.target.value;
    let listaFiltrada = filterByWord(tareas, tittle)
    if (event.key === 'Enter') {

        return printTareas(listaFiltrada, seccionTarea)
    }

}

//para crear evento
btn.addEventListener('click', getTarea)

//evento para ver las tareas
inputBuscador.addEventListener('keypress', getSearch)

//evento para filtrar por prioridad
selectSelector.addEventListener('change', getchange)


printTareas(tareas, seccionTarea)


