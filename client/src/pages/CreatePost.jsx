import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { TextInput, Select, FileInput, Button ,Spinner } from 'flowbite-react';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';
import {data, useNavigate}  from 'react-router-dom'

const CreatePost = () => {
  const { theme } = useSelector(state => state.theme);
  const [content, setContent] = useState('');
  const [file,setFile] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData , setFormData] = useState({});
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const navigate = useNavigate();

  // Added form submit handler to validate required fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Please enter the post content.');
      return;
    }

    if (!whatsappNumber.match(/^\d{10,15}$/)) {
      alert('Please enter a valid WhatsApp number (10-15 digits).');
      return;
    }

    try {
      const postPayload = {
        ...formData,
        title: e.target.title.value,
        category: e.target.category.value,
        content: formData.content,
        whatsapp: whatsappNumber,
        image: formData.image,
      };

      const res = await axios.post('/api/post/create', postPayload); // adjust URL if needed
      alert('Post created!');
      navigate(`/post/${res.data.slug}`)
      
    } catch (err) {
      alert(err.response.data.mesage);
      console.error(err);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please Select an image');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(true); // show loading

      const uploadData = new FormData();  // renamed from formData
      uploadData.append("file", file);
      uploadData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 
      uploadData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); 

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,  // fixed env var usage here
        uploadData
      );

      const imageUrl = res.data.secure_url;

      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setImageUploadProgress(false);
} catch (error) {
  console.error("Cloudinary Upload Error:", error.response?.data || error.message || error);
  setImageUploadError(
    error.response?.data?.error?.message || 'Image Upload failed'
  );
  setImageUploadProgress(false);
}

  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e)=>
            setFormData({...formData,title:e.target.value})
          } />
          <Select id="category" required onChange={(e)=>
            setFormData({...formData,category:e.target.value})
          }>
            <option value="">Select a category &nbsp;&nbsp;&nbsp;&nbsp;</option>
            <option value="health">Health</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="others">Others</option>
          </Select>
        </div>

        <TextInput
          type="tel"
          placeholder="Enter WhatsApp number"
          id="whatsapp"
          value={whatsappNumber}
        onChange={(e) => {
  const val = e.target.value.replace(/\D/g, '');
  setWhatsappNumber(val);
  setFormData(prev => ({ ...prev, whatsapp: val }));
}}
          pattern="^\d{10,15}$"
          inputMode="numeric"
          maxLength={15}
          required
        />

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
          className={` ${theme === 'dark' ? 'text-white':'' }`}
  id="imageUpload"
  accept="image/*"
  onChange={(e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setImageUploadError(null);       
            setFormData(prev => ({ ...prev, image: null })); 
    }
  }}
/>

          <Button
            type="button"
            className={`text-white cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-pink-700 transition-all duration-300 px-4 py-2 rounded-lg`}
            size="sm"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {
              imageUploadProgress ? (
  <div className="flex items-center gap-2">
    <Spinner size="sm" />
    <span>Uploading...</span>
  </div>
) : (
  'Upload Image'
)

            }
          </Button>
        </div>
      {imageUploadError && (
  <div className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded shadow">
    {imageUploadError}
  </div>
)}

        {
          formData.image && (
            <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
          ) 
        }

       <Editor
  apiKey="wkchnbnblx997wceio6j0dacqib8kgy7h3qsdv3qlbddvbz0"
  value={content}
  onEditorChange={(newContent) => {
    setContent(newContent); 
    setFormData(prev => ({ ...prev, content: newContent }));
  }}
  init={{
    height: 500,
    menubar: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount"
    ],
    toolbar:
      "undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright justify | \
      bullist numlist outdent indent | removeformat | help",
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; } .mce-placeholder { color: #888; }',
    
    // ✅ Native placeholder
    placeholder: "Write something..."
  }}
/>


        <Button
          type="submit"   
          className={`text-white cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-pink-700 transition-all duration-300 px-4 py-2 rounded-lg`}
          size="sm"
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
