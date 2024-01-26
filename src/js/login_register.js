import '../scss/login_register.scss'
import * as bootstrap from 'bootstrap'

const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("password-confirm")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    registerUser()
})

function registerUser() {
    const { validated, message } = validatePassword()
}

function validatePassword() {
    if (password.value != passwordConfirm.value) {
        return {
            validated: false,
            message: "the passwords do not match"
        }
    }

    return { validated: true }
}