import '../scss/login_register.scss'
import Swal from 'sweetalert2'
import * as bootstrap from 'bootstrap'
import { createDropdownTheme } from '../components/dropdown_theme'


createDropdownTheme()
const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")


form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
    } else {
        event.preventDefault()
        loginUser()
    }
})


function loginUser() {

    switch (password.value) {
        case "1":
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: `Success`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            break;
        case "2":
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: `incorrect password`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        case "3":
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: `User was not found`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            break;

        default:
            break;
    }
}