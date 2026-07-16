import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, setUser } = useAuth();
 
const [image, setImage] = useState(
  user?.profileImage || "https://via.placeholder.com/150"
);
    const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Show preview immediately
  setImage(URL.createObjectURL(file));

  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/auth/profile-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data);

// Update image on screen
setImage(res.data.profileImage);

const updatedUser = {
  ...user,
  profileImage: res.data.profileImage,
};

setUser(updatedUser);

localStorage.setItem("user", JSON.stringify(updatedUser));

alert("Profile image updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Image upload failed.");
  }
};
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="flex flex-col items-center">

         <img
  src={image}
  alt="Profile"
  className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover"
/>
         <label className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
  Choose Image

  <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={handleImageChange}
/>
</label>

        </div>

      </div>
    </div>
  );
}

export default Profile;