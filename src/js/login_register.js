import '../scss/login_register.scss'
import * as bootstrap from 'bootstrap'

const form = document.getElementById("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("password-confirm")

form.addEventListener("submit",(event) => {
  event.preventDefault()
  registerUser()
})

function registerUser() {
    
}