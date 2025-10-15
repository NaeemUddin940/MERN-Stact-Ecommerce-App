import { useState } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Image, LogOut, MapPinHouse } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MyLists from "@/components/UserProfileDetails/MyLists";
import MyOrders from "@/components/UserProfileDetails/MyOrders";
import MyProfile from "@/components/UserProfileDetails/MyProfile";
import { UploadImage } from "@/utils/UploadImage";
import { useAuthContext } from "@/context/AuthContext";
import Loader from "@/components/Loader/Loader";
import AddAddress from "@/components/UserProfileDetails/AddAddress";

export default function UsersProfile() {
  const [activeTab, setActiveTab] = useState("myProfile");
  const [loader, setLoader] = useState(false);
  const history = useNavigate();
  const { user } = useAuthContext();

  function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    async function postImage() {
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        setLoader(true);
        const res = await UploadImage("/api/user/upload-avatar", formData);

        if (res.success) {
          toast.success(res.message);
          setLoader(false);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Upload failed");
        setLoader(false);
      }
    }

    postImage();
  }

  return (
    <div className="flex mt-8  container-sm md:container-md mx-auto gap-6">
      {/* Left Sidebar Tabs */}
      <div className="w-60 border-1 shadow-lg dark:border-slate-600 dark:shadow-slate-800 rounded-lg p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 relative  flex items-center group justify-center rounded-full group overflow-hidden mb-2 ">
            {loader ? (
              <Loader />
            ) : (
              <img
                className="rounded-full group-hover:opacity-15 h-full w-full object-cover"
                src={user?.avatar}
                alt="profile"
              />
            )}
            <div className="flex flex-col absolute w-28 h-28 top-0 left-0 opacity-0 group-hover:opacity-80 group-hover:animate-fade-in items-center justify-center">
              <Image size={30} />
              <h4 className="text-xl mt-1 hover:opacity-15 pointer-events-none">
                Add Image
              </h4>
              <input
                type="file"
                name="avatar"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 h-full w-full z-50 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <h2 className="font-bold text-lg">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={() => setActiveTab("myProfile")}
          className={`flex items-center gap-3 p-2 w-full text-left rounded-md transition ${
            activeTab === "myProfile"
              ? "bg-violet-500 text-foreground font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}>
          <FiUser /> My Profile
        </button>

        <button
          onClick={() => setActiveTab("myOrders")}
          className={`flex items-center gap-3 p-2 w-full text-left rounded-md transition ${
            activeTab === "myOrders"
              ? "bg-violet-500 text-foreground font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}>
          <FiShoppingCart /> My Orders
        </button>

        <button
          onClick={() => setActiveTab("myLists")}
          className={`flex items-center gap-3 p-2 w-full text-left rounded-md transition ${
            activeTab === "myLists"
              ? "bg-violet-500 text-foreground font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}>
          <FiShoppingCart /> My Lists
        </button>

        <button
          onClick={() => setActiveTab("addAddress")}
          className={`flex items-center gap-3 p-2 w-full text-left rounded-md transition ${
            activeTab === "addAddress"
              ? "bg-violet-500 text-foreground font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          }`}>
          <MapPinHouse size={17} /> Add Address
        </button>

        <button
          onClick={() => {
            toast.warning("You Are Log Out, Now Log in Agian..");
            history("/auth/login");
          }}
          className={`flex items-center gap-3 p-2 w-full text-left cursor-pointer rounded-md transition ${
            activeTab === "details"
              ? "bg-blue-100 text-foreground font-semibold"
              : "text-gray-600 hover:bg-gray-100 active:bg-violet-500"
          }`}>
          <LogOut size={17} /> Log Out
        </button>
      </div>

      {/* Right Content */}
      <div className="flex-1 ">
        {activeTab === "myProfile" && <MyProfile />}

        {activeTab === "myOrders" && <MyOrders />}

        {activeTab === "myLists" && <MyLists />}

        {activeTab === "addAddress" && <AddAddress />}
      </div>
    </div>
  );
}
