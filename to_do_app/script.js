const to_do = document.querySelector('#to-do');
const text_to_do = document.querySelector("#text_to_do");
const success_msg = document.querySelector("#success_msg");
const error_msg = document.querySelector("#error_msg");
const todo_form = document.querySelector("#todo_form");
const card_text = document.querySelector("#card_text"); // Moved the card_text element selection here

let todoArray = [];
const str_obj = localStorage.getItem("todo");
if (str_obj) {
    todoArray = JSON.parse(str_obj);
}

displayTodo();

to_do.addEventListener('click', () => {
    if (text_to_do.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Write Something in the Input Field !!'
        });
    } else {
        todoArray.unshift({
            "todo": text_to_do.value,
            "completed": false
        });
        setTodo(todoArray);
        Swal.fire({
            icon: 'success',
            title: 'Done...',
            text: 'Your Work Submitted Successfully !!',
            onClose: () => {
                todo_form.reset();
            }
        });
    }
});

function setTodo(todoArray) {
    const str = JSON.stringify(todoArray);
    localStorage.setItem("todo", str);
    displayTodo();
}

function displayTodo() {
    let html = '';
    todoArray.forEach((text, index) => {
        const cardClass = text.completed ? 'bg-success' : 'bg-danger';
        const cardStatus = text.completed ? 'Completed' : 'On Process';
        const cardColor = text.completed ? 'green' : 'red';
        const cardBgColor = text.completed ? '#bae2ba' : '#e9aaaa';
        const fontIcon = text.completed ? 'far fa-trash-can' : 'far fa-check-circle';

        html += `
        <div class="col-lg-3">
            <div class="card text-white ${cardClass} mb-3 mt-5" style="max-width: 20rem;">
                <div class="card-header d-flex justify-content-between" style="background: ${cardBgColor};">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault_${index}" ${text.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
                    <h6 style="font-weight: 800; color: ${cardColor};">${cardStatus} !! <i class="${fontIcon}" onclick="deleteTodo(${index})"></i></h6>
                </div>
                <div class="card-body">
                    <p class="card-text">${text.todo}</p>
                </div>
            </div>
        </div>`;
    });
    card_text.innerHTML = html;
}

function toggleCompleted(index) {
    todoArray[index].completed = !todoArray[index].completed;
    setTodo(todoArray);
}

function deleteTodo(index) {
    todoArray.splice(index, 1);
    setTodo(todoArray);
    Swal.fire({
        icon: 'success',
        title: 'Done...',
        text: 'Deleted Successfully !!'
    });
}

const searchInput = document.querySelector("#search_input");
searchInput.addEventListener('input', searchTodo);

function searchTodo() {
    const searchQuery = searchInput.value.toLowerCase();

    const filteredTodos = todoArray.filter((todo) => {
        return todo.todo.toLowerCase().includes(searchQuery);
    });

    displayFilteredTodos(filteredTodos);
}

function displayFilteredTodos(filteredTodos) {
    let html = '';

    filteredTodos.forEach((text, index) => {
        const cardClass = text.completed ? 'bg-success' : 'bg-danger';
        const cardStatus = text.completed ? 'Completed' : 'On Process';
        const cardColor = text.completed ? 'green' : 'red';
        const cardBgColor = text.completed ? '#bae2ba' : '#e9aaaa';
        const fontIcon = text.completed ? 'far fa-trash-can' : 'far fa-check-circle';

        html += `
        <div class="col-lg-3">
            <div class="card text-white ${cardClass} mb-3 mt-5" style="max-width: 20rem;">
                <div class="card-header d-flex justify-content-between" style="background: ${cardBgColor};">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault_${index}" ${text.completed ? 'checked' : ''} onclick="toggleCompleted(${index})">
                    <h6 style="font-weight: 800; color: ${cardColor};">${cardStatus} !! <i class="${fontIcon}" onclick="deleteTodo(${index})"></i></h6>
                </div>
                <div class="card-body">
                    <p class="card-text">${text.todo}</p>
                </div>
            </div>
        </div>`;
    });

    card_text.innerHTML = html;
}

to_do.addEventListener('click', () => {
    if (modal.style.display === 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
});

close.addEventListener('click', () => {
    modal.style.display = 'none';
});

$(window).on('load', function () {
    $(".loader").delay(1000).fadeOut("slow");
    $("#overlayer").delay(1000).fadeOut("slow");
});
