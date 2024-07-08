import axios from 'axios';
import { toast } from 'react-toastify';

interface StoreData {
  name: string;
  location: string;
  store_type: string;
  image_url: string;
}

const addStore = async (storeData: StoreData, setLoading: Function, handleCloseAddStore: Function) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('Access token not found in localStorage');
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post('https://api.discoun3ree.com/api/shops', storeData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Store added successfully:', response.data);
    toast.success("Store creation successful!");
    window.location.reload();
  } catch (error) {
    console.error('Error adding store:', error);
    toast.error("An error occurred!");
  } finally {
    setLoading(false);
    handleCloseAddStore();
  }
};

export default addStore;
