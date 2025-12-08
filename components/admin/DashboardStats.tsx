import {
    Users,
    Calendar,
    Wrench,
    DollarSign
} from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    icon: any;
    trend: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => {
    return (
        <div className="bg-[#111] p-6 rounded-xl shadow-sm border border-gray-800 hover:border-[#c4912c]/50 transition-colors group">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-400">{title}</p>
                    <h3 className="text-3xl font-bold text-white mt-2 group-hover:text-[#c4912c] transition-colors">{value}</h3>
                </div>
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-[#c4912c]/30 group-hover:bg-[#c4912c]/10 transition-all">
                    <Icon className="w-6 h-6 text-[#c4912c]" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span className={`font-medium ${trend === "up" ? "text-green-500" :
                    trend === "down" ? "text-red-500" : "text-gray-500"
                    }`}>
                    {change}
                </span>
                <span className="text-gray-500 ml-2">vs last month</span>
            </div>
        </div>
    );
};

export default function DashboardStats() {
    // In a real app, fetch these stats from an API
    const stats = [
        {
            title: "Total Bookings",
            value: "1,248",
            change: "+12.5%",
            icon: Calendar,
            trend: "up" as const
        },
        {
            title: "Active Mechanics",
            value: "45",
            change: "+3",
            icon: Wrench,
            trend: "up" as const
        },
        {
            title: "Total Users",
            value: "3,890",
            change: "+8.2%",
            icon: Users,
            trend: "up" as const
        },
        {
            title: "Total Revenue",
            value: "$124,500",
            change: "+15.3%",
            icon: DollarSign,
            trend: "up" as const
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
}
