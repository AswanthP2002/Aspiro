import React, { useEffect, useState } from 'react';
import { SubscriptionAnalyticsData } from '../../../types/entityTypes';
import { adminGetAnalytics } from '../../../services/planServices';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BiRupee, BiXCircle } from 'react-icons/bi';
import { FaChartLine, FaDollarSign, FaUsers } from 'react-icons/fa';
import { LuSearch, LuUser } from 'react-icons/lu';
import { FiFilter } from 'react-icons/fi';
import { toast } from 'react-toastify';

export const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<SubscriptionAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(7)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState('all')

  const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
  }

  const debouncedSearch = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>
    return function(...args: Parameters<T>){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
      }, delay);
    }
  }

  const dSearch = debouncedSearch(searchData, 500)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await adminGetAnalytics(search, page, limit, status)
        console.log('chekcing', response)
        if (response.success) {
          setAnalytics(response.result.data);
          setTotalPages(response.result.totalPages)
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [search, page, status]);

  if (loading) return <div className="p-8 text-center font-medium">Loading Analytics...</div>;
  if (!analytics) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ... header code ... */}

      {/* 1. Stats Grid - Injecting data from state */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total MRR" 
          value={analytics.stats.totalMRR} 
          growth={11.8} 
          icon={<BiRupee />} 
        />
        <StatCard 
          title="Active Premium Recruiters" 
          value={analytics.stats.activeRecruiters} 
          growth={23} 
          icon={<LuUser />} 
        />
        <StatCard 
          title="Churn Rate" 
          value={analytics.stats.churnRate} 
          growth={-0.4} 
          icon={<FaChartLine />} 
          isNegative 
        />
      </div>

      {/* 2. Revenue Chart - Injecting analytics.revenueGrowth */}
      <div className="bg-white p-6 rounded-xl border mb-8">
        <h3 className="font-bold mb-6 text-gray-700">Revenue Growth (Last 6 Months)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.revenueGrowth}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Subscribers Table - Mapping analytics.subscribers */}
      <div className="bg-white rounded-xl shadow p-3 border border-slate-200 overflow-x-auto">
        <p className='font-semibold text-lg'>Subscribers</p>
        <p className='text-xs'>All paying users and their subscription details</p>
        {/* ... search/filter UI ... */}
        <div className='grid grid-cols-12 mt-5'>
          <div className='flex col-span-6 items-center bg-gray-100 px-2 py-1 rounded-md gap-2 border border-slate-200 w-'>
            <LuSearch size={15} />
            <input onKeyUp={(e) => dSearch(e)} type="text" placeholder='Search by name, email, transaction Id' className='!text-xs w-full' />
          </div>
          <div className='flex col-span-6 items-center justify-end gap-2'>
            <FiFilter />
            <select onChange={(e) => setStatus(e.target.value)} name="" id="" className='!text-xs bg-gray-100 border border-slate-200 rounded-md px-2 py-1'>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="incomplete">Incomplete</option>
              <option value="canceled">Cancelled</option>
              <option value="pastDue">Past due</option>
            </select>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="text-xs font-semibold text-gray-500 uppercase">
            <tr>
              <th className="p-4 text-black">User</th>
              <th className="p-4 text-black">Current Plan</th>
              <th className="p-4 text-black">Billing Cycle</th>
              <th className="p-4 text-black">Next Renewal</th>
              <th className="p-4 text-black">Amount</th>
              <th className="p-4 text-black">Status</th>
              <th className="p-4 text-black text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {analytics.subscribers.map((sub, index) => (
              <tr key={index} className="hover:bg-gray-50 border-t border-slate-300">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{sub.userName}</div>
                  <div className="text-xs text-gray-500">{sub.userEmail}</div>
                </td>
                <td className="p-4 text-sm text-gray-600 font-medium">{sub.planName}</td>
                <td className="p-4 text-sm text-gray-600">
                   <span className="capitalize px-2 py-0.5 border rounded text-xs">{sub.billingCycle}</span>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(sub.nextRenewal).toLocaleDateString()}
                </td>
                <td className="p-4 text-sm font-semibold">₹{sub.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    sub.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="p-4 text-blue-600 text-sm font-semibold cursor-pointer text-center">
                  Manage
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-end gap-2'>
          <button onClick={() => setPage(prv => prv - 1)} className='text-xs font-medium px-3 py-2 rounded-md bg-white border border-slate-200' disabled={page === 1}>Prev</button>
          <button onClick={() => setPage(prv => prv + 1)} className='text-xs font-medium px-3 py-2 rounded-md bg-blue-500 text-white' disabled={page >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, growth, icon, isNegative }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1">${value.toLocaleString()}</h3>
        <p className={`text-xs mt-2 flex items-center ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
          <span className="font-bold">{growth}%</span> 
          <span className="ml-1 text-gray-400">from last month</span>
        </p>
      </div>
      <div className="p-2 bg-blue-50 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);