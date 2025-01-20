import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import useUserStore from "../stores/useUserStore";
import { motion } from "framer-motion";
import { useOrderStore } from "../stores/useOrderStore";

const ProfilePage = () => {
  const { user, updateProfile } = useUserStore();
  const { getOrderByUser, userOrders } = useOrderStore();

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

  useEffect(() => {
    getOrderByUser();
    console.log(userOrders);
    
  }, [getOrderByUser]);

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
      className="mt-[100px] p-[20px]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="text-[30px] text-emerald-400 font-semibold text-center">
        My Profile
      </motion.h1>

      <form action="" className=" lg:w-1/2 m-auto">
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
            htmlFor="email"
            className="block text-gray-300 text-sm font-medium"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            readOnly
            placeholder={user.email}
            className="mt-1 block h-full w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-400 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 active:bg-emerald-500"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
      </form>

      <div className="lg:w-1/2 p-[20px]  border border-gray-600 bg-gray-900 m-auto mt-2 rounded-lg">
        <h1 className="font-bold text-2xl border-b-2 pb-2">My Orders</h1>
        <div className="space-y-6 mt-2  p-4 m-auto bg-gray-800 rounded-lg shadow-lg">
        {userOrders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col justify-between items-center border border-gray-700 rounded-md p-4 gap-4 bg-gray-700 shadow-md"
          >
            <div className="flex flex-col w-full gap-4">
              <h2 className="bg-emerald-500 p-2 w-fit rounded-lg">{new Date(order.createdAt).toLocaleString()}</h2>

              <h2 className="bg-emerald-500 p-2 w-fit rounded-lg">OrderId : {order._id}</h2>
              
              <div>
                <table className="min-w-full  border overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600 text-white">
                      <th className="py-2 px-4">Product Name</th>
                      <th className="py-2 px-4">Price</th>
                      <th className="py-2 px-4">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr
                        key={product.product}
                        className="bg-gray-700 text-white"
                      >
                        <td className="border px-4 py-2">
                          {product.product.name}
                        </td>
                        <td className="border px-4 py-2">₹{product.price}</td>
                        <td className="border px-4 py-2">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

           
          </div>
        ))}
      </div>

      </div>
    </motion.div>
  );
};

export default ProfilePage;
