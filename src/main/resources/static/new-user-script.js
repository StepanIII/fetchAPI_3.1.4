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

    return await response.json()
}


const listOptionRole = document.querySelectorAll('#newUserRoleSelect option')
let resultRoles = []

for (let option of listOptionRole) {
    option.style.background = '#fff'

    option.addEventListener('click', event => {
        event.preventDefault()
        document.querySelector('#newUserRoleSelect').blur()

        const roleFromForm = {
            id: option.value,
            name: option.text
        }

        const indx = resultRoles.findIndex(element => element.id === roleFromForm.id)

        if (indx === -1) {
            resultRoles.push(roleFromForm)
            option.classList.value = 'bg-secondary'
        } else {
            resultRoles.splice(indx, 1)
            option.classList.value = 'bg-white'
        }

        console.log(resultRoles)
    })
}

const newUserForm = document.querySelector('#newUserForm')

newUserForm.addEventListener('submit', event => {
    event.preventDefault()

    const data = {
        username: document.querySelector('#newUserFirstName').value,
        surname: document.querySelector('#newUserLastName').value,
        age: document.querySelector('#newUserAge').value,
        email: document.querySelector('#newUserEmail').value,
        numberPhone: document.querySelector('#newUserNumberPhone').value,
        password: document.querySelector('#newUserPassword').value,
        roles: resultRoles
    }

    console.log(JSON.stringify(data))

    addData('http://localhost:8080/users', data).then(() => location.reload())
})