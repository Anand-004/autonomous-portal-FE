import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL } from "../config";

export const useGet = async (endpoint) => {
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                    headers: {
                        token: token // Assuming 'token' is a valid authorization token
                    }
                })
                setData(response.data)
            } catch (e) {
                setErr(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [endpoint])

    return {
        data: data,
        error: err,
        loading: loading
    }
    
}


















