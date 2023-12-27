type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
    completionTime?: string;
};

class TodoApp {
    private newItemInput: HTMLInputElement;
    private addItemButton: HTMLButtonElement;
    private todoList: HTMLUListElement;
    private completedList: HTMLUListElement;
    private clearAllButton: HTMLButtonElement;
    private lastId : number = 0;


    constructor() {
        console.log('Starting Todo App');
        this.newItemInput = document.getElementById('newItem') as HTMLInputElement;
        this.addItemButton = document.getElementById('addItem') as HTMLButtonElement;
        this.todoList = document.getElementById('todoList') as HTMLUListElement;
        this.completedList = document.getElementById('completedList') as HTMLUListElement;
        this.clearAllButton = document.getElementById('clearAll') as HTMLButtonElement;


        this.addItemButton.onclick = () => {
            console.log('Adding Item: ' + this.newItemInput.value);
            this.addTodoItem(this.newItemInput.value, false);
            this.newItemInput.value = '';
            this.saveItems();
        };

        this.clearAllButton.onclick = () => {
            console.log('Clearing All Items');
            this.todoList.innerHTML = '';
            this.completedList.innerHTML = '';
            this.saveItems();
        }

        this.newItemInput.value = '';
        this.loadItems();
    }

    private addTodoItem(text: string, completed: boolean) {
        if (!text) return;

        this.lastId ++;
        console.log('Adding Item: ' + text + 'with id: ' + this.lastId);

        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        const textSpan = document.createElement('span');
        textSpan.textContent = text;

        checkbox.type = 'checkbox';
        checkbox.checked = completed;
        checkbox.onchange = () => this.toggleComplete(listItem);

        listItem.setAttribute('data-id', this.lastId.toString());

        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);

        if (completed) {
            this.completedList.appendChild(listItem);
        } else {
            this.todoList.appendChild(listItem);
        }
    }

    private toggleComplete(listItem: HTMLLIElement) {
        let checkbox = listItem.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const isCompleted = checkbox.checked;

        // Finf the text span beneath the list
        const textSpan = listItem.querySelector('span') as HTMLSpanElement;
        const text = textSpan.textContent || '';

        console.log('Toggling Item: ' + text + ' - Completed is ' + isCompleted);
        console.log(listItem);

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
        this.saveItems();
    }

    private saveItems() {

        console.log('Saving Items');
        const items: TodoItem[] = [];

        Array.from(this.todoList.children).forEach(child => {
            //log the data-id attribute of the child
            console.log({'Incomplete':[ child.getAttribute('data-id'), child.textContent ]});
            items.push({ id: parseInt(child.getAttribute('data-id') || '0'), text: child.textContent || '', completed: false });
        });

        Array.from(this.completedList.children).forEach(child => {
            console.log({'Completed':[ child.getAttribute('data-id'), child.textContent ]});
            items.push({ id: parseInt(child.getAttribute('data-id') || '0'), text: child.textContent || '', completed: true });
        });

        localStorage.setItem('todoItems', JSON.stringify(items));
    }
}

window.onload = () => {
    new TodoApp();
};
