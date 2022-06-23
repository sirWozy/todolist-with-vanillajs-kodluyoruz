const addBtn = document.querySelector('#liveToastBtn')
const todoList = document.querySelector('#list')
const removeBtn = document.querySelectorAll('.close')
const toastSuccess = document.querySelector('.toast.success')
const toastError = document.querySelector('.toast.error')
const toastRemove = document.querySelector('.toast.remove')
const toastClose = document.querySelectorAll('#closeToast')
const todoArr = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : []

const addEl = () => {
  let text = document.querySelector('#task')
  if (text.value.trim() != '') {
    todoArr.push({
      id: `todo-${todoArr.length}`,
      value: text.value,
      checked: false
    })
    localStorage.setItem('todos', JSON.stringify(todoArr))
    todoList.innerHTML = ''
    createTask(todoArr)
    toggleToast(toastSuccess)
  } else {
    toggleToast(toastError)
  }
}

const createTask = (todoArr) => {
  todoArr.forEach((todo, index) => {
    let liDom = document.createElement('li')
    let liClose = document.createElement('a')

    if (todo.checked) {
      liDom.classList.add('checked')
    }

    liClose.href = '#'
    liClose.classList.add('close')
    liClose.setAttribute('onclick', `removeEl(${index})`)
    liClose.innerHTML = '<i class="bi bi-x"></i>'
    liDom.setAttribute('id', `todo-${index}`)
    liDom.setAttribute('onclick', `checkEl(${index})`)
    liDom.appendChild(document.createTextNode(todo.value))
    liDom.appendChild(liClose)
    todoList.appendChild(liDom)
  })
}

const checkEl = (id) => {
  let el = document.querySelector(`#todo-${id}`)
  if (!el.classList.contains('checked')) {
    el.classList.add('checked')
    todoArr[id].checked = true
    localStorage.setItem('todos', JSON.stringify(todoArr))
  } else {
    el.classList.remove('checked')
    todoArr[id].checked = false
    localStorage.setItem('todos', JSON.stringify(todoArr))
  }
}

const removeEl = (id) => {
  document.querySelector(`#todo-${id}`).remove()
  let index = todoArr
    .map(function (e) {
      return e.id
    })
    .indexOf(`todo-${id}`)
  todoArr.splice(index, 1)
  localStorage.setItem('todos', JSON.stringify(todoArr))
  toggleToast(toastRemove)
}

const toggleToast = (toast, close = false) => {
  if (!close) {
    toast.classList.remove('hide')
    toast.classList.add('show')
  } else {
    toast.classList.remove('show')
    toast.classList.add('hide')
  }
}

toastClose.forEach((e) => {
  e.addEventListener('click', (e) => {
    let el = e.target.parentNode.offsetParent.children.liveToast.classList.value
    el = document.getElementsByClassName(el)[0]
    toggleToast(el, true)
  })
})

if (todoArr !== []) createTask(todoArr)
