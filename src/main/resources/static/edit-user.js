const updateData = async (url, data, method) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }
}

const fillEditForm = async (url) => {
    return getData(url)
}

const fillEditFormRoles = async () => {
    return getData(rolesUrl)
}

fillEditFormRoles().then(allRoles => {
    const editRoleSelect = document.querySelector('#roleSelect')
    editRoleSelect.size = allRoles.length

    for (let role of allRoles) {
        const option = document.createElement('option')
        option.value = role.id
        option.innerText = role.name
        clickOnEditFormOption(option)
        editRoleSelect.appendChild(option)
    }
})

let resultJsonRoles = []

const clickEditButton = (button) => {
    button.addEventListener('click',  event => {
        event.preventDefault()
        resultJsonRoles = []
        const url = button.href

        fillEditForm(url).then(user => {
            document.querySelector('#userId').value = user.id
            document.querySelector('#firstName').value = user.username
            document.querySelector('#lastName').value = user.surname
            document.querySelector('#age').value = user.age
            document.querySelector('#email').value = user.email
            document.querySelector('#numberPhone').value = user.numberPhone
            document.querySelector('#thisPassword').value = user.password

            resultJsonRoles = user.roles

            const editRoleSelectOption = document.querySelectorAll('#roleSelect option')

            for (let option of editRoleSelectOption) {
                const index = user.roles.findIndex(element => element.name === option.text)

                if (!(index === -1)) {
                    option.classList.value = 'bg-secondary'
                } else {
                    option.classList.value = 'bg-white'
                }
            }
        })

        const modal = new bootstrap.Modal(document.querySelector('#editModal'))
        modal.show()
    })
}

const clickOnEditFormOption = (option) => {
    option.addEventListener('click', event => {
        event.preventDefault()
        document.querySelector('#roleSelect').blur()

        const roleFromForm = {
            id: option.value,
            name: option.text
        }

        const indx = resultJsonRoles.findIndex(element => element.name === roleFromForm.name)

        if (indx === -1) {
            resultJsonRoles.push(roleFromForm)
            option.classList.value = 'bg-secondary'
        } else {
            resultJsonRoles.splice(indx, 1)
            option.classList.value = 'bg-white'
        }
    })
}

const closeEditModalWindow = () => {
    const editModal = document.querySelector('#editModal')
    editModal.classList.value = 'modal fade'
    editModal.style = 'display: none'
    editModal.setAttribute('aria-modal', '')
    editModal.setAttribute('aria-hidden', 'true')
    editModal.setAttribute('role', '')

    const body = document.querySelector('body')
    body.style.overflow = 'scroll'
    body.style.paddingRight = ''

    document.querySelector(".modal-backdrop").remove()
}

let isChange = false
document.querySelector('#password').addEventListener('click', event => {
    event.preventDefault()
    isChange = confirm('Do you want to change password?')
    if (isChange) {
        document.querySelector('#password').value = ''
    } else {
        document.querySelector('#password').blur()
    }
})

const eForm = document.querySelector('#editForm')
eForm.addEventListener('submit', event => {
    event.preventDefault()

    let pass
    let method
    if (!isChange) {
        pass = document.querySelector('#thisPassword').value
        method = 'PATCH'
    } else {
        pass = document.querySelector('#password').value
        method = 'POST'
    }

    const data = {
        id: document.querySelector('#userId').value,
        username: document.querySelector('#firstName').value,
        surname: document.querySelector('#lastName').value,
        age: document.querySelector('#age').value,
        email: document.querySelector('#email').value,
        numberPhone: document.querySelector('#numberPhone').value,
        password: pass,
        roles: resultJsonRoles
    }

    updateData('/users', data, method).then(() => {
        clearAdminTable()
        fillAdminTable()

        clearHeaderAdminPanel()
        fillHeaderAdminPanel()

        clearAdminPanelUser()
        fillAdminPanelUser()

        closeEditModalWindow()
    })

    document.querySelector('#editForm #btn-close').addEventListener('click', event => {
        event.preventDefault()
        closeEditModalWindow()
    })
})


