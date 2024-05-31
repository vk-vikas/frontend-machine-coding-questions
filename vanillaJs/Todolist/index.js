document.addEventListener("DOMContentLoaded", function (params) {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoButton = document.querySelector(".todo-button");

  // states
  let editMode = false;
  let itemToEdit = null;

  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputValue = todoInput.value.trim();

    if (inputValue !== "") {
      if (editMode) {
        console.log(itemToEdit.firstChild);
        itemToEdit.firstChild.innerText = inputValue;
        todoButton.innerText = "Add Todo";
        editMode = false;
        itemToEdit = null;
      } else {
        addTodo(inputValue);
      }

      //clearing the input
      todoInput.value = "";
    } else {
      alert("enter a valid todo");
    }
  });

  // edit and delete feature
  todoList.addEventListener("click", function (event) {
    // event target point
    const target = event.target;
    if (target.tagName === "BUTTON") {
      const selectedTodoItem = target.parentNode;
      if (target.innerText === "❌") {
        selectedTodoItem.remove();
      } else {
        // edit
        itemToEdit = selectedTodoItem;
        editMode = true;
        todoButton.innerText = "Edit Todo";
        todoInput.value = selectedTodoItem.firstChild.textContent;
        todoInput.focus();
      }
    }
  });

  function addTodo(todoText) {
    // creating the html elements that will be inside a todo
    const todoItem = document.createElement("li");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    // content for elements inside a individual todo
    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = "✏";
    deleteButton.innerText = "❌";

    // adding the 2 btns to the todo
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    // adding todo to the ul list
    todoList.appendChild(todoItem);
  }
});

/**
 * Important points or learnings
 * https://www.freecodecamp.org/news/innerhtml-vs-innertext-vs-textcontent/
 */
