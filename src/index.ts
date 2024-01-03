import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

document.addEventListener("DOMContentLoaded", function() {

  const list = document.querySelector<HTMLUListElement>("#list")
  const form = document.querySelector<HTMLFormElement>("#new-task-form")
  const input = document.querySelector<HTMLInputElement>("#new-task-title")

  var submitButton = document.getElementById("submitButton")
  var clearButton = document.getElementById("clearButton")

  const tasks: Task[] = loadTasks()
  tasks.forEach(addListItem)

  submitButton?.addEventListener("click", e => {
    e.preventDefault()
    console.log("Submit button clicked")

    if (input?.value == "" || input?.value == null) return

    const newTask: Task = {
      id: uuidV4(),
      title: input.value,
      completed: false,
      createdAt: new Date()
    }
    tasks.push(newTask)

    addListItem(newTask)
    input.value = ""
  })

  clearButton?.addEventListener("click", e => {
    console.log("Clear button clicked")
    clearLocalStorage()    
  })

  function clearLocalStorage() {
    localStorage.clear()
    location.reload()
  }

  function addListItem(task: Task) {
    const item = document.createElement('li')
    const label = document.createElement('label')
    const checkbox = document.createElement('input')
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked
      saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
  }

  function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
  }

  function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
  }

})