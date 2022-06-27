const authenticatedUrl = 'http://localhost:8080/users/authenticated'
const userUrl = 'http://localhost:8080/users'

const getData = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }

    return await response.json()
}

const fillHeaderUserPage = async () => {
    const authenticatedUser =  await getData(authenticatedUrl)

    document.querySelector("#header .email").innerText = authenticatedUser.email

    const userRoles = authenticatedUser.roles
    const headerRoles = document.querySelector("#header .roles")

    for (let role of userRoles) {
        const spanRole = document.createElement('span')
        spanRole.innerText = role.name + " "
        headerRoles.appendChild(spanRole)
    }
}

const fillUserPanel = async () => {
    const authenticatedUser =  await getData(authenticatedUrl)

    document.querySelector("#id").innerText = authenticatedUser.id
    document.querySelector("#username").innerText = authenticatedUser.username
    document.querySelector("#surname").innerText = authenticatedUser.surname
    document.querySelector("#userAge").innerText = authenticatedUser.age
    document.querySelector("#userEmail").innerText = authenticatedUser.email
    document.querySelector("#phone").innerText = authenticatedUser.numberPhone

    const roles = authenticatedUser.roles
    const rolesFromForm = document.querySelector("#roles")

    for (let role of roles) {
        const span = document.createElement('span')
        span.innerText = role.name + " "
        rolesFromForm.appendChild(span)
    }
}

fillHeaderUserPage()
fillUserPanel()