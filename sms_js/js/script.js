//  for side nav bar
const logout_btn = document.querySelector('#logout_btn');
let student_details = document.querySelector('#student-details');
const student = document.querySelector('#student');
const course = document.querySelector('#course');
let count_std_array = [];
let str_object = JSON.parse(localStorage.getItem("stinfo"));
if (Array.isArray(str_object)) {
    count_std_array = str_object;
    // console.log(count_std_array);
}
const totalStudents = count_std_array.length;
student.innerText = totalStudents;

const uniqueCourses = new Set();

count_std_array.forEach(function (student) {
    uniqueCourses.add(student.st_course);
});

const totalUniqueCourses = uniqueCourses.size;
course.innerText = totalUniqueCourses;

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar-wrapper");
    menuToggle.addEventListener("click", function () {
        document.getElementById("wrapper").classList.toggle("toggled");
    });
});

logout_btn.addEventListener("click", function () {
    localStorage.removeItem("authenticated");
    window.location.href = 'index.html';
})

// login authentication
if (!localStorage.getItem("authenticated")) {
    window.location.href = "index.html";
}

const currentUserName = localStorage.getItem("current_user_name");
console.log(currentUserName);
const userNameElement = document.querySelector("#user_name");
const admin_name = document.querySelector("#admin_name");
userNameElement.textContent = `${currentUserName}`;
admin_name.textContent = `Hello ${currentUserName}!!`;

// display student info
let html = '';
count_std_array.forEach((info, id) => {
    html += `<tr>
        <th scope="row">${id + 1}</th>
        <td>${info.st_name}</td>
        <td>${info.st_course}</td>
        <td>${info.st_sec !== undefined ? info.st_sec : ''}</td>
        <td><i class="fa-solid fa-trash-can" style="color: red;" onclick="std_info(${id})"></i></td>
    </tr>`;
})
student_details.innerHTML = html;

function std_info(id){
    count_std_array.splice(id, 1); 
}


// for datatable
$(document).ready(function () {
    $('#myDataTable').DataTable();
});