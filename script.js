let ul = document.querySelector('#todo-list');
let inputForm = document.querySelector('#input-form');
let input = document.querySelector('#input');
let all = document.querySelector('#all');
let active = document.querySelector('#active');
let complete = document.querySelector('#complete');
let idCounter = 1;
let todoCounter = 0;
let checkCounter = 0;

inputForm.onsubmit = async event =>{
    event.preventDefault();
    let inputValue = inputForm.input.value
    
    if(inputValue == null || inputValue === '') return;
    ShowButtons();
    let p = document.createElement('p');
    let checkBox = document.createElement('input');
    let removeButton = document.createElement('button');
    let div = document.createElement('div');

    div.setAttribute('id', 'div-' + idCounter);
    p.setAttribute('id', 'p-' + idCounter);
    p.classList.add('p-element');
    checkBox.setAttribute('id', 'checkbox-' + idCounter);
    checkBox.classList.add('checkbox-element');
    checkBox.setAttribute('onclick', 'CheckBox('+ idCounter + ')');
    removeButton.setAttribute('id', 'remove-element');
    removeButton.classList.add('remove-element');
    removeButton.setAttribute('onclick', 'RemoveTodo(' + idCounter +')');
    removeButton.innerText = '❌';
    div.classList.add('submited-todo');
    p.innerText = inputValue;
    checkBox.type = 'checkbox';
    removeButton.type = 'submit';
    
    let completeCheck = document.getElementById('complete').checked;
    if(completeCheck == true){
        div.style.display = 'none';
    }

    div.appendChild(checkBox);
    div.appendChild(p);
    div.appendChild(removeButton);
    ul.appendChild(div)
    input.value = null
    idCounter++
    todoCounter++
    ItemsLeft();
}

function ItemsLeft(){
    let todo = document.querySelector('#counter-text')
    let itemLeft = todoCounter === 1 ? 'item' : 'items'
    todo.innerText = todoCounter + ' ' + itemLeft + ' left'
}

function ShowButtons(){
    document.querySelector('#all').style.display = 'block';
    document.querySelector('#active').style.display = 'block';
    document.querySelector('#complete').style.display = 'block';
    document.querySelector('#counter').style.display = 'block';
    document.querySelector('#check-all').style.opacity = '0.3';
    document.getElementById('clear-completed').style.display = 'block'
    document.getElementById('clear-completed').style.opacity = '0';
}

function HideButtons(){
    document.querySelector('#all').style.display = 'none';
    document.querySelector('#active').style.display = 'none';
    document.querySelector('#complete').style.display = 'none';
    document.querySelector('#counter').style.display = 'none';
    document.getElementById('clear-completed').style.display = 'none'
    document.querySelector('#check-all').style.opacity = '0';
}

function AddBorder(button){
    document.getElementById(button).style.border = '1px solid rgba(175, 47, 47, 0.137)';
    document.getElementById(button).style.borderRadius = '4px';
}

function CheckBox(index){
    let check = document.getElementById('checkbox-' + index).checked;
    let activeCheck = document.getElementById('active').checked;
    let completeCheck = document.getElementById('complete').checked;

    if(check == true){
        document.getElementById('p-' + index).style.textDecoration = 'line-through';
        document.getElementById('p-' + index).style.opacity = '0.3';
        document.getElementById('clear-completed').style.opacity = '1';
        if(activeCheck == true){
            document.getElementById('div-' + index).style.display = 'none';
        }
        todoCounter--
        checkCounter++
    }
    else{
        document.getElementById('p-' + index).style.textDecoration = 'none';
        document.getElementById('p-' + index).style.opacity = '1';
        if(activeCheck == false){
            document.getElementById('div-' + index).style.display = 'grid';
        }
        if(completeCheck == true){
            document.getElementById('div-' + index).style.display = 'none';
        }
        todoCounter++
        checkCounter--
    }

    if(checkCounter == 0){
        document.getElementById('clear-completed').style.opacity = '0';
    }

    if(todoCounter != 0){
        document.getElementById('check-all').style.opacity = '0.5';
        document.getElementById('check-all').checked = 'false';
    }
    else{
        document.getElementById('check-all').style.opacity = '1';
        document.getElementById('check-all').checked = 'true';
    }

    ItemsLeft();
}

function RemoveTodo(index){
    let div = document.querySelector('#div-' + index);
    let check = document.getElementById('checkbox-' + index).checked;
    let removeCheck = document.getElementById('check-all').checked;

    ul.removeChild(div)
    let listCount = CountDivList()

    if(removeCheck == true){
        if(check == false){
            todoCounter--
        }
        else{
            checkCounter--
        }
        if(todoCounter == 0){
            HideButtons(); 
        }
        if(checkCounter == 0){
            document.getElementById('clear-completed').style.display = 'none'
        }
        if(listCount == 0){
            HideButtons();
            document.getElementById('check-all').style.opacity = '0'
        }
    }
    else{
        if(check == false){
            todoCounter--
        }
        if(todoCounter == 0){
            document.getElementById('clear-completed').style.display = 'block'
        }
        if(checkCounter == 0){
            document.getElementById('clear-completed').style.display = 'block'
        }
        if(listCount == 0){
            HideButtons();
            document.getElementById('check-all').style.opacity = '0'
        }
    }
    ItemsLeft();
}

