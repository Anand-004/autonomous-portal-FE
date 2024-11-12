import axios from "axios";
import { BASE_URL } from "../config";

export const AdminLogin = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`,data); 
      console.log(response.data);
      const token = response.data.token
      sessionStorage.setItem('token', token)
      if(token) return true
      return false

    } catch (err) {
      // setError('Error fetching Batches');
      console.error(err);
      return false;
    }
  };