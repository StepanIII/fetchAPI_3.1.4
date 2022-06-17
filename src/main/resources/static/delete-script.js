const deleteData = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }

    return await response.json()
}

const dBtnList = document.querySelectorAll('#dBtn')
let delUrl

for(let dBtn of dBtnList) {
    const url = dBtn.getAttribute('href')
    delUrl = url

    dBtn.addEventListener('click',  event => {
        event.preventDefault()

        getData(url).then(json => {
            document.querySelector('#deleteUserId').value = json.id
            document.querySelector('#deleteFirstName').value = json.username
            document.querySelector('#deleteLastName').value = json.surname
            document.querySelector('#deleteAge').value = json.age
            document.querySelector('#deleteEmail').value = json.email
            document.querySelector('#deleteNumberPhone').value = json.numberPhone

            const deleteRoleOpt = document.querySelectorAll('#deleteRoleSelect option')
            document.querySelector('#deleteRoleSelect').size = json.roles.length

            for (let i = 0; i < json.roles.length; i++) {
                deleteRoleOpt[i].text = json.roles[i].name
            }

            console.log(json.roles)
        })

        const modal = new bootstrap.Modal(document.querySelector('#deleteModal'))
        modal.show()
    })
}

const dForm = document.querySelector('#deleteForm')

dForm.addEventListener('submit', event => {
    event.preventDefault()
    deleteData(delUrl).then(() => location.reload())
})