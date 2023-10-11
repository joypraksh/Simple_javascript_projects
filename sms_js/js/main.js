const std_name = document.querySelector("#name");
const std_email = document.querySelector("#email");
const std_passwoed = document.querySelector("#pass");
const reg_btn = document.querySelector("#register_btn");
const log_btn = document.querySelector("#log_btn");
const log_email = document.querySelector("#log_email");
const log_pass = document.querySelector("#log_pass");
const log_form = document.querySelector("#log_form");
const register_form = document.querySelector("#register_form");
let dataArray = [];

let str_obj = localStorage.getItem("data");
if (str_obj != null) {
    dataArray = JSON.parse(str_obj);
}

reg_btn.addEventListener("click", function () {
    if (std_name.value == '' || std_email.value == '' || std_passwoed.value == '') {
        Swal.fire({
            title: 'Hello!',
            text: 'Enter Your Details!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } else {
        let reginfo = dataArray.find(regdetail => regdetail.email === std_email.value && regdetail.pass === std_passwoed.value);
        if (reginfo) {
            Swal.fire({
                title: 'Hello!',
                text: 'Email ID and Password Already Registered!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } else {
            dataArray.push({
                "name": std_name.value,
                "email": std_email.value,
                "pass": std_passwoed.value
            });
            Swal.fire({
                title: 'Hello!',
                text: 'Register Successfully Done!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }

    saveinfo(dataArray);
    register_form.reset();
});

function saveinfo(dataArray) {
    let str = JSON.stringify(dataArray);
    localStorage.setItem("data", str);
}

log_btn.addEventListener("click", function () {
    let searchData = dataArray.find(stdInfo => stdInfo.email === log_email.value && stdInfo.pass === log_pass.value);
    // console.log(searchData);
    if (searchData) {
        localStorage.setItem("current_user_name", searchData.name);
        Swal.fire({
            title: 'Hello!',
            text: 'Login Successfully Done!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'dashboard.html';
            }
        });
        //login authentication
        localStorage.setItem("authenticated", "true");
    } else {
        Swal.fire({
            title: 'Hello!',
            text: 'Invald Email and Password!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
    log_form.reset();
});