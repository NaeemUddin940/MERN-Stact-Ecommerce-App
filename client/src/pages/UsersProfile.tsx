import { useState } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MyLists from "@/components/UserProfileDetails/MyLists";
import MyOrders from "@/components/UserProfileDetails/MyOrders";
import MyProfile from "@/components/UserProfileDetails/MyProfile";


export default function UsersProfile() {
  const [activeTab, setActiveTab] = useState("myProfile");

  const history = useNavigate();
  return (
    <div className="flex mt-8  container-sm md:container-md mx-auto gap-6">
      {/* Left Sidebar Tabs */}
      <div className="w-60 border-1 shadow-lg dark:border-slate-600 dark:shadow-slate-800 rounded-lg p-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 relative rounded-full overflow-hidden mb-2">
            <img
              className="rounded-full"
              src="https://i.pravatar.cc/150?img=3"
              alt="profile"
            />
          </div>
          <h2 className="font-bold text-lg">MD. NAEEM UDDIN</h2>
          <p className="text-gray-500">mdnaeemuddin14@gmail.com</p>
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
          onClick={() => {
            toast.warning("You Are Log Out, Now Log in Agian..");
            history("/auth/login");
          }}
          className={`flex items-center gap-3 p-2 w-full text-left cursor-pointer rounded-md transition ${
            activeTab === "details"
              ? "bg-blue-100 text-foreground font-semibold"
              : "text-gray-600 hover:bg-gray-100 active:bg-violet-500"
          }`}>
          <LogOut /> Log Out
        </button>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-background dark:border-slate-600 dark:shadow-slate-800 border-1 shadow-lg rounded-lg p-6">
        {activeTab === "myProfile" && <MyProfile />}

        {activeTab === "myOrders" && <MyOrders />}
        {activeTab === "myLists" && <MyLists />}

        {activeTab === "details" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input type="tel" className="w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-gray-700">Date of Birth</label>
                <input type="date" className="w-full border rounded-md p-2" />
              </div>
            </form>
            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
