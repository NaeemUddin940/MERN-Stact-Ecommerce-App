import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import CartSidebar from "@/components/Cart/CartSidebar";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  // Static cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max Invigor",
      image: "https://placehold.co/100x100/e0e0e0/333?text=Watch",
      price: 79.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Adidas Running Shoes",
      image: "https://placehold.co/100x100/c0c0c0/333?text=Shoes",
      price: 120.0,
      quantity: 2,
    },
    {
      id: 3,
      name: "Adidas Running Shoes",
      image: "https://placehold.co/100x100/c0c0c0/333?text=Shoes",
      price: 120.0,
      quantity: 2,
    },
    {
      id: 4,
      name: "Adidas Running Shoes",
      image: "https://placehold.co/100x100/c0c0c0/333?text=Shoes",
      price: 120.0,
      quantity: 2,
    },
    {
      id: 5,
      name: "Adidas Running Shoes",
      image: "https://placehold.co/100x100/c0c0c0/333?text=Shoes",
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
    <div className="min-h-screen bg-background py-10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8 overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-secondary p-4 rounded-lg shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>

                  {/* Quantity Selector */}
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="p-1 border rounded hover:bg-gray-100">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 border rounded text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="p-1 border rounded hover:bg-gray-100">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 bg-secondary p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span className="font-semibold text-gray-500">Free</span>
            </div>
            <div className="flex justify-between mb-4 border-t pt-4 border-gray-200">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>

            {/* Promo Code */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Promo code"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Link to="/checkout">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-2">
                Proceed to Checkout
              </button>
            </Link>
            <button className="w-full text-indigo-600 border border-indigo-600 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
