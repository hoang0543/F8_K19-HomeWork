import { resetForm, saveBtn, nameInput, mailInput, phoneInput, addressInput, taxInput } from '../edit/edit.js'

const main = document.createElement('main');
main.className = 'main-container';

const panel = document.createElement('div');
panel.className = 'panel';

const panelHeader = document.createElement('div');
panelHeader.className = 'panel-header';

const panelTitle = document.createElement('h2');
panelTitle.className = 'panel-title';
panelTitle.innerText = 'Customers';

const toolbar = document.createElement('div');
toolbar.className = 'toolbar';

const searchWrapper = document.createElement('div');
searchWrapper.className = 'search-wrapper';

const searchIcon = document.createElement('span');
searchIcon.className = 'search-icon';
searchIcon.innerText = '⚲';

const searchInput = document.createElement('input');
searchInput.className = 'search-input';
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', 'Search customers...');

searchWrapper.append(searchIcon, searchInput);

const addBtn = document.createElement('span');
addBtn.className = 'btn btn-add';
addBtn.innerHTML = '<span>+</span> Add New';

toolbar.append(searchWrapper, addBtn);
panelHeader.append(panelTitle, toolbar);
panel.append(panelHeader);
main.append(panel);

document.body.append(main);

addBtn.addEventListener('click', () => {
    resetForm();
    document.querySelector('#popup-toggle').checked = true;

    saveBtn.onclick = async () => {
        const data = {
            companyName: nameInput.value,
            email:       mailInput.value,
            phone:       phoneInput.value,
            address:     addressInput.value,
            taxId:       taxInput.value,
            status:      'Active'
        };

        try {
            await fetch('http://localhost:3000/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            document.querySelector('#popup-toggle').checked = false;
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };
});

export { main, panel, searchInput };