import axios from "axios"
export {
  login
};

async function login(user) {
  try {
    const response = await axios.post(`http://localhost:8090/login`, user);
    return response;
  } catch (error) {
    alert('Invalid credentials, check your userName and password');
    return [];
  }
}