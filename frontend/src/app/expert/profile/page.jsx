"use client";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Profile = () => {
  const router = useRouter();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchExpertProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/expert-signin");
          return;
        }
        const decoded = jwtDecode(token);
        const expertId = decoded._id;
        const response = await axios.get(
         `http://localhost:5000/expert/getbyid/${expertId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          // Handle null/undefined data
          setLoading(false);
          setExpert(null);
          setFormInitialValues({ name: "", email: "" });
          // Optionally show an error or redirect
          // router.push("/expert-signin");
          return;
        }

        setExpert(response.data);
        setFormInitialValues({
          name: response.data.name,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchExpertProfile();
  }, [router]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const expertId = decoded._id;
      await axios.put(`http://localhost:5000/expert/update/${expertId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpert({ ...expert, ...values });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
            Expert Profile
          </h1>

          {isEditing ? (
            <Formik
              initialValues={formInitialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="mt-1 block w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-colors"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600 dark:text-red-400 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-colors"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 dark:text-red-400 text-xs mt-1" />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-lg shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
                <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">{expert?.name}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-lg shadow-sm ring-1 ring-gray-100 dark:ring-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">{expert?.email}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
