

export default function MyLists() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr>
                <td className="px-4 py-2 border text-center">1</td>
                <td className="px-4 py-2 border">BoAt Lite Smartwatch</td>
                <td className="px-4 py-2 border">2025-09-20</td>
                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-sm">
                    Delivered
                  </span>
                </td>
                <td className="px-4 py-2 border font-semibold">$64.17</td>
                <td className="px-4 py-2 border text-center">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 border text-center">2</td>
                <td className="px-4 py-2 border">Noise ColorFit Pro 4</td>
                <td className="px-4 py-2 border">2025-09-10</td>
                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-sm">
                    Processing
                  </span>
                </td>
                <td className="px-4 py-2 border font-semibold">$79.00</td>
                <td className="px-4 py-2 border text-center">
                  <button className="text-blue-600 hover:underline">
                    Track
                  </button>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 border text-center">3</td>
                <td className="px-4 py-2 border">Fire-Boltt Ninja Call Pro</td>
                <td className="px-4 py-2 border">2025-08-28</td>
                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">
                    Cancelled
                  </span>
                </td>
                <td className="px-4 py-2 border font-semibold">$59.99</td>
                <td className="px-4 py-2 border text-center">
                  <button className="text-blue-600 hover:underline">
                    Reorder
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
