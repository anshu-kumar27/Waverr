import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

function ProfileEdit({ isProfileEdit, setProfileEdit }) {
  if (!isProfileEdit) return null;

  const [profileDetails, setProfileDetails] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null); // For storing the selected image
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get('/api/v1/updateMe', {
          withCredentials: true,
        });
        setProfileDetails(res?.data?.details ?? {});
        setFirstName(res?.data?.details?.user?.firstName || '');
        setLastName(res?.data?.details?.user?.lastName || '');
        setBio(res?.data?.details?.profile?.bio || '');
      } catch (error) {
        console.log('Error fetching profile');
        toast.error(error.message || 'Error fetching profile');
      }
    };
    if (isProfileEdit) getProfile();
  }, [isProfileEdit]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result); // Store the preview URL of the image (base64 string)
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Handle profile save
  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('bio', bio);

      // If there's a new avatar selected, append it to the formData
      if (newAvatar) {
        formData.append('avatar', newAvatar); // Send the base64 string directly
      }

      // Send POST request with FormData
      const response = await axios.post('/api/v1/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      // After successful update, update the profile details
      setProfileDetails({
        ...profileDetails,
        user: {
          ...profileDetails.user,
          avatar: {
            url: response.data.avatarUrl, // Assuming the server returns the new avatar URL
          },
        },
        profile: {
          ...profileDetails.profile,
          bio: bio,
        },
      });

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile');
      toast.error(error.message || 'Error updating profile');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl text-center space-y-4">
        <button
          onClick={() => setProfileEdit(false)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 hover:drop-shadow-[0_0_6px_red]"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center space-y-2 relative">
          {/* Profile Picture */}
          <div onClick={() => document.getElementById('file-input').click()}>
            <img
              src={newAvatar || profileDetails?.user?.avatar?.url}
              alt="Profile"
              className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 w-36 h-36 cursor-pointer border shadow-md"
            />
          </div>
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange} // Handle image selection
          />
          <p className="text-sm text-gray-500">User since: {new Date(profileDetails?.user?.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Last updated: {new Date(profileDetails?.user?.updatedAt).toLocaleDateString()}</p>
        </div>

        <div className="flex flex-col items-start text-left space-y-4">
          <div className="flex flex-row items-center w-full gap-2">
            <input
              type="text"
              placeholder={profileDetails?.user?.firstName || 'First Name'}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="text"
              placeholder={profileDetails?.user?.lastName || 'Last Name'}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border p-2 rounded w-1/2"
            />
          </div>
          <textarea
            placeholder={profileDetails?.profile?.bio || 'Bio'}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={handleSave} // Save the changes, including the profile picture
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;
