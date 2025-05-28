import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { TextInput, Select, FileInput, Button } from 'flowbite-react';
import { Editor } from "@tinymce/tinymce-react";

const CreatePost = () => {
  const { theme } = useSelector(state => state.theme);
  const [content, setContent] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  // Added form submit handler to validate required fields
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Please enter the post content.');
      return;
    }
    if (!whatsappNumber.match(/^\d{10,15}$/)) {
      alert('Please enter a valid WhatsApp number (10-15 digits).');
      return;
    }
    // Proceed with your submission logic here
    alert('Form submitted successfully!');
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
          <Select id="category" required>
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
          onChange={(e) =>
            setWhatsappNumber(e.target.value.replace(/\D/g, ''))
          }
          pattern="^\d{10,15}$"
          inputMode="numeric"
          maxLength={15}
          required
        />

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput id="imageUpload" accept="image/*" />
          <Button
            type="button"
            className={`text-white cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-pink-700 transition-all duration-300 px-4 py-2 rounded-lg`}
            size="sm"
          >
            Upload Image
          </Button>
        </div>

       <Editor
  apiKey="wkchnbnblx997wceio6j0dacqib8kgy7h3qsdv3qlbddvbz0"
  value={content}
  onEditorChange={(newContent) => setContent(newContent)}
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
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help",
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; } .mce-placeholder { color: #888; }',
    setup: (editor) => {
      const placeholder = 'Write something...';

      function togglePlaceholder() {
        const content = editor.getContent({ format: 'text' }).trim();
        if (!content) {
          editor.getBody().classList.add('mce-placeholder');
          if (editor.getContent() === '') {
            editor.setContent('');
          }
          editor.setContent(placeholder);
        } else if (content === placeholder) {
          editor.getBody().classList.add('mce-placeholder');
        } else {
          editor.getBody().classList.remove('mce-placeholder');
        }
      }

      editor.on('init', () => {
        togglePlaceholder();
      });

      editor.on('focus', () => {
        if (editor.getContent({ format: 'text' }) === placeholder) {
          editor.setContent('');
          editor.getBody().classList.remove('mce-placeholder');
        }
      });

      editor.on('blur', () => {
        togglePlaceholder();
      });

      editor.on('keyup', () => {
        togglePlaceholder();
      });
    }
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
