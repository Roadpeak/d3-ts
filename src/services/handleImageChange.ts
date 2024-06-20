import axios from 'axios';

const handleImageChange = async (file: File, setImageUrl: Function) => {
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
  }
};

export default handleImageChange;
