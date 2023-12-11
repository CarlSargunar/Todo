"use strict";
const todoModule = (function () {
    // Private variables and methods
    let newItemInput;
    let addItemButton;
    let todoList;
    let completedList;
    function addTodoItem(text, completed, completionTime) {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        const timestamp = document.createElement('span');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        timestamp.textContent = completionTime ? ` - Completed on: ${completionTime}` : '';
        timestamp.style.marginLeft = '10px';
        checkbox.onchange = () => {
            const currentTime = new Date().toLocaleString();
            const timeText = checkbox.checked ? ` - Completed on: ${currentTime}` : '';
            timestamp.textContent = timeText;
            moveItem(checkbox, listItem, text, timeText);
            saveItems();
        };
        function moveItem(checkbox, listItem, text, completionTime) {
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
            todoList.querySelectorAll('li').forEach(item => items.push({ text: item.textContent || '', completionTime: '' }));
            completedList.querySelectorAll('li').forEach(item => {
                var _a, _b, _c;
                const text = ((_a = item.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) || '';
                const completionTime = ((_c = (_b = item.lastChild) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.replace(' - Completed on: ', '')) || '';
                completedItems.push({ text, completionTime });
            });
            localStorage.setItem('todoItems', JSON.stringify(items));
            localStorage.setItem('completedItems', JSON.stringify(completedItems));
        }
        function loadItems() {
            const storedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
            const storedCompletedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');
            storedItems.forEach((item) => addTodoItem(item.text, false, ''));
            storedCompletedItems.forEach((item) => addTodoItem(item.text, true, item.completionTime));
        }
        function init() {
            newItemInput = document.getElementById('newItem');
            addItemButton = document.getElementById('addItem');
            todoList = document.getElementById('todoList');
            completedList = document.getElementById('completedList');
            loadItems();
            addItemButton.onclick = () => {
                const itemText = newItemInput.value;
                newItemInput.value = '';
                addTodoItem(itemText, false, '');
                saveItems();
            };
        }
        // Public API
        return {
            init: init
        };
    }
    ();
    // Initialize the module when the window is loaded
    window.onload = todoModule.init;
});
