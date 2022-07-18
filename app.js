const todoBtn = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addItem);
todoList.addEventListener('click', removeCheck);
todoFilter.addEventListener('click', sortItem);

function addItem(e) {
    e.preventDefault();

    const newDiv = document.createElement('div');
    newDiv.classList.add("todo-div");

    const newLi = document.createElement('li');
    newLi.append(todoInput.value);
    saveLocalStorage(todoInput.value);

    newLi.classList.add('todo-li');
    newDiv.append(newLi);
    todoInput.value = '';

    const checkedBtn = document.createElement('button');
    checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkedBtn.classList.add('checked-btn');
    newDiv.append(checkedBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    newDiv.append(trashBtn);

    todoList.append(newDiv);

}

function removeCheck(e) {
    const target = e.target;
    if(target.classList[0] === 'trash-btn'){
        const todo = target.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }
   
    if(target.classList[0] === 'checked-btn'){
        target.parentElement.classList.toggle('checked');
    }
}

function sortItem(e) {
    const todos = todoList.childNodes;
    // console.log(items);
    todos.forEach(function(item){
        switch(e.target.value){
            case "all":
                item.style.display = 'flex';
                break;
            case "completed":
                if(item.classList.contains('checked')){
                   item.style.display = 'flex';
                }else{
                    item.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!item.classList.contains('checked')){
                    item.style.display = 'flex';
                 }else{
                     item.style.display = 'none';
                 }
                break;
        }
    })    
}

//localStorage
function saveLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo){
        const newDiv = document.createElement('div');
        newDiv.classList.add("todo-div");
    
        const newLi = document.createElement('li');
        newLi.append(todo);
        newLi.classList.add('todo-li');
        newDiv.append(newLi);
        todoInput.value = '';

        const checkedBtn = document.createElement('button');
        checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkedBtn.classList.add('checked-btn');
        newDiv.append(checkedBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        newDiv.append(trashBtn);
    
        todoList.append(newDiv);
    })

}