import axios from "axios";
import { BASE_URL } from "../config";


export const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/main/dept`); 
      console.log(response.data);
      return response.data;

    } catch (err) {
      // setError('Error fetching departments');
      console.error(err);
      return [];
    }
  };

  export const fetchBatches = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/main/batch`); 
      console.log(response.data);
      return response.data;

    } catch (err) {
      // setError('Error fetching Batches');
      console.error(err);
      return [];
    }
  };

  export const insertData = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/student/insert`,
        data
      ); 
      console.log(response);
      return true;

    } catch (err) {
      // setError('Error fetching Batches');
      console.error(err);
      return false;
    }
  };