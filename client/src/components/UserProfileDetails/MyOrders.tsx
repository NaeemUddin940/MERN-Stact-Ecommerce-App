import { Minus, Plus, StarIcon, Trash2 } from "lucide-react";
import React from "react";

export default function MyOrders() {
  return (
    <div>
      <div className="lg:col-span-8 overflow-y-auto space-y-4">
        <h3 className="text-3xl font-bold">My Orders</h3>
        <p>
          There are <span className="text-chart-1">2</span> Orders.
        </p>
        <div className="flex items-center bg-secondary p-4 rounded-lg shadow-sm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Model_Posing_On_Typical_Studio_Set.jpg/500px-Model_Posing_On_Typical_Studio_Set.jpg"
            alt="sdfsd"
            className="w-34 h-34 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h2 className="font-semibold text-sm">Brand Name</h2>
            <h2 className="font-semibold text-lg">Product Title / Name</h2>
            <p>
              <StarIcon />
            </p>
            <div className="flex gap-4">
              <p className="text-gray-500 line-through">$123</p>
              <p className="text-gray-500">$100</p>
              <p className="text-green-400">Save 50%</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mt-2 space-x-2">
              <button
                //   onClick={() => decrementQuantity(item.id)}
                className="p-1 border rounded cursor-pointer hover:bg-gray-100">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 border rounded text-gray-700">1</span>
              <button
                //   onClick={() => incrementQuantity(item.id)}
                className="p-1 border rounded cursor-pointer hover:bg-gray-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            //   onClick={() => removeItem(item.id)}
            className="ml-4 text-red-500 cursor-pointer hover:text-red-700">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center bg-secondary p-4 rounded-lg shadow-sm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Model_Posing_On_Typical_Studio_Set.jpg/500px-Model_Posing_On_Typical_Studio_Set.jpg"
            alt="sdfsd"
            className="w-34 h-34 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h2 className="font-semibold text-sm">Brand Name</h2>
            <h2 className="font-semibold text-lg">Product Title / Name</h2>
            <p>
              <StarIcon />
            </p>
            <div className="flex gap-4">
              <p className="text-gray-500 line-through">$123</p>
              <p className="text-gray-500">$100</p>
              <p className="text-green-400">Save 50%</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mt-2 space-x-2">
              <button
                //   onClick={() => decrementQuantity(item.id)}
                className="p-1 border rounded cursor-pointer hover:bg-gray-100">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 border rounded text-gray-700">1</span>
              <button
                //   onClick={() => incrementQuantity(item.id)}
                className="p-1 border rounded cursor-pointer hover:bg-gray-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            //   onClick={() => removeItem(item.id)}
            className="ml-4 text-red-500 cursor-pointer hover:text-red-700">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
