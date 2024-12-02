import axios from "axios";
import { BASE_URL } from "../config";


export const fetchDepartments = async () => {
  const token = sessionStorage.getItem('token')
  console.log("token - " , token)
  try {
    const response = await axios.get(`${BASE_URL}/main/dept`, {
        headers: {
          token: token // Assuming 'token' is a valid authorization token
        }
      }); 
      console.log(response.data);
      return response.data; 

    } catch (err) {
      // setError('Error fetching departments');
      console.error(err);
      return [];
    }
  };
  
  // export const fetchBatches = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/main/batch`); 
  //     console.log(response.data);
  //     return response.data;
  
  //   } catch (err) {
  //     // setError('Error fetching Batches');
  //     console.error(err);
  //     return [];
  //   }
  // };
  
  export const fetchStudentsData = async (data) => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.post(`${BASE_URL}/students/all`,data ,
        {
          headers: {
            token: token // Assuming 'token' is a valid authorization token
          }
        }
      ); 
      console.log(response.data);
      return response.data.data;

    } catch (err) {
      // setError('Error fetching Batches');
      console.error(err);
      return [];
    }
  };
 
export const fetchSubjectsData = async (data) => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.post(`${BASE_URL}/main/subjects`,data ,
        {
          headers: {
            token: token // Assuming 'token' is a valid authorization token
          }
        }
      ); 
      console.log(response.data);
      return response?.data?.data;

    } catch (err) {
      // setError('Error fetching Batches');
      console.error(err);
      return [];
    }
  };

  
export const insertData = async (dept_id, batch_id, data) => {
  const token = sessionStorage.getItem('token')
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
    },
    {
      headers: {
        token: token // Assuming 'token' is a valid authorization token
      }
    }
    );

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