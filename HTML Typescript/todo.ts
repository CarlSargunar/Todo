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
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.onchange = () => this.toggleComplete(listItem, text);

        listItem.appendChild(checkbox);
        const textNode = document.createTextNode(text);
        listItem.appendChild(textNode);

        if (completed) {
            this.completedList.appendChild(listItem);
        } else {
            this.todoList.appendChild(listItem);
        }

        this.saveItems();
    }

    private toggleComplete(listItem: HTMLLIElement, text: string) {
        const checkbox = listItem.querySelector('input[type="checkbox"]') as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
        const isCompleted = checkbox.checked;

        if (isCompleted) {
            this.completedList.appendChild(listItem);
        } else {
            this.todoList.appendChild(listItem);
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
