window.onload = () => {
    const newItemInput = document.getElementById('newItem') as HTMLInputElement;
    const addItemButton = document.getElementById('addItem') as HTMLButtonElement;
    const todoList = document.getElementById('todoList') as HTMLUListElement;
    const completedList = document.getElementById('completedList') as HTMLUListElement;

    loadItems();

    addItemButton.onclick = () => {
        const itemText = newItemInput.value;
        newItemInput.value = '';
        addTodoItem(itemText, false, '');
        saveItems();
    };

    function addTodoItem(text: string, completed: boolean, completionTime: string) {
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

        listItem.appendChild(checkbox);
        listItem.append(text);
        listItem.appendChild(timestamp);

        if (completed) {
            completedList.appendChild(listItem);
        } else {
            todoList.appendChild(listItem);
        }
    }

    function moveItem(checkbox: HTMLInputElement, listItem: HTMLLIElement, text: string, completionTime: string) {
        listItem.remove();
        if (checkbox.checked) {
            completedList.appendChild(listItem);
        } else {
            todoList.appendChild(listItem);
        }
    }

    function saveItems() {
        const items: { text: string; completionTime: string; }[] = [];
        const completedItems: { text: string; completionTime: string; }[] = [];

        todoList.querySelectorAll('li').forEach(item => items.push({ text: item.textContent || '', completionTime: '' }));
        completedList.querySelectorAll('li').forEach(item => {
            const text = item.firstChild?.textContent || '';
            const completionTime = item.lastChild?.textContent?.replace(' - Completed on: ', '') || '';
            completedItems.push({ text, completionTime });
        });

        localStorage.setItem('todoItems', JSON.stringify(items));
        localStorage.setItem('completedItems', JSON.stringify(completedItems));
    }

    function loadItems() {
        const storedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
        const storedCompletedItems = JSON.parse(localStorage.getItem('completedItems') || '[]');

        storedItems.forEach((item: any) => addTodoItem(item.text, false, ''));
        storedCompletedItems.forEach((item: any) => addTodoItem(item.text, true, item.completionTime));
    }
};
