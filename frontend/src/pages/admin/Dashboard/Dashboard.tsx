import {FaBriefcase} from 'react-icons/fa'
import {RiBuildingLine} from 'react-icons/ri'
import ApexCharts from 'apexcharts'
import { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { FaUserTie} from 'react-icons/fa';
import { LuUser, LuUsers } from 'react-icons/lu';
import { AiOutlineRise } from 'react-icons/ai'
import { CiCalendar } from 'react-icons/ci'
import {FiDownload} from 'react-icons/fi'
import { MdOutlineReport, MdVerified } from 'react-icons/md'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'
import { formatRelativeTime } from '../../../services/util/formatDate'

const dummyData = [
  { date: "Jan 20", users: 2400 },
  { date: "Jan 21", users: 3100 },
  { date: "Jan 22", users: 2800 },
  { date: "Jan 23", users: 3900 },
  { date: "Jan 24", users: 4200 },
  { date: "Jan 25", users: 3700 },
  { date: "Jan 26", users: 5000 },
];

const dummyFeed = [
  {
    name: 'Aswanth P',
    action: 'New user signed up',
    role: 'user',
    time: new Date()
  },
  {
    name: 'Sharmi Rajendran',
    action: 'Posted new job',
    role: 'recruiter',
    time: "2025-02-10T12:00.000Z"
  },
  {
    name: 'Alisha Lehman',
    action: 'New user signed up',
    role: 'user',
    time: "2025-02-10T12:00.000Z"
  },
  {
    name: 'Hana Hampton',
    action: 'New user signed up',
    role: 'user',
    time: "2025-02-10T12:00.000Z"
  },
  {
    name: 'Aron Van Bisaka',
    action: 'New user signed up',
    role: 'user',
    time: "2025-02-10T12:00.000Z"
  }
]

const tableDataDemo = [
  {title:'Job Title Here', industry:'Job Industry', company:'Company name', date:'Posted date'},
  {title:'Job Title Here', industry:'Job Industry', company:'Company name', date:'Posted date'},
  {title:'Job Title Here', industry:'Job Industry', company:'Comapny name', date:'Posted date'}
]

const Dashboard = () => {
  const demoTileData = [
    {id:1, title:'Total Acive Users', value:24590, hike:12.5, icon:<LuUsers size={22} className='hover:scale-110 transition' color='blue' />, iconTilecolor:'blue'},
    {id:2, title:'New Job Posting', value:174, hike:7, icon:<FaBriefcase size={22} className='hover:scale-110 transition' color='blue' />, iconTilecolor:'blue'},
    {id:3, title:'Pending Verification', value:23, hike:null, icon:<MdVerified size={22} className='hover:scale-110 transition' color='blue' />, iconTilecolor:'blue'},
    {id:4, title:'Reported Content', value:15, hike:null, icon:<MdOutlineReport size={22} className='hover:scale-110 transition' color='blue' />, iconTilecolor:'blue'}
  ]

  const [options, setOptions] = useState({
    chart:{
      type:'line',
      width:'100%',
      height:'400px'
    },
    series:[{
      name:'Applications',
      data:[10, 20, 2, 50, 44, 30, 22]
    }],
    colors:['orange'],
    xaxis:{
      categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    }
  })

  useEffect(() => {
  const chart = new ApexCharts(document.getElementById('chart'), options)
  chart.render()
  }, [options])

  return (
    <div className="px-6 !py-6">
      <p className='font-medium text-lg text-gray-700'>Dashboard Overview</p>
      <p className='text-xs mt-1'>Welcome back! here is what happening in your application today</p>
      <section className='mt-5'>
        <div className="grid grid-cols-12 w-full gap-5">
          <div className="col-span-12">
            <div className="grid w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {
          demoTileData.map((data, index : number) => {
            return <div className='bg-white border border-gray-200 rounded-md !p-5' key={index}>
              <div className="flex justify-between">
                <div>
                  <p className='text-gray-500 font-light text-xs'>{data.title}</p>
                  <p className='font-semibold text-xl mt-2'>{data.value}</p>
                </div>
                <div className={`bg-${data.iconTilecolor}-100 w-12 h-12 rounded-md flex items-center justify-center`}>
                  {data.icon}
                </div>
              </div>
              <div>
                <p className='text-xs text-green-600 font-light mt-1'>+ {data.hike}% from previous month</p>
              </div>
            </div>
          })
        }
      </div>            
          </div>
          
        </div>

        <div className="grid grid-cols-12 gap-10 mt-5">
            {/* Chart */}
            <div className='col-span-12 lg:col-span-8'>
            <div className="border border-gray-300 rounded-md bg-white p-3">
              <p className='font-medium'>User Engagement</p>
              <p className='text-xs font-light mt-1 mb-5'>Active users for the past 7 days</p>
              <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dummyData} margin={{top: 20, left: 20, right: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <XAxis dataKey="date" tick={{fill: "#6b7280"}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: "#6b7280"}} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke='#2563eb' strokeWidth={3} dot={{r: 4}} activeDot={{r: 7}} />
                  </LineChart>
              </ResponsiveContainer>
            </div>
            </div>

            <div className="col-span-12 max-h-[700px] overflow-y-auto relative lg:col-span-4 bg-white p-5 rounded-md border border-gray-300">
              <div className='flex justify-between bg-white items-start sticky top-0 left-0 w-full'>
                <div>
                  <p className='font-medium'>Live feed activity</p>
                  <p className='text-xs text-gray-700 mt-1'>Recent platform activity</p>
                </div>
                <div className='w-3 h-3 bg-green-400 rounded-full'></div>
              </div>
              <div className="mt-5 grid grid-cols-1">
                {
                  dummyFeed.map((data, index: number) => (
                    <div className='p-3 border-b border-gray-200'>
                      <div className="flex gap-3">
                        <div className="w-13 h-13 rounded-full bg-violet-300"></div>
                        <div>
                          <p className='text-sm font-medium'>{data.name}</p>
                          <p className="mt-1 text-xs text-gray-700">{data.action}</p>
                          <p className="mt-2 text-gray-500" style={{fontSize:'.7rem'}}>{formatRelativeTime(new Date())}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

// Chart data
/**
 * <div className='mt-5 bg-white'>
              <div className="chart-header flex justify-between !p-3">
                <div>
                  <p className='text-sm text-gray-700'>Analytics Overview</p>
                  <p className='text-xs text-gray-500 mt-1'>Montly performance metrics</p>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='bg-gray-200 flex items-center gap-2 !px-2 py-1 rounded-md text-xs'>
                    <CiCalendar />
                    <select name="" id="">
                      <option value="">6</option>
                    </select>
                  </div>
                  <button>
                    <FiDownload />
                  </button>
                </div>
              </div>
              <div id='chart' className='bg-white shadow-sm rounded-md w-full'></div>
            </div>
 */

//Table data

/**
 * <div className='shadow-sm p-3 bg-white rounded-md mt-5 hover:shadow-xl transition'>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Job</TableCell>
                        <TableCell>Industry</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        tableDataDemo.map((data, index : number) => {
                          return <TableRow key={index}>
                                    <TableCell><FaBriefcase /></TableCell>
                                    <TableCell>{data.title}</TableCell>
                                    <TableCell>{data.industry}</TableCell>
                                    <TableCell>{data.company}</TableCell>
                                    <TableCell>{data.date}</TableCell>
                                    <TableCell><button>View</button></TableCell>
                                 </TableRow>
                        })
                      }
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell className='' colSpan={6}>
                          <p className='text-end text-blue-500'>Show more</p>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
            </div>
 */


//Demo tile data
/**
 * <div className="col-span-3 hidden lg:block">
            <div className="card p-3 bg-white shadow rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="card-header p-3">
                <p className='text-base font-medium'>Top Jobs</p>
              </div>
              <div className="card-body">
                {
                  Array.from(new Array(3).fill(1)).map((data : number, index : number) => {
                    return <div className=" px-3 py-2 flex items-center border-gray-300 flex gap-2">
                            <div className='bg-green-200 w-[40px] h-[40px] flex justify-center items-center rounded'><FaBriefcase color='green' /></div>
                            <div>
                              <p className='text-sm font-medium'>Job Title</p>
                              <p className='text-xs text-gray-700'>{data} Applications</p>
                            </div>
                          </div>
                  })
                }
              </div>
            </div>

            <div className="card mt-5 p-3 bg-white shadow rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="card-header p-3">
                <p className='text-base font-medium'>Top Industries</p>
              </div>
              <div className="card-body">
                {
                  Array.from(new Array(3).fill(1)).map((data : number, index : number) => {
                    return <div key={index} className="p-2 flex items-center border-gray-300 flex gap-2">
                            <div className='bg-blue-200 w-[40px] h-[40px] flex justify-center items-center rounded'><RiBuildingLine color='blue' /></div>
                            <div>
                              <p className='text-sm font-medium'>Industry</p>
                              <p className='text-xs text-gray-700'>{data} Hirings</p>
                            </div>
                          </div>
                  })
                }
              </div>
            </div>

            <div className="card mt-5 p-3 bg-white shadow rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="card-header p-3">
                <p className='text-base font-medium'>Top Recruiters</p>
              </div>
              <div className="card-body">
                {
                  Array.from(new Array(3).fill(1)).map((data : number, index : number) => {
                    return <div className="p-2 flex items-center border-gray-300 flex gap-2">
                            <div className='bg-orange-200 w-[40px] h-[40px] flex justify-center items-center rounded'><FaUserTie color='orange' /></div>
                            <div>
                              <p className='text-sm font-medium'>Recruiter </p>
                              <p className='text-xs text-gray-700'>{data} Applications</p>
                            </div>
                          </div>
                  })
                }
              </div>
            </div>
          </div>
 */