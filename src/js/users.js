import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
import { createDropdownTheme } from '../components/dropdown_theme'
import bcryptjs from 'bcryptjs'

createDropdownTheme()

const URLBASE = "http://localhost:3000"
const rol = document.getElementById("rol")
const nameUser = document.getElementById("user-name")
const birthDate = document.getElementById("birth-date")
const email = document.getElementById("email")
const password = document.getElementById("password")
const btnSignoff = document.getElementById("sign-off")
const btnCloseModal = document.getElementById("btn-close-modal")
const form = document.getElementById("form")
const tbody = document.getElementById("tbody")
let userCache

document.addEventListener("DOMContentLoaded", () => {
    getRoles() 
    getUsers()
})

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
    } else {
        event.preventDefault()
        if (userCache === undefined) {
            saveUser()
        } else {
            updateUser(userCache)
        }
    }
})

tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains("btn-primary")) {
        userCache = event.target.getAttribute("data-id")
        nameUser.value = event.target.parentElement.parentElement.getElementsByTagName('td')[0].textContent;
        userAge.value = event.target.parentElement.parentElement.getElementsByTagName('td')[1].textContent;
    }

    if (event.target.classList.contains("btn-danger")) {
        let id = event.target.getAttribute("data-id")
        deleteUser(id)
    }
})

btnSignoff.addEventListener("click", () => {
    localStorage.setItem("isAutorizated", "false")
    window.location.reload(true)
})

async function saveUser() {
    const user = {
        roleId: rol.value,
        userName: nameUser.value,
        birthDate: birthDate.value,
        email: email.value,
        password: bcryptjs.hashSync(password.value,8)
    }

    await fetch(`${URLBASE}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    
    form.classList.remove("was-validated");
    form.reset()
    btnCloseModal.click()
    getUsers()
}

async function updateUser(id) {
    const user = {
        name: nameUser.value,
        age: userAge.value
    }

    const response = await fetch(`${URLBASE}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    userCache = undefined
    getUsers()
    form.reset()
}

async function getUsers() {
    const response = await fetch(`${URLBASE}/users?_embed=role`)
    const data = await response.json()
    renderUsers(data)
}

async function getRoles() {
    const response = await fetch(`${URLBASE}/roles`)
    const data = await response.json()
    renderRoles(data)
}

async function deleteUser(id) {
    await fetch(`${URLBASE}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    getUsers()
}

function renderUsers(data) {
    cleanTbody()
    data.forEach((element, index) => {
        const dateNow = new Date()
        const birthDate = new Date(element.birthDate)
        const ageInMilliseconds = dateNow - birthDate.getTime();
        const ageInYears = new Date(ageInMilliseconds).getFullYear() - 1970;
        tbody.innerHTML += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.role.name}</td>
            <td>${element.userName}</td>
            <td>${ageInYears} years</td>
            <td>${element.email}</td>
            <td>
                <button type="button" class="btn btn-primary" data-id="${element.id}">Edit</button>
                <button type="button" class="btn btn-danger" data-id="${element.id}">Delete</button>
            </td>
        </tr>
        `
    });
}

function renderRoles(data) {    
    data.forEach(element => {
        const option=document.createElement("option")
        option.value=element.id
        option.textContent=element.name
        rol.appendChild(option)
    });
}

function cleanTbody() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
}

