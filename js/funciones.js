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
    const div = document.createElement('div')


    ul.className = 'row m-2 '

    let priority = ''
    li.textContent = pTarea.titulo

    if (pTarea.prioridad === 'diaria') {
        priority = 'border-success-subtle'
    } else if (pTarea.prioridad === 'mensual') {
        priority = 'border-primary-subtle'
    } else {
        priority = 'border-danger-subtle'
    }

    li.className = `list-group-item col-6 ps-1 border-bottom border-start border-5 fs-4 ${priority}`

    div.className = 'col-6 p-2 text-center'

    btn.textContent = 'Eliminar'
    btn.className = 'btn btn-outline-secondary col-10 '
    btn.dataset.id = pTarea.id
    btn.addEventListener('click', deleteItem)



    div.appendChild(btn)
    ul.append(li, div)
    pDom.appendChild(ul)
}

//printTareas() para agragar las tareas al DOM
function printTareas(pLista, pDom) {

    pDom.innerHTML = '';
    if (pLista.length !== 0) {
        pLista.forEach(tarea => printOneTarea(tarea, pDom))
    } else {
        pDom.innerHTML = `<h2>NO HAY TAREAS PENDIENTES</h2>`
    }

}

//saveTarea() con el fin de no duplicar la tarea
function saveTarea(pLista, pTarea) {
    let duplicado = pLista.findIndex(tarea => tarea.titulo.toLowerCase() === pTarea.titulo.toLowerCase())
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

    inputTarea.value = ''
    selectPrioridad.value = ''
}

//filterByTarea() filtra la prioridad de las tareas
function filterByTarea(pTareaLista, pPrioridad) {
    const filterList = [];
    for (let tarea of pTareaLista) {
        if (tarea.prioridad.includes(pPrioridad)) {
            filterList[filterList.length] = tarea;
        }
    }
    return filterList;
}

//getchange() filtra por prioridad las tareas existentes
function getchange(event) {
    let listaFiltrada = filterByTarea(tareas, event.target.value)

    printTareas(listaFiltrada, seccionTarea)

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


function deleteItemArray(pId, pList) {
    //splice borrar por posicion, tenemos que saber su posicion
    // findIndex devuelve la posicion si se cumple la condicion y -1 si no se cumple
    let posicionBorrar = pList.findIndex(item = item.id === pId)
    if (posicionBorrar !== -1) {
        pList.splice(posicionBorrar, 1)
    }
    console.log(pList);
}

//deleteItem()lanza el evento desde el boton para eliminar la tarea asociada
function deleteItem(event) {
    let id = parseInt(event.target.dataset.id)

    const articleDelete = event.target.parentNode.parentNode
    articleDelete.parentNode.removeChild(articleDelete)

    //borrar del array, necesito saber el id, como ya lo tiene, se hace splice
    deleteItemArray(id, tareas)
}

//para crear evento
btn.addEventListener('click', getTarea)

//evento para ver las tareas
inputBuscador.addEventListener('keypress', getSearch)

//evento para filtrar por prioridad
selectSelector.addEventListener('change', getchange)

//uso de la funcion
printTareas(tareas, seccionTarea)


