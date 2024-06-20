import axios from 'axios';

const handleImageChange = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post<{ url: string }>('https://api.discoun3ree.com/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.url; // Return the uploaded image URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default handleImageChange;
