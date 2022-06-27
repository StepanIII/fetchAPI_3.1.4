const deleteData = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url} статус ошибки ${response}`)
    }
}

let dUrl

const clickDeleteButton = (button) => {
    button.addEventListener('click',  event => {
        event.preventDefault()
        dUrl = button.href

        getData(dUrl).then(json => {
            document.querySelector('#deleteUserId').value = json.id
            document.querySelector('#deleteFirstName').value = json.username
            document.querySelector('#deleteLastName').value = json.surname
            document.querySelector('#deleteAge').value = json.age
            document.querySelector('#deleteEmail').value = json.email
            document.querySelector('#deleteNumberPhone').value = json.numberPhone

            const deleteRoleSelect = document.querySelector('#deleteRoleSelect')
            const allOldOption = document.querySelectorAll('#deleteRoleSelect option')
            allOldOption.forEach(option => option.remove())

            deleteRoleSelect.size = json.roles.length

            for (let i = 0; i < json.roles.length; i++) {
                const option = document.createElement('option')
                option.innerText = json.roles[i].name
                deleteRoleSelect.appendChild(option)
            }
        })

        const modal = new bootstrap.Modal(document.querySelector('#deleteModal'))
        modal.show()
    })
}

const closeDeleteModalWindow = () => {
    const deleteModal = document.querySelector('#deleteModal')
    deleteModal.classList.value = 'modal fade'
    deleteModal.style = 'display: none'
    deleteModal.setAttribute('aria-modal', '')
    deleteModal.setAttribute('aria-hidden', 'true')
    deleteModal.setAttribute('role', '')

    const body = document.querySelector('body')
    body.style.overflow = 'scroll'
    body.style.paddingRight = ''

    document.querySelector(".modal-backdrop").remove()
}


const dForm = document.querySelector('#deleteForm')

dForm.addEventListener('submit', event => {
    event.preventDefault()
    deleteData(dUrl).then(() => {
        clearAdminTable()
        fillAdminTable()


        closeDeleteModalWindow()
    })

    document.querySelector('#deleteForm #del-btn-close').addEventListener('click', event => {
        event.preventDefault()
        closeEditModalWindow()
    })
})
