'use client';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UpdateNews = () => {

    const { id } = useParams();
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';
    const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';

    const fetchNews = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/news/getbyid/${id}`);
            console.log(res.data);
            setUserData(res.data);
        } catch (error) {
            toast.error('Error fetching news');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    const handleUpdate = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            let imageUrl = values.image;

            // Handle new image upload if file is selected
            if (values.newImage) {
                const formData = new FormData();
                formData.append('file', values.newImage);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const uploadData = await uploadRes.json();
                if (uploadData.secure_url) {
                    imageUrl = uploadData.secure_url;
                }
            }

            const updateData = {
                title: values.title,
                content: values.content,
                image: imageUrl
            };

            const res = await axios.put(`http://localhost:5000/news/update/${id}`, updateData);

            if (res.status === 200) {
                toast.success('News Updated Successfully');
                router.push('/admin/manage-news');
            }
        } catch (error) {
            toast.error('Error updating news');
            console.error(error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className='text-4xl text-center font-bold mb-6'>Update News</h1>

            <div className='container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
                {userData === null ? (
                    <p className="text-center">Loading...Please Wait</p>
                ) : (
                    <Formik
                        initialValues={{
                            title: userData.title || '',
                            content: userData.content || '',
                            image: userData.image || '',
                            newImage: null
                        }}
                        onSubmit={handleUpdate}
                        enableReinitialize={true}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border border-gray-300 px-3 py-2 rounded"
                                    />
                                    {touched.title && errors.title && (
                                        <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Content</label>
                                    <textarea
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        rows={5}
                                        className="w-full border border-gray-300 px-3 py-2 rounded"
                                    />
                                    {touched.content && errors.content && (
                                        <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                                    )}
                                </div>

                                {values.image && (
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Current Image</label>
                                        <img
                                            src={values.image}
                                            alt="Current"
                                            className="h-32 object-cover rounded border border-gray-300"
                                        />
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Update Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFieldValue('newImage', e.currentTarget.files[0])}
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || loading}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                >
                                    {loading ? 'Updating...' : 'Update News'}
                                </button>
                            </form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    )
}

export default UpdateNews;
