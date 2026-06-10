import {renderTable, headers, overlay, panel} from './utils'

const getCustomers = async () => {
    try {
        const response = await fetch("http://localhost:3000/customers");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const init = async () => {
    const customers = await getCustomers()
    panel.append(await renderTable(headers, customers))
}
init()