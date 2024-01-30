import '../scss/login_register.scss'
import * as bootstrap from 'bootstrap'
import { createDropdownTheme } from '../components/dropdown_theme'
import { smallAlertError } from './alerts'
import bcryptjs from 'bcryptjs'

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
        if (validatedEmail && (bcryptjs.compareSync(password.value, messageEmail))) {
            loginUser()
        } else {
            if (validatedEmail === false) {
                smallAlertError(messageEmail)
            } else {
                smallAlertError("incorrect password")
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
}

function loginUser() {
    localStorage.setItem("isAutorizated", "true")
    window.location.href = "src/users/indexUsers.html"
}