import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InputField from "../ui/InputField";
import { getData } from "@/utils/GetData";
import { putData } from "@/utils/PutData";
import toast from "react-hot-toast";      
import { Input } from "../ui/input";
import { Collapse } from "react-collapse";
import { Card } from "../ui/card";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: null,
  });
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const [showChangePassField, setShowChangePassField] = useState(false);
  const [changePassword, setChangePassword] = useState({
    email: localStorage.getItem("email"),
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  // ✅ Sync profileInfo when user changes
  useEffect(() => {
    if (user) {
      setProfileInfo({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        dob: user.dob || null,
      });
    }
  }, [user]);

  // ✅ Update API
  const UpdateProfile = async () => {
    try {
      const res = await putData("/api/user/user-details-update", profileInfo);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("❌ Error Updating Profile:", error);
    }
  };

  // ✅ Submit handler
  function submitProfileInfo(e) {
    e.preventDefault();
    UpdateProfile();
    setDisable(true);
  }

  // ✅ Personal Profile Input change
  function changeProfileInfo(e) {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [name]: value }));
  }

  // ✅ DOB select
  function handleDOBSelect(date) {
    if (date) {
      setProfileInfo((prev) => ({
        ...prev,
        dob: date.toISOString(),
      }));
    }
    setOpen(false);
  }

  // ✅ Edit / Save toggle
  function changeButton(e) {
    e.preventDefault();
    if (disable) setDisable(false);
    else submitProfileInfo(e);
  }

  const dobValue =
    profileInfo?.dob && !isNaN(new Date(profileInfo.dob))
      ? new Date(profileInfo.dob).toLocaleDateString("en-GB")
      : "";

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

  // Password change Handler
  function changePasswordInfo(e) {
    const { name, value } = e.target;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">Personal Information</h1>
            <p className="text-gray-500">
              Update your personal information to keep your account secure.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <Button
            type="button"
            variant={showChangePassField ? "modern" : "destructive"}
            onClick={
              showChangePassField
                ? submitChangePassword
                : () => setShowChangePassField(true)
            }>
            {showChangePassField ? "Save Changes" : "Change Password"}
          </Button>
          {showChangePassField && (
            <Button onClick={() => setShowChangePassField(false)}>
              <XIcon />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 w-full">
        {/* Profile Form */}
        <form
          onSubmit={submitProfileInfo}
          className={`grid ${
            showChangePassField ? "lg:col-span-4" : "w-full col-span-6"
          } grid-cols-1 md:grid-cols-2 gap-4`}>
          <InputField
            label="Name"
            name="name"
            value={profileInfo.name}
            onChange={changeProfileInfo}
            disabled={disable}
            placeholder="Enter Your Name"
          />
          <InputField
            label="Email"
            name="email"
            value={profileInfo.email}
            onChange={changeProfileInfo}
            disabled={true}
            placeholder="Enter Your Email"
          />
          <InputField
            label="Phone"
            name="mobile"
            value={profileInfo.mobile}
            onChange={changeProfileInfo}
            disabled={disable}
            placeholder="+880 *** *** ****"
          />

          <div className="relative flex flex-col gap-1">
            <Label htmlFor="dob" className="text-gray-500 mb-1">
              Date of birth
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Input
                  id="dob"
                  name="dob"
                  value={dobValue}
                  readOnly
                  disabled={disable}
                  placeholder="Select date"
                  className="cursor-pointer pr-10"
                />
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start">
                <Calendar
                  mode="single"
                  selected={
                    profileInfo.dob && !isNaN(new Date(profileInfo.dob))
                      ? new Date(profileInfo.dob)
                      : undefined
                  }
                  onSelect={handleDOBSelect}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>

            {/* Chevron icon inside input */}
            <ChevronDownIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              size={18}
            />
          </div>

          <div className="flex gap-5 md:col-span-2">
            <Button
              type="button"
              variant={disable ? "destructive" : "modern"}
              onClick={changeButton}
              className="rounded-md">
              {disable ? "Edit Profile" : "Save Changes"}
            </Button>
          </div>
        </form>

        {/* Change Password */}
        <Collapse isOpened={showChangePassField ? true : false}>
          {showChangePassField && (
            <form
              onSubmit={submitChangePassword}
              className="block lg:col-span-2 flex-col gap-4">
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
      </div>
    </Card>
  );
}
