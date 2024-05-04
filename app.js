const taskInput = document.getElementById('input-text');
const form = document.getElementById('form');
const tasksList = document.querySelector('#list');
const emptyList = document.getElementById('emptyList')



// добавление задачи
form.addEventListener('submit', addTask)

// удаление задачи 

tasksList.addEventListener('click', deleteTask)

if (localStorage.getItem('tasksHTML')) {
  tasksList.innerHTML = (localStorage.getItem('tasksHTML'))
}


function addTask (event) { 
  event.preventDefault();
  const id = Date.now()
  const taskText = taskInput.value;
  
  const taskHTML = `<li class="list-group-item" id="emptyList">
  <input class="group-checkbox" id="${id}-input" type="checkbox" onchange="toggle(${id})">
  <button class="list-btn-group" data-action="delete" id="btn-group-del">
      <img class="group-trash-btn" src="./assets/trash.svg" alt="корзина">
  </button>
  <span id="${id}-span">${taskText}</span>
  </li>`
  
  
  tasksList.insertAdjacentHTML('afterbegin', taskHTML);

  taskInput.value = " "
  taskInput.focus()
 

  if (tasksList.children.Length > 1) {
    emptyList.classList.add('none')
  }

  saveHTMLtoLS()
}

// проверяем что клик был по кнопке "удалить задачу"
function deleteTask(event) {
  if (event.target.dataset.action === 'delete'){
  const parenNode = event.target.closest('.list-group-item')
  parenNode.remove()
  }

  saveHTMLtoLS()
}

function toggle(id) {
  const task = document.getElementById(`${id}-span`)
  const checkbox = document.getElementById(`${id}-input`)
  task.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

  saveHTMLtoLS()
}

function saveHTMLtoLS() {
  localStorage.setItem('tasksHTML', tasksList.innerHTML);
}