"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  MapPin,
  Store,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Target,
  Award
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dashboardApi } from "@/lib/api";

interface DashboardStats {
  totalUsers: number;
  totalLaporan: number;
  totalWisata: number;
  totalUMKM: number;
  totalTransactions: number;
  totalProgram: number;
  revenue: number;
  completionRate: number;
}

interface LaporanStatus {
  PENDING: number;
  PROSES: number;
  SELESAI: number;
  DITOLAK: number;
}

interface MonthlyData {
  month: string;
  laporan: number;
  selesai: number;
  revenue: number;
  transactions: number;
}

interface DailyData {
  day: string;
  wisata: number;
  umkm: number;
  laporan: number;
}

interface RecentActivity {
  id: string;
  type: string;
  message: string;
  status: string;
  timeAgo: string;
  user?: string;
}

interface DashboardResponse {
  overview: DashboardStats;
  laporanStatus: LaporanStatus;
  monthlyData: MonthlyData[];
  dailyData: DailyData[];
  recentActivities: RecentActivity[];
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = "blue" 
}: {
  title: string;
  value: string | number;
  icon: any;
  trend?: "up" | "down";
  trendValue?: string;
  color?: string;
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    red: "bg-red-50 text-red-600 border-red-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200"
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({ activities }: { activities: RecentActivity[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "proses": return "text-blue-600 bg-blue-50";
      case "error": return "text-red-600 bg-red-50";
      default: return "text-blue-600 bg-blue-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "proses": return <Eye className="w-4 h-4" />;
      case "error": return <XCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                {activity.user && (
                  <p className="text-xs text-gray-500 mt-0.5">oleh {activity.user}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">{activity.timeAgo}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">Belum ada aktivitas terbaru</p>
        )}
      </div>
    </div>
  );
};

const QuickStats = ({ laporanStatus, revenue }: { laporanStatus: LaporanStatus; revenue: number }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    { label: "Laporan Pending", value: laporanStatus.PENDING, color: "text-yellow-600" },
    { label: "Laporan Selesai", value: laporanStatus.SELESAI, color: "text-green-600" },
    { label: "Laporan Proses", value: laporanStatus.PROSES, color: "text-blue-600" },
    { label: "Pendapatan", value: formatCurrency(revenue), color: "text-purple-600" }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik Cepat</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalLaporan: 0,
    totalWisata: 0,
    totalUMKM: 0,
    totalTransactions: 0,
    totalProgram: 0,
    revenue: 0,
    completionRate: 0
  });
  const [laporanStatus, setLaporanStatus] = useState<LaporanStatus>({
    PENDING: 0,
    PROSES: 0,
    SELESAI: 0,
    DITOLAK: 0
  });
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const response = await dashboardApi.getStats();
        console.log('Dashboard response:', response);

        if (response.success && response.data) {
          const data = response.data as DashboardResponse;
          const { overview, laporanStatus: statusData, monthlyData: monthly, dailyData: daily, recentActivities: activities } = data;
          
          setStats({
            totalUsers: overview.totalUsers || 0,
            totalLaporan: overview.totalLaporan || 0,
            totalWisata: overview.totalWisata || 0,
            totalUMKM: overview.totalUMKM || 0,
            totalTransactions: overview.totalTransactions || 0,
            totalProgram: overview.totalProgram || 0,
            revenue: overview.revenue || 0,
            completionRate: overview.completionRate || 0
          });

          setLaporanStatus(statusData || {
            PENDING: 0,
            PROSES: 0,
            SELESAI: 0,
            DITOLAK: 0
          });

          setMonthlyData(monthly || []);
          setDailyData(daily || []);
          setRecentActivities(activities || []);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ringkasan Dashboard</h1>
          <p className="text-gray-600 mt-2">Selamat datang di panel admin Desa Suka Maju</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Terakhir diperbarui</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Pengguna"
          value={stats.totalUsers}
          icon={Users}
          trend="up"
          trendValue="+12 bulan ini"
          color="blue"
        />
        <StatCard
          title="Total Laporan"
          value={stats.totalLaporan}
          icon={FileText}
          trend="up"
          trendValue="+5 minggu ini"
          color="green"
        />
        <StatCard
          title="Destinasi Wisata"
          value={stats.totalWisata}
          icon={MapPin}
          trend="up"
          trendValue="+2 bulan ini"
          color="purple"
        />
        <StatCard
          title="UMKM Terdaftar"
          value={stats.totalUMKM}
          icon={Store}
          trend="up"
          trendValue="+8 bulan ini"
          color="yellow"
        />
        <StatCard
          title="Total Transaksi"
          value={stats.totalTransactions}
          icon={CreditCard}
          trend="up"
          trendValue="+15 bulan ini"
          color="blue"
        />
        <StatCard
          title="Program Aktif"
          value={stats.totalProgram}
          icon={Target}
          trend="up"
          trendValue="+3 bulan ini"
          color="purple"
        />
        <StatCard
          title="Pendapatan"
          value={formatCurrency(stats.revenue)}
          icon={DollarSign}
          trend="up"
          trendValue="+25% bulan ini"
          color="green"
        />
        <StatCard
          title="Tingkat Penyelesaian"
          value={`${stats.completionRate}%`}
          icon={Award}
          trend="up"
          trendValue="+5% bulan ini"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Laporan Bulanan</h3>
            <p className="text-sm text-gray-500 mt-1">Data laporan 6 bulan terakhir</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorLaporan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSelesai" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="laporan" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorLaporan)" 
                  name="Total Laporan"
                />
                <Area 
                  type="monotone" 
                  dataKey="selesai" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#colorSelesai)"
                  name="Selesai"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Tren Pendapatan</h3>
              <p className="text-sm text-gray-500 mt-1">Pendapatan bulanan dari transaksi</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(monthlyData.reduce((sum, item) => sum + (item.revenue || 0), 0))}
              </p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Pendapatan']}
                  cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                  name="Pendapatan"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Harian</h3>
            <p className="text-sm text-gray-500 mt-1">Tren aktivitas harian 7 hari terakhir</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorWisata" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUmkm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLaporanDaily" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="wisata" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  fill="url(#colorWisata)"
                  name="Wisata"
                />
                <Area 
                  type="monotone" 
                  dataKey="umkm" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  fill="url(#colorUmkm)"
                  name="UMKM"
                />
                <Area 
                  type="monotone" 
                  dataKey="laporan" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorLaporanDaily)"
                  name="Laporan"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Tren Transaksi</h3>
              <p className="text-sm text-gray-500 mt-1">Volume transaksi bulanan</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-blue-600">
                {monthlyData.reduce((sum, item) => sum + (item.transactions || 0), 0)} transaksi
              </p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number) => [`${value} transaksi`, 'Total']}
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorTransactions)"
                  name="Transaksi"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivities} />
        <QuickStats laporanStatus={laporanStatus} revenue={stats.revenue} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ringkasan Status Laporan</h3>
          <Link href="/dashboard/laporan" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{laporanStatus.PENDING}</p>
            <p className="text-sm text-yellow-600">Pending</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{laporanStatus.PROSES}</p>
            <p className="text-sm text-blue-600">Proses</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{laporanStatus.SELESAI}</p>
            <p className="text-sm text-green-600">Selesai</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{laporanStatus.DITOLAK}</p>
            <p className="text-sm text-red-600">Ditolak</p>
          </div>
        </div>
      </div>
    </div>
  );
}