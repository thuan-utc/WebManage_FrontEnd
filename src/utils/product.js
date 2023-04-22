import axios from "axios"
export {
        getAllProducts
};

async function getAllProducts() { 
    try {
        const response = await axios.get(`http://localhost:8090/product/get-all-products`);
        return response.data;
    } catch(error) {
        alert('An error occurred: ' + error.message);
        return [];
    }
}