"use strict";
window.onload = () => {
    const newItemInput = document.getElementById('newItem');
    const addItemButton = document.getElementById('addItem');
    const todoList = document.getElementById('todoList');
    const completedList = document.getElementById('completedList');
    loadItems();
    addItemButton.onclick = () => {
        const itemText = newItemInput.value;
        newItemInput.value = '';
        addTodoItem(itemText, false);
        saveItems();
    };
    function addTodoItem(text, completed) {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.onchange = () => {
            moveItem(checkbox, listItem, text);
            saveItems();
        };
        listItem.appendChild(checkbox);
        listItem.append(text);
        if (completed) {
            completedList.appendChild(listItem);
        }
        else {
            todoList.appendChild(listItem);
        }
    }
    function moveItem(checkbox, listItem, text) {
        listItem.remove();
        if (checkbox.checked) {
            completedList.appendChild(listItem);
        }
        else {
            todoList.appendChild(listItem);
        }
    }
    function saveItems() {
        const items = [];
        const completedItems = [];
        todoList.querySelectorAll('li').forEach(item => items.push(item.innerText));
        completedList.querySelectorAll('li').forEach(item => completedItems.push(item.innerText));
        localStorage.setItem('todoItems', JSON.stringify(items));
        localStorage.setItem('completedItems', JSON.stringify(completedItems));
    }
    function loadItems() {
        const storedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
        const storedCompletedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');
        storedItems.forEach((item) => addTodoItem(item, false));
        storedCompletedItems.forEach((item) => addTodoItem(item, true));
    }
};
