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

  
export const insertData = async (dept_id, batch_id, data) => {
  try {
    // console.log("Sending data:",
    //   "dept - ", dept_id,
    //   "batch - ", batch_id,
    //    data);

    // Send POST request
    const response = await axios.post(`${BASE_URL}/students/insert`, {
      dept : dept_id,
      batch : batch_id,
      data : data
    });

    // Log the successful response
    console.log("Response received:", response);
    
    // Return the actual response data, or any success flag you need
    return response.data;

  } catch (err) {
    // Log detailed error
    console.error("Error during data insertion:", err.response || err.message);

    // Optionally, return an error message for further handling
    return { success: false, message: err.response?.data?.message || 'An error occurred during data insertion.' };
  }
};