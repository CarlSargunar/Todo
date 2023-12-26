"use strict";
class TodoApp {
    constructor() {
        this.newItemInput = document.getElementById('newItem');
        this.addItemButton = document.getElementById('addItem');
        this.todoList = document.getElementById('todoList');
        this.completedList = document.getElementById('completedList');
        this.addItemButton.onclick = () => this.addTodoItem(this.newItemInput.value, false);
        this.newItemInput.value = '';
        this.loadItems();
    }
    addTodoItem(text, completed) {
        if (!text)
            return;
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.onchange = () => this.toggleComplete(listItem, text);
        listItem.appendChild(checkbox);
        const textNode = document.createTextNode(text);
        listItem.appendChild(textNode);
        if (completed) {
            this.completedList.appendChild(listItem);
        }
        else {
            this.todoList.appendChild(listItem);
        }
        this.saveItems();
    }
    toggleComplete(listItem, text) {
        const checkbox = listItem.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        const isCompleted = checkbox.checked;
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
    }
    saveItems() {
        const items = [];
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
