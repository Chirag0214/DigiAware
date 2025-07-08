'use client';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageNews = () => {

    const [loading, setLoading] = useState(false);
    const [newsList, setnewsList] = useState([]);

    const fetchNews = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/news/getall')


        setnewsList(res.data);
        setLoading(false);
    }


    const deleteNews = async (newsId) => {
        const res = await axios.delete(`http://localhost:5000/news/delete/${newstId}`);
        if (res.status === 200) {
            fetchNews();
            toast.success('News Deleted Successfully');
        } else {
            toast.error('Error in Deleting News');
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="min-h-screen py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
            <h1 className="text-center font-bold text-3xl mb-10 text-gray-800 dark:text-gray-100">Manage News</h1>
            <div className="container mx-auto rounded-xl shadow-2xl bg-gray-100 dark:bg-gray-800 p-6">
                {
                    loading ?
                        <p className="text-center text-lg text-gray-700 dark:text-gray-300">Loading... Please Wait...!!</p>
                        :
                        (
                            <div className="overflow-x-auto">
                                <table className="w-full border-separate border-spacing-y-2">
                                    <thead className="bg-sky-700 dark:bg-sky-900 text-white">
                                        <tr className="text-left">
                                            <th className="px-3 py-2">ID</th>
                                            <th className="px-3 py-2">Title</th>
                                            {/* <th className="px-3 py-2">Email</th> */}
                                            <th className="px-3 py-2">Created At</th>
                                            <th className="px-3 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-left">
                                        {
                                            newsList.map((news) => (
                                                <tr key={news._id} className="bg-white dark:bg-gray-700 border-b hover:bg-sky-50 dark:hover:bg-sky-800 transition-colors">
                                                    <td className="p-3 text-xs break-all text-gray-700 dark:text-gray-200">{news._id}</td>
                                                    <td className="p-3 text-gray-800 dark:text-gray-100">{news.title}</td>
                                                    {/* <td className="p-3 text-gray-700 dark:text-gray-200">{news.email}</td> */}
                                                    <td className="p-3 text-gray-700 dark:text-gray-200">
                                                        {news.createdAt ? new Date(news.createdAt).toLocaleString() : "N/A"}
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex gap-2">
                                                            <button className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 py-2 rounded-2xl border border-blue-800 transition-colors flex items-center gap-2">
                                                                <Link href={`/admin/update-news/${news._id}`} className="flex items-center gap-1">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z" /></svg>
                                                                    Update
                                                                </Link>
                                                            </button>
                                                            <button
                                                                onClick={() => { deleteNews(news._id) }}
                                                                className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white px-4 py-2 rounded-2xl border border-red-800 transition-colors flex items-center"
                                                                title="Delete news">
                                                                <IconTrash size={22} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default ManageNews;