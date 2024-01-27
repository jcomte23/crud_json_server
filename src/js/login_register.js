import '../scss/login_register.scss'
import * as bootstrap from 'bootstrap'

const form = document.getElementById("form")
const userName = document.getElementById("user-name")
const birthDate = document.getElementById("birth-date")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("password-confirm")

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
    }else{
        event.preventDefault()
        registerUser()
    }
    
})

function registerUser() {
    const { validated, message } = validatePassword()
    if (validated) {
        saveUser()
    } else {
        alert(message)
    }
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


async function saveUser() {
    const user = {
        userName: userName.value,
        birthDate: birthDate.value,
        email: email.value,
        password: password.value
    }

    const response = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })


    if (response.ok && response.status == 201) {
        form.reset()
        form.classList.remove("was-validated");
        alert("se guardo")
    }



}