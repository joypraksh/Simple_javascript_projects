const to_do = document.querySelector('#to-do');
const text_to_do = document.querySelector("#text_to_do");
const success_msg = document.querySelector("#success_msg");
const error_msg = document.querySelector("#error_msg");
const todo_form = document.querySelector("#todo_form");
let todoArray = [];
let str_obj = localStorage.getItem("todo");
todoArray = JSON.parse(str_obj);
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
        Swal.fire({
            icon: 'success',
            title: 'Done...',
            text: 'Your Work Submitted Successfully !!'
        });
        setTodo(todoArray);
        todo_form.reset();
    }
});

function setTodo(todoArray) {
    let str = JSON.stringify(todoArray);
    localStorage.setItem("todo", str);
    displayTodo();
}

function displayTodo() {
    let card_text = document.querySelector("#card_text");
    let html = '';
    todoArray.forEach((text, index) => {
        const cardClass = text.completed ? 'bg-success' : 'bg-danger';
        const cardStatus = text.completed ? 'Completed' : 'On Process';
        const cardColor = text.completed ? 'green' : 'red';
        const cardBgColor = text.completed ? '#bae2ba' : '#e9aaaa';
        const fontIcon = text.completed ? 'fa-regular fa-trash-can' : '';

        html += `
        <div class="col-lg-6">
            <div class="card text-white ${cardClass} mb-3 mt-5" style="max-width: 20rem;">
                <div class="card-header d-flex justify-content-between" style="background: ${cardBgColor};">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault_${index}" ${text.completed ? 'checked' : ''} onclick= "toggleCompleted(${index})">
                    <h6 style="font-weight: 800; color: ${cardColor};">${cardStatus} !! <i
                    class="${fontIcon}" onclick = "deleteTodo(${index})" style="color: red;"></i></h6>
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
    Swal.fire({
        icon: 'success',
        title: 'Done...',
        text: 'Deleted Successfully !!'
    });
    setTodo(todoArray);
}

$(window).load(function () {
    $(".loader").delay(1000).fadeOut("slow");
    $("#overlayer").delay(1000).fadeOut("slow");
})
