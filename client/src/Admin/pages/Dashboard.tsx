import { ChartAreaInteractive } from "@/Admin/Components/chart-area-interactive";
import { DataTable } from "@/Admin/Components/data-table";
import data from "../../app/dashboard/data.json";
import { motion } from "framer-motion";
import DashboardWelcome from "../Components/Dashboard/DashboardWelcome";
import { Gift, PieChart, Warehouse } from "lucide-react";
import { StatsCard } from "../Components/Dashboard/StatisticsCard";
import RecentOrders from "../Components/Dashboard/RecentOrders";
import ProductsList from "../Components/Dashboard/ProductsList";
const stats = [
  {
    title: "New Orders",
    value: "1,390",
    icon: <Gift className="w-6 h-6" />,
    change: "+32.40%",
    positive: true,
  },
  {
    title: "Sales",
    value: "$57,890",
    icon: <PieChart className="w-6 h-6" />,
    change: "-4.40%",
    positive: false,
  },
  {
    title: "Total Sales",
    value: "$103,890",
    icon: <PieChart className="w-6 h-6" />,
    change: "37.40%",
    positive: true,
  },
  {
    title: "Revenue",
    value: "$12,390",
    icon: <Warehouse className="w-6 h-6" />,
    change: "+32.40%",
    positive: true,
  },
];
export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 mx-6 py-4 md:gap-6 md:py-6">
            <DashboardWelcome />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.25 }}>
                  <StatsCard {...stat} />
                </motion.div>
              ))}
            </div>
            <ProductsList />
            <RecentOrders />
            <ChartAreaInteractive />

            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
