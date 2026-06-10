import {overlay, nameInput, mailInput, phoneInput, addressInput, taxInput, saveBtn} from '../edit/edit.js'

const renderTable = async (headers, rows, className = null) => {

    const div = document.createElement('div');

    if (className) {
        div.className = className;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr')

    for (const header of headers) {
        const th = document.createElement('th')
        th.innerText = header.text
        headerRow.append(th)
    }
    const actionC = document.createElement('th')
    actionC.innerText = 'Action'
    headerRow.append(actionC);
    thead.append(headerRow)


    for (const row of rows) {
        const tr = document.createElement('tr');

        for (const header of headers) {
            const td = document.createElement('td')
            td.innerText = row[header.key]


            if (header.key === 'status') {
                td.innerHTML = `<span class="badge badge-active">${row[header.key]}</span>`;
            } else {
                td.innerText = row[header.key];
            }

            tr.append(td)
        }

        const action = document.createElement('td');
        action.className = 'actions';

        const editBtn = document.createElement('span');
        editBtn.className = 'action-icon';
        editBtn.title = 'Edit';
        editBtn.innerText = '✏️';

        editBtn.addEventListener('click', () => {
            document.querySelector('#popup-toggle').checked = true;
            saveBtn.dataset.id = row.id;

            nameInput.value = row.companyName;
            mailInput.value = row.email;
            phoneInput.value = row.phone;
            addressInput.value = row.address;
            taxInput.value = row.taxId;

            saveBtn.onclick = async () => {
                const id = saveBtn.dataset.id;
                const data = {
                    companyName: nameInput.value,
                    email: mailInput.value,
                    phone: phoneInput.value,
                    address: addressInput.value,
                    taxId: taxInput.value,
                };

                try {
                    if (id) {
                        await fetch(`http://localhost:3000/customers/${id}`, {
                            method: 'PATCH',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        });
                    } else {
                        await fetch(`http://localhost:3000/customers`, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({...data, status: 'Active'})
                        });
                    }

                    document.querySelector('#popup-toggle').checked = false;
                    location.reload();
                } catch (error) {
                    console.log(error);
                }
            };
        });

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'action-icon delete';
        deleteBtn.title = 'Delete';
        deleteBtn.innerText = '🗑️';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', async () => {
            const confirm = window.confirm(`Bạn có chắc muốn xóa "${row.companyName}" không?`);
            if (!confirm) return;

            try {
                await fetch(`http://localhost:3000/customers/${row.id}`, {
                    method: 'DELETE',
                });

                location.reload();
            } catch (error) {
                console.log(error);
            }
        });
        action.append(editBtn, deleteBtn);

        tr.append(action);
        tbody.append(tr)
    }
    table.append(thead, tbody);
    div.append(table);

    return div;
}


export {renderTable};