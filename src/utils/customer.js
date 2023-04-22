import axios from "axios"
export {
  getAllCustomers, editCustomer, getAllCustomersWithSearchCriteria, addCustomer, deleteCustomer
};

async function getAllCustomers(pageNumber, pageSize) {
  try {
    const response = await axios.get(`http://localhost:8090/customer/get-all-customer?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    alert('An error occurred: ' + error.message);
    return [];
  }
}

async function getAllCustomersWithSearchCriteria(pageNumber, pageSize, searchCriteria) {
  try {
    const response = await axios.post(`http://localhost:8090/customer/get-all-customer-with-search-criteria?pageNumber=${pageNumber}&pageSize=${pageSize}`, searchCriteria);
    return response.data;
  } catch (error) {
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

async function editCustomer(customer) {
  try {
    axios.put('http://localhost:8090/customer/edit', customer)
      .then(response => {
        console.log('Customer updated successfully');
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred: ' + error.message);
      });
  } catch (error) {
    console.error(error);
    alert('An error occurred: ' + error.message);
    return [];
  }
}

async function deleteCustomer(id) {
  axios.delete(`http://localhost:8090/customer/delete/${id}`, id)
    .then(response => {
      console.log('Customer updated successfully');
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred: ' + error.message);
    });
}