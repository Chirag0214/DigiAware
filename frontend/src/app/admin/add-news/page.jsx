'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CLOUDINARY_UPLOAD_PRESET = 'DigiAware'; // Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = 'dbvaoyo9h'; // Replace with your Cloudinary cloud name

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  image: Yup.mixed()
});

const AddNews = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setError('');
      setSuccess('');
      setLoading(true);
      let uploadedImageUrl = '';
      try {
        if (values.image) {
          const formData = new FormData();
          formData.append('file', values.image);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.secure_url) {
            uploadedImageUrl = data.secure_url;
            setImageUrl(uploadedImageUrl);
          } else {
            throw new Error('Image upload failed');
          }
        }
        const response = await fetch('http://localhost:5000/news/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            content: values.content,
            image: uploadedImageUrl,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add news');
        }
        setSuccess('News added successfully!');
        resetForm();
        setImageUrl('');
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add News</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Title</label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Content</label>
          <textarea
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />
          {formik.touched.content && formik.errors.content && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.content}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={e => formik.setFieldValue('image', e.currentTarget.files[0])}
            className="text-gray-900 dark:text-gray-200"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
          )}
        </div>
        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt="Uploaded" className="h-32 object-cover rounded border border-gray-300 dark:border-gray-700" />
          </div>
        )}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Add News'}
        </button>
      </form>
    </div>
  );
};

export default AddNews;