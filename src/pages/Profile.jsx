import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateProfilePicture } from '../api/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchUserProfile();
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setError(null);
        setSuccess('');

        if (!file) {
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('Please choose an image file.');
            event.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('Profile picture must be smaller than 5 MB.');
            event.target.value = '';
            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handlePictureSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setError('Choose a profile picture first.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', selectedFile);

        try {
            setSaving(true);
            setError(null);
            setSuccess('');
            const response = await updateProfilePicture(formData);
            setUser((currentUser) => ({
                ...currentUser,
                profile_picture: response.data.profile_picture,
            }));
            setSelectedFile(null);
            setPreviewUrl(null);
            setSuccess('Profile picture updated.');
        } catch (err) {
            console.error('Profile picture error:', err.response?.data);
            setError(err.response?.data?.message || 'Failed to update profile picture');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
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
                    &lt; Back
                </button>
            </nav>

            <div className="max-w-2xl mx-auto p-8">
                <div className="bg-white p-8 rounded-xl shadow">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            {success}
                        </div>
                    )}

                    {user && (
                        <div className="space-y-6">
                            <form onSubmit={handlePictureSubmit} className="flex flex-col sm:flex-row gap-6 sm:items-center">
                                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                                    {previewUrl || user.profile_picture ? (
                                        <img
                                            src={previewUrl || user.profile_picture}
                                            alt={`${user.name}'s profile`}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-4xl font-bold text-blue-600">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Profile Picture</label>
                                        <input
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!selectedFile || saving}
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                                    >
                                        {saving ? 'Saving...' : 'Save Picture'}
                                    </button>
                                </div>
                            </form>

                            <div className="border-t pt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                    <p className="text-lg text-gray-800">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                    <p className="text-lg text-gray-800">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
