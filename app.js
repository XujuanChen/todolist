const todoBtn = document.querySelector(".todo-btn");
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector(".todo-list");

todoBtn.addEventListener('click', addItem);

function addItem(e) {
    e.preventDefault();

    const newDiv = document.createElement('div');
    newDiv.classList.add("todo-div");

    const newLi = document.createElement('li');
    newLi.classList.add('todo-li');
    newLi.append(todoInput.value);
    newDiv.append(newLi);

    const checkedBtn = document.createElement('button');
    checkedBtn.classList.add('checked-btn');
    checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
    newDiv.append(checkedBtn);

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    newDiv.append(trashBtn);

    todoList.append(newDiv);
}
