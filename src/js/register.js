import '../scss/login_register.scss'
import * as bootstrap from 'bootstrap'
import { createDropdownTheme } from '../components/dropdown_theme'
import { smallAlertError } from './alerts'
import Swal from 'sweetalert2'
import bcryptjs from 'bcryptjs'

createDropdownTheme()
const URLSERVER = "http://localhost:3000"
const form = document.getElementById("form")
const userName = document.getElementById("user-name")
const birthDate = document.getElementById("birth-date")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("password-confirm")

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
    } else {
        event.preventDefault()
        registerUser()
    }
})

async function registerUser() {
    const { validatedMatch, messageMatch } = validatePasswordMatch()
    const { validatedSecurity, messageSecurity } = validatePasswordSecurity()
    const { validatedEmail, messageEmail } = await validateEmailInDatabase(email.value)
    if (validatedMatch && validatedSecurity && validatedEmail) {
        saveUser()
    } else {
        if (validatedMatch === false) {
            smallAlertError(messageMatch)
        }

        if (validatedSecurity === false) {
            smallAlertError(messageSecurity)
        }

        if (validatedEmail === false) {
            smallAlertError(messageEmail)
        }
    }
}

function validatePasswordMatch() {
    if (password.value != passwordConfirm.value) {
        password.classList.add("is-invalid")
        return {
            validatedMatch: false,
            messageMatch: "the passwords do not match"
        }
    }
    return { validatedMatch: true }
}

function validatePasswordSecurity() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    if (regex.test(password.value)) {
        return {
            validatedSecurity: true,
        }
    }
    return {
        validatedSecurity: false,
        messageSecurity: "Passwords must have uppercase, lowercase, numbers and a special character"
    }
}

async function validateEmailInDatabase(email) {
    const response = await fetch(`${URLSERVER}/users?email=${email}`)
    const data = await response.json()
    if (data.length === 0) {
        return {
            validatedEmail: true,
        }
    }
    return {
        validatedEmail: false,
        messageEmail: "that email is already registered"
    }
}

async function saveUser() {
    const user = {
        roleId: "3",
        userName: userName.value,
        birthDate: birthDate.value,
        email: email.value,
        password: bcryptjs.hashSync(password.value, 8)
    }

    const response = await fetch(`${URLSERVER}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    if (response.ok && response.status == 201) {
        form.reset()
        form.classList.remove("was-validated");
        Swal.fire({
            title: `🌐Welcome ${user.userName}! 🚀`,
            icon: "success",
            showConfirmButton: false,
            timer: 1000
        })
    } else {
        Swal.fire({
            icon: "error",
            title: "Ups",
            text: `${response.statusText}`,
            confirmButtonColor: "#0d6efd",
        });
    }
}


