const authenticatedUrl = 'http://localhost:8080/users/authenticated'
const userUrl = 'http://localhost:8080/users'

const getData = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`������ �� ������ ${url} ������ ������ ${response}`)
    }

    return await response.json()
}

const fillHeader = async () => {
    return await getData(authenticatedUrl)
}

const fillAdminPanelUser = async () => {
    return await getData(authenticatedUrl)
}

fillHeader().then(authenticatedUser => {
    document.querySelector("#header .email").innerText = authenticatedUser.email

    const userRoles = authenticatedUser.roles
    const headerRoles = document.querySelector("#header .roles")

    for (let role of userRoles) {
        const spanRole = document.createElement('span')
        spanRole.innerText = role.name + " "
        headerRoles.appendChild(spanRole)
    }
})

fillAdminPanelUser().then(authenticatedUser => {
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
})