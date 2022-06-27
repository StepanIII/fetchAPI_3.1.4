const authenticatedUrl = 'http://localhost:8080/users/authenticated'
const userUrl = 'http://localhost:8080/users'

const getData = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }

    return await response.json()
}

const clearHeaderAdminPanel = () => {
    document.querySelector("#header .email").innerText = ''
    document.querySelectorAll("#header .roles span").forEach(span => span.remove())
}

const fillHeaderAdminPanel = async () => {
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

fillHeaderAdminPanel()

const fillAdminTable = async () => {
    const allUsers = await getData(userUrl)

    const adminTableBody = document.querySelector("#adminTable tbody")

    for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i]
        const fieldsUser = Object.keys(user)
        const tr = document.createElement('tr')

        for (let j = 0; j < 6; j++){
            const td = document.createElement('td')
            td.innerText = user[fieldsUser[j]]
            tr.appendChild(td)
        }

        const tdRoles = document.createElement('td')
        const userRoles = user.roles

        for (let r = 0; r < userRoles.length; r++) {
            const span = document.createElement('span')
            span.innerText = userRoles[r].name + " "
            tdRoles.appendChild(span)
        }

        tr.appendChild(tdRoles)

        const tdEButton = document.createElement('td')
        const eButton = document.createElement('button')
        eButton.classList.value = 'btn btn-primary'
        eButton.innerText = 'Edit'
        eButton.id = 'eBtn'
        eButton.href = '/users/' + user.id
        clickEditButton(eButton)

        tdEButton.appendChild(eButton)
        tr.appendChild(tdEButton)

        const tdDButton = document.createElement('td')
        const dButton = document.createElement('button')
        dButton.classList.value = 'btn btn-danger'
        dButton.innerText = 'Delete'
        dButton.id = 'dBtn'
        dButton.href = '/users/' + user.id
        clickDeleteButton(dButton)

        tdDButton.appendChild(dButton)
        tr.appendChild(tdDButton)

        adminTableBody.appendChild(tr)
    }
}

fillAdminTable()

const clearAdminPanelUser = () => {
    document.querySelector("#id").innerText = ''
    document.querySelector("#username").innerText = ''
    document.querySelector("#surname").innerText = ''
    document.querySelector("#userAge").innerText = ''
    document.querySelector("#userEmail").innerText = ''
    document.querySelector("#phone").innerText = ''

    document.querySelectorAll("#roles span").forEach(span => span.remove())
}

const fillAdminPanelUser = async () => {
    const authenticatedUser = await getData(authenticatedUrl)
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

fillAdminPanelUser()
