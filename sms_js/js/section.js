const mySelect = document.querySelector('#mySelect');
const search = document.querySelector('#search');
const section_info = document.querySelector('#section_info');
const no_data = document.querySelector('#no_data');
const table_info = document.querySelector('#table_info');
let nameArr = [];
let str_obj = JSON.parse(localStorage.getItem("stinfo"));
if (Array.isArray(str_obj)) {
    nameArr = str_obj;
}

function display_name() {
    let statement = '';
    statement = '<option value="">Select Student Name</option>';
    nameArr.forEach(function (name) {
        statement += `<option>${name.st_name}</option>`;
    });
    mySelect.innerHTML = statement;
}

let selectedStudent = [];
function displayRelevantData(selectedName) {
    selectedStudent = nameArr.filter(studentData => studentData.st_name === selectedName);
    let count = 1;
    html = '';
    if (selectedStudent) {
        selectedStudent.forEach((names, id) => {
            // console.log(id);
            html += `<tr>
        <th scope="row">${count++}</th>
        <td>${names.st_name}</td>
        <td>${names.st_course}</td>
        <td>${names.st_sec}</td>
        <td>
        <i class="fa-solid fa-user-pen" style="color: green;" onclick="add_sec(${id})"></i>
        <i class="fa-solid fa-trash-can" style="color: red;"></i>
        </td>
    </tr>`;
        })
        section_info.innerHTML = html;

    } else {
        alert('No Data');
    }
}

$(document).ready(function () {
    search.addEventListener("click", function () {
        const selectedName = mySelect.value;
        if (selectedName !== "") {
            displayRelevantData(selectedName);
            $('#no_data').hide();
            $('#table_info').show();

        } else {
            $('#table_info').hide();
            $('#no_data').show();
            Swal.fire({
                title: 'Hello!',
                text: 'Please Select Student Name!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
});
display_name();


const section = document.querySelector('#section');
const sec_form = document.querySelector('#sec_form');
sec_btn.addEventListener("click", function () {
    const sectionValue = section.value.trim();
    add_sec(sectionValue);
    sec_form.reset();
})

function add_sec(sectionValue) {
    
    if (selectedStudent.length > 0) {
        selectedStudent[0].st_sec = sectionValue;

        const selectedIndex = nameArr.findIndex(studentData => studentData.st_name === selectedStudent[0].st_name);

        if (selectedIndex !== -1) {
            nameArr[selectedIndex].st_sec = sectionValue;
            let str = JSON.stringify(nameArr);
            localStorage.setItem("stinfo", str);

            if(section.value == ''){
                Swal.fire({
                    title: 'Hello!',
                    text: 'Please Add Section!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }else{
                Swal.fire({
                    title: 'Hello!',
                    text: 'Section Added Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }

            displayRelevantData(selectedStudent[0].st_name);
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Selected student not found in the data!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'No student selected!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar-wrapper");
    menuToggle.addEventListener("click", function () {
        document.getElementById("wrapper").classList.toggle("toggled");
    });
});

const logout_btn = document.querySelector('#logout_btn');

logout_btn.addEventListener("click", function () {
    localStorage.removeItem("authenticated");
    window.location.href = 'index.html';
})

// login authentication
if (!localStorage.getItem("authenticated")) {
    window.location.href = "index.html";
}

// display login username
const currentUserName = localStorage.getItem("current_user_name");
console.log(currentUserName);
const userNameElement = document.querySelector("#user_name");
userNameElement.textContent = `${currentUserName}`;



