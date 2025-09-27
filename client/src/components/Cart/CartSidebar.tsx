import React, { useState } from "react";
import { Plus, Minus, Trash2, ShoppingCart, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { DrawerClose } from "../ui/drawer";

const CartSidebar: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max Invigor",
      image: "https://placehold.co/80x80/e0e0e0/333?text=Watch",
      price: 79.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Adidas Running Shoes",
      image: "https://placehold.co/80x80/c0c0c0/333?text=Shoes",
      price: 120.0,
      quantity: 2,
    },
  ]);

  const incrementQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      {/* Overlay */}

      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform flex flex-col`}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {/* <DialogTitle className="sr-only">Shopping Cart</DialogTitle>  */}
            <ShoppingCart className="w-5 h-5" /> Your Cart
          </h2>
          <DrawerClose>
            <div className="border-red-400 border-1 p-1 rounded-full bg-gray-100 hover:bg-red-500">
              <XIcon className="w-5 hover:text-black text-red-500 cursor-pointer  h-5" />
            </div>
          </DrawerClose>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="p-1 border rounded hover:bg-gray-100">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 border rounded text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="p-1 border rounded hover:bg-gray-100">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {cartItems.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Subtotal</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/cart">
            <DrawerClose asChild>
              <button className="w-full cursor-pointer border border-indigo-600 mb-2 text-indigo-600 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                View Cart
              </button>
            </DrawerClose>
          </Link>
          <button className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors ">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
