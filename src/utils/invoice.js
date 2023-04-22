import axios from "axios"
export {
        getAllInvoices
};

async function getAllInvoices() { 
    try {
        const response = await axios.get(`http://localhost:8090/invoice/get-all`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}