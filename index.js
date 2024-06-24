const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUL = document.querySelector('#todo-list')
let tasks = []

function renderTaskOnHTML(taskTitle, done = false) {
    const li = document.createElement('li')

    const input = document.createElement('input') // <input />
    input.setAttribute('type', 'checkbox') // <input type='checkbox' />
    input.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement

        const spanToToggle = liToToggle.querySelector('span')

        const done = event.target.checked
        if (done) {
            spanToToggle.style.textDecoration = 'line-through'
        } else {
            spanToToggle.style.textDecoration = 'none'
        }
    input
        tasks = tasks.map(t => {
            if (t.title === spanToToggle.textContent) {
                return {
                    title: t.title, 
                    done: !t.done,
                }
            }

            return t
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
    input.checked = done

    const span = document.createElement('span')
    span.textContent = taskTitle
    if (done) {
        span.style.textDecoration = 'line-through'
    }

    const button = document.createElement('button')
    button.textContent = 'Remover'
    button.addEventListener('click', (event) => {
        const liToRemove = event.target.parentElement

        const titleToRemove = liToRemove.querySelector('span').textContent

        tasks = tasks.filter(t => t.title !== titleToRemove)

        todoListUL.removeChild(liToRemove)

        localStorage.setItem('tasks', JSON.stringify(tasks))
    })

    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    todoListUL.appendChild(li)
}

window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')

    if (!tasksOnLocalStorage) return

    tasks = JSON.parse(tasksOnLocalStorage)

    tasks.forEach(t => {
        renderTaskOnHTML(t.title, t.done)
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault() // Evita o comportamento de recarregar a página ao submeter o formulário

    const taskTitle = taskTitleInput.value 

    if (taskTitle.length < 3) {
        alert('Sua tarefa precisa ter pelomenos 3 caracteres.')
        return;
    }

    // Adicionando a nova tarefa no array de tasks
    tasks.push({
        title: taskTitle,
        done: false,
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))

    //Adicionando a nova tarefa no HTML 
    renderTaskOnHTML(taskTitle)

    taskTitleInput.value = ''
})

