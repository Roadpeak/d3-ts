import axios from 'axios';

const handleImageChange = async (file: File, setImageUrl: Function, setLoading: Function) => {
  setLoading(true); // Set loading state to true when starting upload
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post<{ url: string }>('https://api.discoun3ree.com/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    setImageUrl(response.data.url);
  } catch (error) {
    console.error('Error uploading image:', error);
  } finally {
    setLoading(false); // Set loading state to false after upload completes (success or failure)
  }
};

export default handleImageChange;
