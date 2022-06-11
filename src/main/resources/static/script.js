
function fillModalWindow(selBtn, selModal) {
    const listInputModal = document.querySelectorAll(selModal + ' form input')

    for (let btn of document.querySelectorAll(selBtn)) {
        btn.addEventListener('click', function () {
            const listTd = btn.parentNode.parentNode.querySelectorAll('td')
            for (let i = 0; i < 6; i++) {
                listInputModal[i].value = listTd[i].textContent
            }

            const modal = new bootstrap.Modal(document.querySelector(selModal));
            modal.show();
        })
    }
}

fillModalWindow('#eBtn', '#editModal')
fillModalWindow('#dBtn', '#deleteModal')


