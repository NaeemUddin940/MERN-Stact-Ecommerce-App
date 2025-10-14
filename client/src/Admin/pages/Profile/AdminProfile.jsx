import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import {
  User,
  Box,
  Settings,
  Truck,
  Package,
  DollarSign,
  LogOut,
  Loader,
  Image,
} from "lucide-react";
import { putData } from "@/utils/PutData";
import { toast } from "react-toastify";
import { getData } from "@/utils/GetData";
import InputField from "@/components/ui/InputField";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

export default function AdminProfile() {
  const { logout } = useAuthContext();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showChangePassField, setShowChangePassField] = useState(false);
  const [changePassword, setChangePassword] = useState({
    email: localStorage.getItem("email"),
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editable, setEditable] = useState(false);
  const [adminProfileInfo, setAdminProdileInfo] = useState({
    name: user?.name,
    changePassword: "",
    mobile: user?.mobile,
  });
  // ✅ Fetch user data once
  async function getUserDetails() {
    try {
      const res = await getData("/api/user/user-details");
      setUser((prev) => ({ ...prev, ...res.data }));
    } catch (error) {
      console.error("❌ Failed to Fetch User Data to Authorization.");
    }
  }
  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      setAdminProdileInfo({
        name: user?.name,
        changePassword: "",
        mobile: user?.mobile,
      });
    }
  }, [user]);

  // Password change Handler
  function changePasswordInfo(e) {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  }

  async function submitChangePassword(e) {
    e.preventDefault();

    try {
      const res = await putData("/api/user/change-password", changePassword);

      if (res.success) {
        toast.success(res.message);
        setShowChangePassField(false);
      } else {
        toast.error(res.message);
        setShowChangePassField(true);
      }
    } catch (error) {
      console.error("❌ Error Changing Password:", error);
    }
  }

  // ✅ Personal Profile Input change
  function changeProfileInfo(e) {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [name]: value }));
  }

  // Admin Image Upload
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

  // Admin Profile Input change
  function prodileInfoChange(e) {
    const { name, value } = e.target;
    setAdminProdileInfo((prev) => ({ ...prev, [name]: value }));
  }

  // ✅ Submit handler
  async function submitAdminForm(e) {
    e.preventDefault();
    if (editable) {
      UpdateProfile();
      setEditable(false);
    } else {
      setEditable(true);
    }
  }

  const stats = [
    { id: 1, label: "Total Sales", value: "$24.8k", icon: DollarSign },
    { id: 2, label: "Orders", value: "1,423", icon: Package },
    { id: 3, label: "Shipped", value: "1,120", icon: Truck },
    { id: 4, label: "Products", value: "412", icon: Box },
    { id: 5, label: "Active Customers", value: "1,234", icon: Box },
    { id: 6, label: "Sales", value: "1,234", icon: Box },
    { id: 7, label: "Total Revenue", value: "1,234", icon: Box },
    { id: 8, label: "Total Revenue", value: "1,234", icon: Box },
    { id: 9, label: "Total Revenue", value: "1,234", icon: Box },
  ];

  const recentOrders = [
    {
      id: "#1001",
      customer: "Rashed Khan",
      total: "$120.00",
      status: "Delivered",
      time: "2h",
    },
    {
      id: "#1002",
      customer: "Maya Alim",
      total: "$78.50",
      status: "Processing",
      time: "4h",
    },
    {
      id: "#1003",
      customer: "Tania Rahman",
      total: "$240.00",
      status: "Shipped",
      time: "1d",
    },
  ];

  // ✅ Update API
  const UpdateProfile = async () => {
    try {
      const res = await putData(
        "/api/user/user-details-update",
        adminProfileInfo
      );
      if (res.success) {
        toast.success(res.message);
        getUserDetails(); // Refresh user data after update
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("❌ Error Updating Profile:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Main content */}
        <main className="space-y-6 mb-5">
          {/* Top bar for small screens */}
          <header className="lg:hidden bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                alt="Admin avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Admin
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700">
                Dashboard
              </button>
            </div>
          </header>

          {/* Top section: profile + stats */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Profile Card */}
            <article className="md:col-span-4 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative  flex items-center group justify-center rounded-full group overflow-hidden mb-2 ">
                    {loader ? (
                      <Loader />
                    ) : (
                      <img
                        className="rounded-full group-hover:opacity-15 h-full w-full object-cover"
                        src={user?.avatar}
                        alt="profile"
                      />
                    )}
                    <div className="flex flex-col absolute w-20 h-20 top-0 left-0 opacity-0 group-hover:opacity-80 group-hover:animate-fade-in items-center justify-center">
                      <Image size={20} />
                      <h4 className="text-sm mt-1 hover:opacity-15 pointer-events-none">
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
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Lead {user?.role} •••••• Since •{" "}
                      {user?.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                <aside className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-6 space-y-4">
                    <div className="mt-4 w-full flex items-center justify-between gap-2">
                      <button
                        onClick={
                          showChangePassField
                            ? submitChangePassword
                            : () => setShowChangePassField(true)
                        }
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 cursor-pointer dark:hover:bg-slate-600">
                        <span className="text-sm">
                          {showChangePassField
                            ? "Save Changes"
                            : "Change Password"}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          showChangePassField && setShowChangePassField(false);
                        }}
                        className="flex items-center gap-2  px-3 py-2 cursor-pointer rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:hover:bg-rose-800/60">
                        {showChangePassField ? (
                          "Cancel"
                        ) : (
                          <div className="flex items-center gap-2">
                            {" "}
                            <span className="text-sm">Cancel</span>
                          </div>
                        )}
                      </button>
                    </div>
                    {/* </div> */}

                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                        <User size={16} />{" "}
                        <span className="text-sm">Profile</span>
                      </li>
                      <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                        <Package size={16} />{" "}
                        <span className="text-sm">Products</span>
                      </li>
                      <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                        <Truck size={16} />{" "}
                        <span className="text-sm">Orders</span>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </article>

            {/* Stats cards */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.id}
                  className="bg-white h-25 dark:bg-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {s.label}
                    </p>
                    <p className="text-lg font-semibold">{s.value}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <s.icon size={20} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 ">
            <Collapse isOpened={showChangePassField ? true : false}>
              {showChangePassField && (
                <form
                  onSubmit={submitChangePassword}
                  className="block lg:col-span-2 flex-col gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl">
                  <InputField
                    label="Old Password"
                    type="password"
                    name={"oldPassword"}
                    value={changePassword.oldPassword}
                    onChange={changePasswordInfo}
                    placeholder="Enter Current Password"
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    name={"newPassword"}
                    value={changePassword.newPassword}
                    onChange={changePasswordInfo}
                    placeholder="Enter New Password"
                  />
                  <InputField
                    label="Confirm Password"
                    type="password"
                    name={"confirmPassword"}
                    value={changePassword.confirmPassword}
                    onChange={changePasswordInfo}
                    placeholder="Confirm New Password"
                  />
                </form>
              )}
            </Collapse>
            <aside className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold">Account Settings</h3>
              <form onSubmit={submitAdminForm} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400">
                    Name
                  </label>
                  <input
                    name="name"
                    disabled={!editable}
                    className={`mt-1 w-full rounded-lg border-2 bg-transparent px-3 py-2 transition-all duration-200 
                        ${
                          editable
                            ? "border-indigo-500 shadow-sm focus:border-indigo-700 focus:ring-2 focus:ring-indigo-500 dark:border-indigo-400 dark:focus:border-indigo-300"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                    value={adminProfileInfo.name}
                    onChange={prodileInfoChange}
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400">
                    Phone
                  </label>
                  <input
                    name="mobile"
                    disabled={!editable}
                    className={`mt-1 w-full rounded-lg border-2 bg-transparent px-3 py-2 transition-all duration-200 
                        ${
                          editable
                            ? "border-indigo-500 shadow-sm focus:border-indigo-700 focus:ring-2 focus:ring-indigo-500 dark:border-indigo-400 dark:focus:border-indigo-300"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                    value={adminProfileInfo.mobile}
                    onChange={prodileInfoChange}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    // onClick={submitAdminProfileInfo}
                    className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 active:scale-110 hover:bg-indigo-500 cursor-pointer text-white">
                    {editable ? "Save" : "Edit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditable(false)}
                    className="flex-1 cursor-pointer active:scale-110 text-red-400 bg-red-900/40 hover:bg-red-900/60 transparent px-3 py-2 rounded-lg border dark:border-slate-700">
                    Cancel
                  </button>
                </div>
              </form>
            </aside>
          </div>
          <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <ul className="mt-4 space-y-3">
              {recentOrders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
                  <div>
                    <p className="text-sm font-medium">
                      {o.id} • {o.customer}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {o.time} ago
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{o.total}</p>
                    <p
                      className={`text-xs ${
                        o.status === "Delivered"
                          ? "text-green-600"
                          : o.status === "Processing"
                          ? "text-amber-600"
                          : "text-sky-600"
                      }`}>
                      {o.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
