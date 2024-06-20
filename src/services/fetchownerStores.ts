import axios from 'axios';

const fetchOwnerStores = async (token: string | null, setStores: Function) => {
  try {
    const response = await axios.get(`https://api.discoun3ree.com/api/user/shops`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setStores(response.data);
  } catch (error) {
    console.error('Error fetching stores:', error);
  }
};

export default fetchOwnerStores;
