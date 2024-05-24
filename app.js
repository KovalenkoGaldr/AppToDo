const taskInput = document.getElementById('input-text');
const form = document.getElementById('form');
const tasksList = document.querySelector('#list');
const emptyList = document.getElementById('emptyList')
const btnAll = document.getElementById('all')
const btnUnfulfilled = document.getElementById('unfulfilled')
const btnCompleted = document.getElementById('completed')

// отметить все задачи
btnAll.addEventListener('click', () => {
  markAllTasks();
});

function markAllTasks() {
  const checkboxes = list.querySelectorAll('.group-checkbox');
  checkboxes.forEach(checkbox => {
      checkbox.checked = true;
  });
}

// Удалить невыполненные задачи
btnCompleted.addEventListener('click', () => {
    removeUnfulfilledTasks();
});

function removeUnfulfilledTasks() {
  const tasksUnfulfilled = list.querySelectorAll('.list-group-item');
  tasksUnfulfilled.forEach(task => {
      const checkbox = task.querySelector('.group-checkbox');
      if (!checkbox.checked) {
          task.remove();
      }
  });
}
btnCompleted
// удалить выполненные задачи
btnUnfulfilled.addEventListener('click', () => {
  removeCompletedTasks();
});

function removeCompletedTasks() {
  const tasks = list.querySelectorAll('.list-group-item');
  tasks.forEach(task => {
      const checkbox = task.querySelector('.group-checkbox');
      if (checkbox.checked) {
          task.remove();
      }
  });
}


let tasks = [];
if (localStorage.getItem('tasks')!==null) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}



tasks.forEach(function (task){
  const cssClass = task.done ? 'task-title line-through' : 'task-title'
  
  const taskHTML = `<li class="list-group-item" id="${task.id}">
  <div class="list-group-item-left">
  <input class="group-checkbox" id="${task.id}-input" type="checkbox" onchange="toggle(${task.id})">
  <span class="${cssClass}" id="${task.id}-span">${task.text}</span>
  </div>
  <button class="list-btn-group" data-action="delete" id="btn-group-del">
      <img class="group-trash-btn" src="./assets/trash.svg" alt="корзина">
  </button>
  </li>`
  
  
  tasksList.insertAdjacentHTML('afterbegin', taskHTML);
})

// редактирование списка

tasksList.addEventListener('dblclick', function(event) {
  if (event.target.tagName === 'SPAN') {
      const currentText = event.target.innerText;
      console.log(event.target)
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
              event.target.innerText = input.value;  // Сохраняем новое значение
              event.target.style.display = '';      // Показываем li снова
              input.remove();                       // Удаляем поле ввода
          } else if (e.key === 'Escape') {
            event.target.innerText = currentText
            input.remove();                       // Удаляем поле ввода без сохранения
            event.target.style.display = '';
          }
        });
        
        // При потере фокуса сохраняем изменения и удаляем input
        // input.addEventListener('blur', function() {
        //     event.target.innerText = input.value;
        //     event.target.style.display = ''
        //     input.remove();
        // }, { once: true });

      // Скрываем текущий элемент LI и вставляем поле ввода
      event.target.style.display = 'none';
      event.target.parentNode.insertBefore(input, event.target);
      input.focus();  // Ставим фокус на элемент input
  }
});

// добавление задачи
form.addEventListener('submit', addTask)

// удаление задачи 

tasksList.addEventListener('click', deleteTask)


function addTask (event) { 
  event.preventDefault();
  if (!taskInput.value.trim()) {
    return
  }
  const id = Date.now();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  tasks.push(newTask)

  saveToLocalStorage()

  const cssClass = newTask.done ? 'task-title line-through' : 'task-title'
  
  const taskHTML = `<li class="list-group-item" id="${newTask.id}">
  <div class="list-group-item-left">
  <input class="group-checkbox" id="${id}-input" type="checkbox" onchange="toggle(${id})">
  <span class="${cssClass}" id="${id}-span">${newTask.text}</span>
  </div>
  <button class="list-btn-group" data-action="delete" id="btn-group-del">
      <img class="group-trash-btn" src="./assets/trash.svg" alt="корзина">
  </button>
  </li>`
  
  
  tasksList.insertAdjacentHTML('afterbegin', taskHTML);

  taskInput.value = " "
  taskInput.focus()
 

  if (tasksList.children.Length > 1) {
    emptyList.classList.add('none')
  }
}

// проверяем что клик был по кнопке "удалить задачу"
function deleteTask(event) {
  if (event.target.dataset.action !== 'delete') return;
  const parenNode = event.target.closest('.list-group-item');

  const id = Number(parenNode.id)
  // const index = tasks.findIndex((task) => task.id === id)
  // // удаляем задачу из массива с задачами
  // tasks.splice(index, 1)
  // удаляем задачу через фильтрацию массива
  tasks = tasks.filter((task) => task.id !== id)

  saveToLocalStorage()

  // удаляем задачу из разметки
  parenNode.remove()
  }

function toggle(id) {
  const task = document.getElementById(`${id}-span`)
  const checkbox = document.getElementById(`${id}-input`)
  task.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}

function removeListItems() {
  tasksList;
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  removeLocalStorage()
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
} 

function removeLocalStorage() {
  localStorage.removeItem('tasks')
} 