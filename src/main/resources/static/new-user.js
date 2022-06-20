const rolesUrl = 'http://localhost:8080/roles'

const addData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }
}

const newUserForm = document.querySelector('#newUserForm')

let selectRoles = []

const addRolesOnNewUserForm = async () => {
    return  await getData(rolesUrl)
}

const clickSelectRoleOption = (option) => {
    option.addEventListener('click', event => {
        event.preventDefault()
        const selectField = document.querySelector('#newUserForm select')
        selectField.blur()

        const selectRole = {
            id: option.value,
            name: option.text
        }

        const indx = selectRoles.findIndex(element => element.id === selectRole.id)

        if (indx === -1) {
            selectRoles.push(selectRole)
            option.classList.value = 'bg-secondary'
        } else {
            selectRoles.splice(indx, 1)
            option.classList.value = 'bg-white'
        }
    })
}

addRolesOnNewUserForm().then(allRoles => {
    const selectField = document.querySelector('#newUserForm select')
    selectField.size = allRoles.length

    for (let role of allRoles) {
        const option = document.createElement('option')
        option.value = role.id
        option.innerText = role.name
        option.style.background = '#fff'

        selectField.appendChild(option)
        clickSelectRoleOption(option)
    }
})

newUserForm.addEventListener('submit', event => {
    event.preventDefault()

    const newUser = {
        username: document.querySelector('#newUserFirstName').value,
        surname: document.querySelector('#newUserLastName').value,
        age: document.querySelector('#newUserAge').value,
        email: document.querySelector('#newUserEmail').value,
        numberPhone: document.querySelector('#newUserNumberPhone').value,
        password: document.querySelector('#newUserPassword').value,
        roles: selectRoles
    }

    addData(userUrl, newUser).then(() => location.reload())
})