function CountDivList(){
    let list = document.getElementById('todo-list');
    let counter = 0;
    for(i = 1; i < list.childNodes.length; i++){
        counter++
    }
    return counter;
}

function ClearCompleted(){
    let allCompleted = document.querySelectorAll('input[type="checkbox"]:checked');
    
    for(let i = 0; i < allCompleted.length; i++){
        let div = allCompleted[i].parentElement;
        ul.removeChild(div);
        checkCounter--
    }

    if(checkCounter == 0){
        document.getElementById('clear-completed').style.opacity = '0';
        document.querySelector('#check-all').style.opacity = '0';
    }

    if(todoCounter == 0){
        HideButtons();
    }
    else{
        document.querySelector('#check-all').style.opacity = '0.3';
    }
}

function textDecorationOnOff(input){
    let allP = document.getElementsByClassName('p-element');
    if(input == 'on'){
        for(let i = 0; i < allP.length; i++){
            allP[i].style.textDecoration = 'line-through';
            allP[i].style.opacity = '0.3';
        }
    }
    else{
        for(let i = 0; i < allP.length; i++){
            allP[i].style.textDecoration = 'none';
            allP[i].style.opacity = '1';
        }
    }
}

function CheckAll(){
    let allUnChecked = document.querySelectorAll('input[type="checkbox"]:not(:checked)');
    let allChecked = document.querySelectorAll('input[type="checkbox"]:checked');
    let activeCheck = document.getElementById('active').checked;
    let completeCheck = document.getElementById('complete').checked;
    let divList = CountDivList();
    
    if(divList == 0) return;

    if(todoCounter != 0){
        document.querySelector('#check-all').style.opacity = '1';
        document.getElementById('clear-completed').style.opacity = '1';

        for(let i = 0; i < allUnChecked.length; i++){
            allUnChecked[i].checked = true;
            textDecorationOnOff('on');
            todoCounter--
            checkCounter++
            ItemsLeft();
        }

        if(activeCheck == true){
            let todos = document.getElementsByClassName('submited-todo');
            for(i = 0; i < todos.length; i++){
                todos[i].style.display = 'none';
            }
        }
        else if(completeCheck == true){
            let todos = document.getElementsByClassName('submited-todo');
            for(i = 0; i < todos.length; i++){
                todos[i].style.display = 'grid';
            }
        }
    }
    else{
        document.querySelector('#check-all').style.opacity = '0.3';
        document.getElementById('clear-completed').style.opacity = '0';

        for(let i = 0; i < allChecked.length; i++){
            allChecked[i].checked = false;
            textDecorationOnOff('off');
            todoCounter++
            checkCounter--
            ItemsLeft();
        }

        if(activeCheck == true){
            let todos = document.getElementsByClassName('submited-todo');
            for(i = 0; i < todos.length; i++){
                todos[i].style.display = 'grid';
            }
        }
        else if(completeCheck == true){
            let todos = document.getElementsByClassName('submited-todo');
            for(i = 0; i < todos.length; i++){
                todos[i].style.display = 'none';
            }
        }
    }
}

function ShowItems(button){
    if(button == 'all'){
        let allDivs = document.getElementById('todo-list').children;

        for(i = 0; i < allDivs.length; i++){
            allDivs[i].style.display = 'grid';
        }

        document.getElementById('all').checked = true;
        document.getElementById('active').checked = false;
        document.getElementById('complete').checked = false;
        AddBorder(button);
        document.getElementById('active').style.border = 'none';
        document.getElementById('complete').style.border = 'none';
    }
    if(button == 'active'){
        let allChecked = document.querySelectorAll('input[type="checkbox"]:checked');
        let allNotChecked = document.querySelectorAll('input[type="checkbox"]:not(:checked)');
        document.getElementById('active').checked = true;
        document.getElementById('all').checked = false;
        document.getElementById('complete').checked = false;

        for(i = 0; i < allChecked.length; i++){
            allChecked[i].parentElement.style.display = 'none';
        }
        for(i = 0; i < allNotChecked.length; i++){
            allNotChecked[i].parentElement.style.display = 'grid';
        }

        AddBorder(button);
        document.getElementById('all').style.border = 'none';
        document.getElementById('complete').style.border = 'none';
    }
    if(button == 'complete'){
        let allChecked = document.querySelectorAll('input[type="checkbox"]:checked');
        let allNotChecked = document.querySelectorAll('input[type="checkbox"]:not(:checked)');
        document.getElementById('complete').checked = true;
        document.getElementById('active').checked = false;
        document.getElementById('all').checked = false;

        for(i = 0; i < allChecked.length; i++){
            allChecked[i].parentElement.style.display = 'grid';
        }
        for(i = 0; i < allNotChecked.length; i++){
            allNotChecked[i].parentElement.style.display = 'none';
        }

        AddBorder(button);
        document.getElementById('all').style.border = 'none';
        document.getElementById('active').style.border = 'none';
    }
}