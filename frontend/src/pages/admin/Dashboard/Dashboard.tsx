import {FaBriefcase, FaUsers} from 'react-icons/fa'
import {MdShowChart} from 'react-icons/md'
import {FaChartSimple} from 'react-icons/fa6'
import {PiBuildingOfficeFill} from 'react-icons/pi'
import {RiBuildingLine} from 'react-icons/ri'
import ApexCharts from 'apexcharts'
import { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { CiHome, CiLogout, CiCreditCard1 } from 'react-icons/ci';
import { FaUserTie, FaRegChartBar, FaHome } from 'react-icons/fa';
import { LuUser, LuUsers } from 'react-icons/lu';
import { AiOutlineRise } from 'react-icons/ai'
import { CiCalendar } from 'react-icons/ci'
import {FiDownload} from 'react-icons/fi'


const tableDataDemo = [
  {title:'Job Title Here', industry:'Job Industry', company:'Company name', date:'Posted date'},
  {title:'Job Title Here', industry:'Job Industry', company:'Company name', date:'Posted date'},
  {title:'Job Title Here', industry:'Job Industry', company:'Comapny name', date:'Posted date'}
]

const Dashboard = () => {
  const demoTileData = [
    {id:1, title:'Revenue', value:3500, hike:50, icon:<AiOutlineRise size={22} className='hover:scale-110 transition' color='gray' />, iconTilecolor:'gray'},
    {id:2, title:'Users', value:3500, hike:50, icon:<LuUsers size={22} className='hover:scale-110 transition' color='blue' />, iconTilecolor:'blue'},
    {id:3, title:'Companies', value:3500, hike:50, icon:<FaUserTie size={22} className='hover:scale-110 transition' color='orange' />, iconTilecolor:'orange'},
    {id:4, title:'Jobs', value:3500, hike:50, icon:<FaBriefcase size={22} className='hover:scale-110 transition' color='red' />, iconTilecolor:'red'}
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
      <p className='font-medium text-gray-700'>Admin Dashboard</p>

      <section className=''>
        <div className="grid grid-cols-12 w-full gap-5">
          <div className="col-span-12 lg:col-span-9">
            <div className="grid w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        {
          demoTileData.map((data, index : number) => {
            return <div className='bg-white border border-gray-200 rounded-md !p-5' key={index}>
              <div className="flex justify-between">
                <div>
                  <p className='text-gray-500 font-medium text-sm'>{data.title}</p>
                  <p className='font-normal text-xl mt-2'>{data.value}</p>
                </div>
                <div className={`bg-${data.iconTilecolor}-100 w-12 h-12 rounded-md flex items-center justify-center`}>
                  {data.icon}
                </div>
              </div>
              <div>
                <p className='text-xs text-green-600 font-medium mt-1'>+ {data.hike}% from previous month</p>
              </div>
            </div>
          })
        }
      </div>  
            {/* Chart has been hidden to test index layering */}
            <div className='mt-5 bg-white'>
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
            <div className='shadow-sm p-3 bg-white rounded-md mt-5 hover:shadow-xl transition'>
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
          </div>
          <div className="col-span-3 hidden lg:block">
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
