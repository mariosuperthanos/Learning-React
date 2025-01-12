import axios from "axios"

export const getData = async (body) => {
  try {
    const response = await axios.post('http://localhost:3000/api/new-meetup', body);

    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw new Error('Failed to fetch data');
  }
};