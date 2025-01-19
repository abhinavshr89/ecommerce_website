import  { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import useUserStore from "../stores/useUserStore";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user, updateProfile } = useUserStore();
  const [userData, setUserData] = useState({
    name: user.name,
    profileImage: user.profilePicture,
  });

  useEffect(() => {
    setUserData({
      name: user.name,
      profileImage: user.profilePicture,
    });
  }, [user]);
 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(userData);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="mt-[100px]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="text-[30px] text-emerald-400 font-semibold text-center">
        My Profile
      </motion.h1>

      <form action="" className="p-[20px] lg:w-1/2 m-auto">
        <div className="flex justify-center items-center rounded-full overflow-hidden w-[100px] h-[100px] m-auto bg-gray-700 relative">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img
              className="w-[100px] h-[100px]"
              src={userData.profileImage}
              alt="Profile"
            />
            <Camera className="absolute h-6 w-6 text-white right-3 bottom-5" />
            <input
              type="file"
              id="profileImage"
              className="absolute hidden bg-black"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="mt-4">
          <label
            htmlFor="name"
            className="block text-gray-300 text-sm font-medium"
          >
            Name
          </label>
          <div className="flex h-[40px] justify-center items-center">
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              readOnly={!isEditing}
              placeholder={user.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="mt-1 block h-full w-full bg-gray-700 border border-gray-600 rounded-l-md shadow-sm py-2 px-3 text-white focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={handleEditClick}
              className="bg-emerald-600 rounded-r-lg p-3 h-full mt-1 flex items-center justify-center active:bg-emerald-700"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="name"
            className="block text-gray-300 text-sm font-medium"
          >
            Email
          </label>
       
            <input
              type="text"
              id="name"
              name="name"
              value={user.email}
              readOnly
              placeholder={user.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="mt-1 block h-full w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none"
              required
            />
           
         
        </div>

        <div>
          
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 active:bg-emerald-500
            "
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfilePage;
