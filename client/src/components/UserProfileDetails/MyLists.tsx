import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapse } from "react-collapse";
import React from "react";
import { Card } from "../ui/card";

export default function MyLists() {
  const [openRow, setOpenRow] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      userId: "jaJKSJDfq73dfyuaJSAe7rqd",
      pincode: "111029",
      name: "MD. NAEEM UDDIN",
      email: "mdnaeemuddin14@gmail.com",
      phone: "+880-1311078039",
      address: "Shakoya, Keshorhat, Mohonpur, Rajshahi",
      status: "Pending",
      date: "12/9/25",
      total: "$1222.00",
      details: [
        { product: "Watch", qty: 1, price: "$500.00" },
        { product: "Shoes", qty: 2, price: "$722.00" },
      ],
    },
    {
      id: 2,
      userId: "abcd1234efgh5678",
      pincode: "110045",
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      phone: "+880-1712345678",
      address: "Banani, Dhaka",
      status: "Completed",
      date: "12/8/25",
      total: "$800.00",
      details: [
        { product: "Bag", qty: 1, price: "$400.00" },
        { product: "Shoes", qty: 1, price: "$400.00" },
      ],
    },
  ];

  return (
    <Card className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">My Lists</h2>
      <div className="w-[1150px] overflow-x-auto border border-gray-200 rounded-sm">
        <Table className="min-w-[1000px] border-collapse border border-gray-200">
          {/* Sticky Header */}
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow className="border-b border-gray-200">
              <TableHead className="border border-gray-200 w-[50px] text-center">
                #
              </TableHead>
              <TableHead className="border border-gray-200">USER ID</TableHead>
              <TableHead className="border border-gray-200">PINCODE</TableHead>
              <TableHead className="border border-gray-200">NAME</TableHead>
              <TableHead className="border border-gray-200">EMAIL</TableHead>
              <TableHead className="border border-gray-200">PHONE</TableHead>
              <TableHead className="border border-gray-200">ADDRESS</TableHead>
              <TableHead className="border border-gray-200">STATUS</TableHead>
              <TableHead className="border border-gray-200">DATE</TableHead>
              <TableHead className="border border-gray-200">TOTAL</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                {/* Main Row */}
                <TableRow className="border-b border-gray-200">
                  <TableCell
                    className="border border-gray-200 text-center cursor-pointer"
                    onClick={() =>
                      setOpenRow(openRow === index ? null : index)
                    }>
                    {openRow === index ? (
                      <ChevronUp className="mx-auto" />
                    ) : (
                      <ChevronDown className="mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.userId}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.pincode}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.name}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.email}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.phone}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.address}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.status}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.date}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {order.total}
                  </TableCell>
                </TableRow>

                {/* Collapsible Row */}
                <TableRow>
                  <TableCell colSpan={10} className="p-0 border-none">
                    <Collapse isOpened={openRow === index}>
                      <div className="bg-gray-50 p-4">
                        <h3 className="font-semibold mb-2">Order Details:</h3>
                        <Table>
                          <div className="flex items-center gap-10 py-2">
                            <TableCell className="border border-gray-200">
                              ORDER ID: 183HSDHakjsd12938qdj
                            </TableCell>
                            <TableCell className="border border-gray-200">
                              PAYMENT ID: 12hd7JHhsuJ73h{" "}
                            </TableCell>
                            <TableCell className="border border-gray-200">
                              PINCODE: 12hd7JHhsuJ73h{" "}
                            </TableCell>
                          </div>
                          <div className="flex items-center gap-10 py-2 border-t border-b">
                            <TableCell className="border border-gray-200">
                              TITLE: Summer t-shirt
                            </TableCell>
                            <TableCell className="border border-gray-200">
                              QUANTITY : 12
                            </TableCell>
                            <TableCell className="border border-gray-200">
                              TOTAL PRICE : $1323.00
                            </TableCell>
                          </div>
                          <div className="flex items-center gap-10">
                            <TableCell className="border border-gray-200">
                              PURCHASE DATA : 12/9/2025
                            </TableCell>
                            <TableCell className="border border-gray-200">
                              PHONE NUMBER :01311078039
                            </TableCell>
                            <TableCell className="border border-gray-200">
                              Status : Pending
                            </TableCell>
                          </div>
                        </Table>
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
