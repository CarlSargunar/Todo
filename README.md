# Todo

A list of todo apps built with different languages and frameworks. The app uses LocalStorage to store the todos.

To compile the Typescript files, run `tsc` in the root directory. This is a basic app so everything is in a single folder.

## Basic structure

    <h1>My Todo App</h1>
    <input type="text" id="newItem" placeholder="Add a new item">
    <button id="addItem">Add Item</button>

    <h2>Incomplete Tasks</h2>
    <ul id="todoList"><li data-id="1"><input type="checkbox"><span>write tests</span></li><li data-id="2"><input type="checkbox"><span>make sure it works somewhere</span></li></ul>

    <h2>Completed Tasks</h2>
    <ul id="completedList"><li data-id="3"><input type="checkbox"><span>eat food</span></li></ul>

    <br>
    <button id="clearAll">Clear All</button>