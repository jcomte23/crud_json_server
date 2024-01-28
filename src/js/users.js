import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
import { createDropdownTheme } from '../components/dropdown_theme'

createDropdownTheme()

const URLBASE = "http://localhost:3000"
const nameUser = document.getElementById("user-name")
const userAge = document.getElementById("user-age")
const form = document.getElementById("form")
const tbody = document.getElementById("tbody")
let userCache

document.addEventListener("DOMContentLoaded", () => {
    getUsers()
})

form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
        event.preventDefault()
    }else{
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

async function saveUser() {
    const user = {
        name: nameUser.value,
        age: userAge.value
    }

    await fetch(`${URLBASE}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    form.reset()
    form.classList.remove("was-validated");
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
    const response = await fetch(`${URLBASE}/users`)
    const data = await response.json()
    renderUsers(data)
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
        tbody.innerHTML += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>
                <button type="button" class="btn btn-primary" data-id="${element.id}">Edit</button>
                <button type="button" class="btn btn-danger" data-id="${element.id}">Delete</button>
            </td>
        </tr>
        `
    });
}

function cleanTbody() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
}
