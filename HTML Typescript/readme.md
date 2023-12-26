# Typescript and HTML

This todo app is built with Typescript and HTML. It uses LocalStorage to store the todos.

To compile the Typescript files, run `tsc` in the `Typescript` directory.

## Build Process

This project relies on Parcel to build the typescript into html. To install Parcel, run the following command:

    npm install

Run the following command to start the development server with Parcel:

    npm start




## HTML Snippet
Assuming you have a basic HTML structure like this:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Todo App</title>
    </head>
    <body>
        <input type="text" id="newItem" placeholder="Add a new item">
        <button id="addItem">Add Item</button>

        <h2>Incomplete Tasks</h2>
        <ul id="todoList"></ul>

        <h2>Completed Tasks</h2>
        <ul id="completedList"></ul>

        <script src="todo.js"></script>
    </body>
    </html>

## TypeScript Module (todo.ts)

    type TodoItem = {
        text: string;
        completed: boolean;
        completionTime?: string;
    };

    class TodoApp {
        private newItemInput: HTMLInputElement;
        private addItemButton: HTMLButtonElement;
        private todoList: HTMLUListElement;
        private completedList: HTMLUListElement;

        constructor() {
            this.newItemInput = document.getElementById('newItem') as HTMLInputElement;
            this.addItemButton = document.getElementById('addItem') as HTMLButtonElement;
            this.todoList = document.getElementById('todoList') as HTMLUListElement;
            this.completedList = document.getElementById('completedList') as HTMLUListElement;

            this.addItemButton.onclick = () => this.addTodoItem(this.newItemInput.value, false);
            this.newItemInput.value = '';

            this.loadItems();
        }

        private addTodoItem(text: string, completed: boolean) {
            if (!text) return;

            const listItem = document.createElement('li');
            listItem.textContent = text;
            listItem.onclick = () => this.toggleComplete(listItem, text);

            if (completed) {
                this.completedList.appendChild(listItem);
            } else {
                this.todoList.appendChild(listItem);
            }

            this.saveItems();
        }

        private toggleComplete(listItem: HTMLLIElement, text: string) {
            const isCompleted = listItem.parentElement === this.completedList;
            if (isCompleted) {
                this.todoList.appendChild(listItem);
            } else {
                this.completedList.appendChild(listItem);
            }
            this.saveItems();
        }

        private loadItems() {
            const items = JSON.parse(localStorage.getItem('todoItems') || '[]') as TodoItem[];
            items.forEach(item => this.addTodoItem(item.text, item.completed));
        }

        private saveItems() {
            const items: TodoItem[] = [];

            Array.from(this.todoList.children).forEach(child => {
                items.push({ text: child.textContent || '', completed: false });
            });

            Array.from(this.completedList.children).forEach(child => {
                items.push({ text: child.textContent || '', completed: true });
            });

            localStorage.setItem('todoItems', JSON.stringify(items));
        }
    }

    window.onload = () => {
        new TodoApp();
    };

## Explanation
TypeScript Class: TodoApp manages the TODO app's state and UI interactions.

DOM Elements: The constructor initializes DOM elements like the input field, button, and lists.

Event Handling: Event handlers are attached to the add button and list items for adding and toggling tasks.

Local Storage: The loadItems and saveItems methods handle loading and saving tasks to localStorage.

Toggle Task Completion: Clicking a task moves it between incomplete and complete lists and updates the state accordingly.

## Compile and Run

    tsc
    open index.html
