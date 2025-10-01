import React from "react";
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

export default function RecentOrders() {
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
        {
          productId: "xfcsdfgasdfq234FASFE",
          product: "Watch",
          qty: 1,
          price: 500,
          subtotal: 500,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
        },
        {
          productId: "sdf234sdfsdf234",
          product: "Shoes",
          qty: 2,
          price: 361,
          subtotal: 722,
          image:
            "https://images.unsplash.com/photo-1542293787938-c9e299b880b1?w=100",
        },
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
        {
          productId: "dfgasd2323sdf",
          product: "Bag",
          qty: 1,
          price: 400,
          subtotal: 400,
          image:
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=100",
        },
        {
          productId: "asdf23423dfg",
          product: "Shoes",
          qty: 1,
          price: 400,
          subtotal: 400,
          image:
            "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=100",
        },
      ],
    },
  ];

  return (
    <div className="w-full border-2 rounded-sm shadow-lg border-accent p-5">
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      <div className="w-full overflow-x-auto border border-border rounded-md shadow-sm">
        <Table className="min-w-[1000px] border-collapse border border-border mb-3">
          {/* Sticky Header */}
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow className="border border-border">
              <TableHead className="border border-border w-[50px] text-center">
                #
              </TableHead>
              <TableHead className="border border-border">USER ID</TableHead>
              <TableHead className="border border-border">PINCODE</TableHead>
              <TableHead className="border border-border">NAME</TableHead>
              <TableHead className="border border-border">EMAIL</TableHead>
              <TableHead className="border border-border">PHONE</TableHead>
              <TableHead className="border border-border">ADDRESS</TableHead>
              <TableHead className="border border-border">STATUS</TableHead>
              <TableHead className="border border-border">DATE</TableHead>
              <TableHead className="border border-border">TOTAL</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                {/* Main Row */}
                <TableRow className="border border-border">
                  <TableCell
                    className="border border-border bg-background text-center cursor-pointer"
                    onClick={() =>
                      setOpenRow(openRow === index ? null : index)
                    }>
                    <div className="bg-accent rounded-full h-8 w-8 hover:bg-accent/70 flex items-center justify-center mx-auto">
                      {openRow === index ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.userId}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.pincode}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.name}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.email}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.phone}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.address}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.status}
                  </TableCell>
                  <TableCell className="border border-border">
                    {order.date}
                  </TableCell>
                  <TableCell className="border border-border font-semibold">
                    {order.total}
                  </TableCell>
                </TableRow>

                {/* Collapsible Row */}
                <TableRow>
                  <TableCell colSpan={10} className="p-0 border border-border">
                    <Collapse isOpened={openRow === index}>
                      <div className="bg-muted/30 p-4">
                        <h3 className="font-semibold mb-2">Order Details</h3>
                        <Table className="border border-border">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="border border-border">
                                PRODUCT ID
                              </TableHead>
                              <TableHead className="border border-border">
                                PRODUCT TITLE
                              </TableHead>
                              <TableHead className="border border-border">
                                IMAGE
                              </TableHead>
                              <TableHead className="border border-border">
                                QUANTITY
                              </TableHead>
                              <TableHead className="border border-border">
                                PRICE
                              </TableHead>
                              <TableHead className="border border-border">
                                SUB-TOTAL
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.details.map((item, i) => (
                              <TableRow key={i}>
                                <TableCell className="border border-border">
                                  {item.productId}
                                </TableCell>
                                <TableCell className="border border-border">
                                  {item.product}
                                </TableCell>
                                <TableCell className="border border-border">
                                  <img
                                    src={item.image}
                                    alt={item.product}
                                    className="h-10 w-10 rounded-md object-cover"
                                  />
                                </TableCell>
                                <TableCell className="border border-border">
                                  {item.qty}
                                </TableCell>
                                <TableCell className="border border-border">
                                  ${item.price}
                                </TableCell>
                                <TableCell className="border border-border font-semibold">
                                  ${item.subtotal}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
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
    </div>
  );
}
