import DashboardStats from "@/components/admin/DashboardStats";
import RecentBookingsTable from "@/components/admin/RecentBookingsTable";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome back, Admin</p>
            </div>

            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentBookingsTable />
                </div>

                <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-primary text-black rounded-lg text-sm font-bold hover:bg-[#d1a23c] transition-colors text-left shadow-lg shadow-yellow-900/20">
                            + Add New Mechanic
                        </button>
                        <button className="w-full py-3 px-4 bg-gray-900 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors text-left border border-gray-800">
                            View Pending Approvals
                        </button>
                        <button className="w-full py-3 px-4 bg-gray-900 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors text-left border border-gray-800">
                            Generate Monthly Report
                        </button>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Server Status</span>
                                <span className="text-green-500 font-medium flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    Operational
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Database</span>
                                <span className="text-green-500 font-medium flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                    Connected
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Last Backup</span>
                                <span className="text-gray-300 font-medium">2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
