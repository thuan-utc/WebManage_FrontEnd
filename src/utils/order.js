import axios from "axios"
export {
        getAllOrders
};

async function getAllOrders() { 
    try {
        const response = await axios.get(`http://localhost:8090/customer-order/get-all`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}