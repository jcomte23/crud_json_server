import '../scss/login_register.scss'
import Swal from 'sweetalert2'
import * as bootstrap from 'bootstrap'
import { createDropdownTheme } from '../components/dropdown_theme'

createDropdownTheme()
const URLSERVER = "http://localhost:3000"
const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")


form.addEventListener("submit", async (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
    } else {
        event.preventDefault()
        const { validatedEmail, messageEmail } = await validateEmailInDatabase()
        if (validatedEmail && (messageEmail === password.value)) {
            loginUser()
        } else {
            if (validatedEmail === false) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: `${messageEmail}`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: `incorrect password`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }

        }

    }
})


async function validateEmailInDatabase() {
    const response = await fetch(`${URLSERVER}/users?email=${email.value}`)
    const data = await response.json()
    if (data.length === 1) {
        return {
            validatedEmail: true,
            messageEmail: data[0].password
        }
    }
    return {
        validatedEmail: false,
        messageEmail: "the email does not exist"
    }


    // switch (password.value) {
    //     case "1":
    //         Swal.fire({
    //             toast: true,
    //             position: "top-end",
    //             icon: "success",
    //             title: `Success`,
    //             showConfirmButton: false,
    //             timer: 2000,
    //             timerProgressBar: true,
    //         });
    //         break;
    //     case "2":
    //         Swal.fire({
    //             toast: true,
    //             position: "top-end",
    //             icon: "error",
    //             title: `incorrect password`,
    //             showConfirmButton: false,
    //             timer: 2000,
    //             timerProgressBar: true,
    //         });
    //     case "3":
    //         Swal.fire({
    //             toast: true,
    //             position: "top-end",
    //             icon: "error",
    //             title: `User was not found`,
    //             showConfirmButton: false,
    //             timer: 2000,
    //             timerProgressBar: true,
    //         });
    //         break;

    //     default:
    //         break;
    // }
}

function loginUser() {
    window.location.href="src/users/index.html"
}