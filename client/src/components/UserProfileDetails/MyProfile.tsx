import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";

export default function MyProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-full">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">Personal Information</h1>
        </div>
        <p className="text-gray-500 mb-6">
          Update your personal information to keep your account secure.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <Input
              type="text"
              value={user?.name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <Input
              type="email"
              value={user?.email}
              placeholder="mdnaeemuddin14@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <Input
              type="tel"
              value={user?.phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 *** *** ****"
            />
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Date of birth
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between rounded-lg font-normal">
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </form>

        <Button className="mt-6 px-6 py-2 rounded-md shadow-2xl border-2 border-slate-500 shadow-slate-500 hover:bg-chart-4">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
