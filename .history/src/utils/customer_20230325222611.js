import axios from "axios"
export {
        getAllCustomers
};

async function getAllCustomers(pageNumber, pageSize, searchCriteria) { 
    try {
      const response = await axios.get(`http://localhost:8090/customer/get-all-customer?pageNumber=${pageNumber}&pageSize=${pageSize}&searchCriteria=${searchCriteria}`);
      return response.data;
    } catch(error) {
      alert('An error occurred: ' + error.message);
      return [];
    }
}

async function addCustomer(customer) {
    try {
      const response = await axios.post('/api/customer/add', customer);
  
      return response.data;
    } catch (error) {
      console.error(error);
      alert('An error occurred: ' + error.message);
      return [];
    }
}

function editCustomer(Customer) {
  try {
    const response = axios.put('/api/customer/edit', customer);
    return response.data;
  } catch (error) {
    console.error(error);
    alert('An error occurred: ' + error.message);
    return [];
  }
}