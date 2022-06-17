const getData = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }

    return await response.json()
}

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

    return await response.json()
}

const eBtnList = document.querySelectorAll('#eBtn')
let resultJsonRoles = []

for(let eBtn of eBtnList) {
    const url = eBtn.getAttribute('href')

    eBtn.addEventListener('click',  event => {
        event.preventDefault()

        getData(url).then(json => {
            document.querySelector('#userId').value = json.id
            document.querySelector('#firstName').value = json.username
            document.querySelector('#lastName').value = json.surname
            document.querySelector('#age').value = json.age
            document.querySelector('#email').value = json.email
            document.querySelector('#numberPhone').value = json.numberPhone
            document.querySelector('#thisPassword').value = json.password

            resultJsonRoles = json.roles
            const editRoleSelect = document.querySelectorAll('#editForm #roleSelect option')

            for (let option of editRoleSelect) {
                const index = resultJsonRoles.findIndex(element => element.name === option.text)

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

const listRoleSelectOpt = document.querySelectorAll('#editForm #roleSelect option')

for (let option of listRoleSelectOpt) {
    option.addEventListener('click', event => {
        event.preventDefault()
        document.querySelector('#editForm #roleSelect').blur()

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

        console.log(resultJsonRoles)
    })
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
const url = '/users'
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

    console.log(JSON.stringify(data))

    updateData(url, data, method).then(() => location.reload())
})

