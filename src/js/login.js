import '../scss/login_register.scss'
import Swal from 'sweetalert2'
import * as bootstrap from 'bootstrap'

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
    console.log(email.value);
    console.log(password.value);
}