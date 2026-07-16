import {get, post} from './api/api.js'

const onLogin = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const res = await post('/auth/login', {username, password})
    console.log(res)
}

const button = document.querySelector("button")
button.addEventListener("click", onLogin)