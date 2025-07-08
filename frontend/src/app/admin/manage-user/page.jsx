'use client';
import {IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {

    const [loading, setLoading] = useState(false);
    const [userList, setuserList] = useState([]);

    const fetchUser = async () => {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/user/getall')


        setuserList(res.data);
        setLoading(false);
    }


    const deleteUser = async (userId) => {
        const res = await axios.delete(`http://localhost:5000/user/delete/${userId}`);
        if (res.status === 200) {
            fetchUser();
            toast.success('User Deleted Successfully');
        } else {
            toast.error('Error in Deleting uaer');
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
            <h1 className="text-center font-bold text-3xl mb-10 text-gray-800 dark:text-gray-100">Manage User</h1>
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
                                            <th className="px-3 py-2">Name</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">Registered At</th>
                                            <th className="px-3 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-left">
                                        {
                                            userList.map((user) => (
                                                <tr key={user._id} className="bg-white dark:bg-gray-700 border-b hover:bg-sky-50 dark:hover:bg-sky-800 transition-colors">
                                                    <td className="p-3 text-xs break-all text-gray-700 dark:text-gray-200">{user._id}</td>
                                                    <td className="p-3 text-gray-800 dark:text-gray-100">{user.name}</td>
                                                    <td className="p-3 text-gray-700 dark:text-gray-200">{user.email}</td>
                                                    <td className="p-3 text-gray-700 dark:text-gray-200">
                                                      {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                                                    </td>
                                                    <td className="p-3">
                                                        <button
                                                            onClick={() => { deleteUser(user._id) }}
                                                            className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white px-4 py-2 rounded-2xl border border-red-800 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <IconTrash size={22} />
                                                        </button>
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

export default ManageUser;