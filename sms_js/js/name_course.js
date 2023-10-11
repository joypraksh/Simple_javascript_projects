const st_name = document.querySelector('#st_name');
const st_course = document.querySelector('#st_course');
const st_info = document.querySelector('#st_info');
const st_NaCo_btn = document.querySelector('.btn');
const update_btn = st_NaCo_btn.innerText;
const table_info = document.querySelector('#table_info');
let std_name_course = [];
let update_id = null;

let str_obj = localStorage.getItem("stinfo");
std_name_course = JSON.parse(str_obj);
displayinfo();
st_NaCo_btn.addEventListener("click", function () {
    if (st_name.value == "" && st_course.value == "") {
        Swal.fire({
            title: 'Hello!',
            text: 'Please Enter Student Name and Course!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        if (update_id != null) {
            std_name_course[update_id].st_name = st_name.value;
            std_name_course[update_id].st_course = st_course.value;
            update_id = null;
        } else {
            std_name_course.push({
                "st_name": st_name.value,
                "st_course": st_course.value
            });
            // console.log(std_name_course); 
        }
    }
    st_NaCo_btn.innerText = update_btn;
    addinfo(std_name_course);
    st_info.reset();
});

function addinfo(std_name_course) {
    let str = JSON.stringify(std_name_course);
    localStorage.setItem("stinfo", str);
    displayinfo()
}

function displayinfo() {
    let html = '';
    std_name_course.forEach((info, id) => {
        html += `<tr>
        <th scope="row">${id + 1}</th>
        <td>${info.st_name}</td>
        <td>${info.st_course}</td>
        <td>
        <i class="fa-solid fa-user-pen" style="color: green;" onclick="std_edit(${id})"></i>
        <i class="fa-solid fa-trash-can" style="color: red;" onclick="std_del(${id})"></i>
        </td>
        </tr>`;
    });

    table_info.innerHTML = html;

}

function std_edit(id) {
    // console.log(id)
    update_id = id;
    st_name.value = std_name_course[update_id].st_name;
    st_course.value = std_name_course[update_id].st_course;
    st_NaCo_btn.innerText = 'UPDATE';

}

function std_del(id) {
    std_name_course.splice(id, 1);
    addinfo(std_name_course);
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
