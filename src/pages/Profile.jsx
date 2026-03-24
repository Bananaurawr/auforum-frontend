import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../api/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await getUserProfile();
            setUser(response.data);
        } catch (err) {
            console.error('Profile error:', err.response?.data);
            setError(err.response?.data?.message || 'Failed to fetch profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">Loading...</div>;
    if (error) return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
                <h1 
                    onClick={() => navigate('/home')}
                    className="text-2xl font-bold text-blue-600 cursor-pointer"
                >
                    AUForum
                </h1>
                <button
                    onClick={() => navigate('/home')}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                >
                    ← Back
                </button>
            </nav>

            <div className="max-w-2xl mx-auto p-8">
                <div className="bg-white p-8 rounded-xl shadow">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>
                    {user && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                <p className="text-lg text-gray-800">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <p className="text-lg text-gray-800">{user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;