"use strict";
class TodoApp {
    constructor() {
        this.lastId = 0;
        console.log('Starting Todo App');
        this.newItemInput = document.getElementById('newItem');
        this.addItemButton = document.getElementById('addItem');
        this.todoList = document.getElementById('todoList');
        this.completedList = document.getElementById('completedList');
        this.addItemButton.onclick = () => {
            this.addTodoItem(this.newItemInput.value, false);
            this.saveItems();
        };
        this.newItemInput.value = '';
        this.loadItems();
    }
    addTodoItem(text, completed) {
        if (!text)
            return;
        this.lastId++;
        console.log('Adding Item: ' + text + 'with id: ' + this.lastId);
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.onchange = () => this.toggleComplete(listItem, text);
        listItem.setAttribute('data-id', this.lastId.toString());
        listItem.appendChild(checkbox);
        const textNode = document.createTextNode(text);
        listItem.appendChild(textNode);
        if (completed) {
            this.completedList.appendChild(listItem);
        }
        else {
            this.todoList.appendChild(listItem);
        }
    }
    toggleComplete(listItem, text) {
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        const isCompleted = checkbox.checked;
        console.log('Toggling Item: ' + text + ' - Completed: ' + isCompleted);
        // TODO: Move item to completed list if checked, otherwise move to todo list. This isn't working
        if (isCompleted) {
            this.completedList.appendChild(listItem);
        }
        else {
            this.todoList.appendChild(listItem);
        }
        this.saveItems();
    }
    loadItems() {
        const items = JSON.parse(localStorage.getItem('todoItems') || '[]');
        items.forEach(item => this.addTodoItem(item.text, item.completed));
        this.saveItems();
    }
    saveItems() {
        console.log('Saving Items');
        const items = [];
        Array.from(this.todoList.children).forEach(child => {
            //log the data-id attribute of the child
            console.log({ 'Completed': [child.getAttribute('data-id'), child.textContent] });
            items.push({ id: parseInt(child.getAttribute('data-id') || '0'), text: child.textContent || '', completed: false });
        });
        Array.from(this.completedList.children).forEach(child => {
            console.log({ 'Incomplete': [child.getAttribute('data-id'), child.textContent] });
            items.push({ id: parseInt(child.getAttribute('data-id') || '0'), text: child.textContent || '', completed: true });
        });
        localStorage.setItem('todoItems', JSON.stringify(items));
    }
}
window.onload = () => {
    new TodoApp();
};
