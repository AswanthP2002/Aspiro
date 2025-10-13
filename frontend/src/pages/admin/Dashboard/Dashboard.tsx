import {FaBriefcase, FaUsers} from 'react-icons/fa'
import {MdShowChart} from 'react-icons/md'
import {FaChartSimple} from 'react-icons/fa6'
import {PiBuildingOfficeFill} from 'react-icons/pi'
import ApexCharts from 'apexcharts'
import { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'

const tableDataDemo = [
  {title:'Job Title Here', industry:'Job Industry', company:'Company name', date:'Posted date'},
  {title:'Job Title Here', industry:'Job Industry', company:'Company name', date:'Posted date'},
  {title:'Job Title Here', industry:'Job Industry', company:'Comapny name', date:'Posted date'}
]

const Dashboard = () => {
  const demoTileData = [
    {id:1, title:'Revenue', value:3500, hike:50, icon:<FaChartSimple className='hover:scale-110 transition' color='white' size={30} />, iconTilecolor:'gray'},
    {id:2, title:'Users', value:3500, hike:50, icon:<FaUsers className='hover:scale-110 transition' color='white' size={30} />, iconTilecolor:'blue'},
    {id:3, title:'Companies', value:3500, hike:50, icon:<PiBuildingOfficeFill className='hover:scale-110 transition' color='white' size={30} />, iconTilecolor:'orange'},
    {id:4, title:'Jobs', value:3500, hike:50, icon:<FaBriefcase className='hover:scale-110 transition' color='white' size={30} />, iconTilecolor:'red'}
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
    <div className="px-6">
      <h1 className="mb-4 text-xl font-semibold">Admin Dashboard</h1>
      <div className="grid w-full grid-cols-4 gap-6 mt-5">
        {
          demoTileData.map((data, index : number) => {
            return <div className='bg-white shadow rounded-md p-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ease-in-out' key={index}>
              <div className="flex gap-3">
                <div className={`bg-${data.iconTilecolor}-500 w-[80px] flex justify-center items-center rounded-md`}>{data.icon}</div>
                <div>
                  <p className='font-medium text-base'>{data.title}</p>
                  <p className='text-sm text-gray-500 mt-2'>{data.value}</p>
                  <span className='flex items-center gap-2 mt-2'>
                    <MdShowChart color='orange' />
                    <p className='text-xs text-orange-500'>{data.hike}</p>
                  </span>
                </div>
              </div>
            </div>
          })
        }
      </div>

      <section className='mt-10'>
        <div className="grid grid-cols-12 w-full gap-5">
          <div className="col-span-8">
            <div id='chart' className='p-2 bg-white shadow-sm rounded-md'></div>
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
          <div className="col-span-4">
            <div className="card bg-white shadow rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="card-header p-3">
                <p className='text-xl font-semibold'>Top Jobs</p>
              </div>
              <div className="card-body">
                {
                  Array.from(new Array(3).fill(1)).map((data : number, index : number) => {
                    return <div className="border-b p-2 flex items-center border-gray-300 flex gap-2">
                            <div className='bg-green-400 w-[40px] h-[40px] flex justify-center items-center rounded'><FaBriefcase color='white' /></div>
                            <div>
                              <p className='text-base'>Job Title</p>
                              <p className='text-sm text-gray-500'>{data} Applications</p>
                            </div>
                          </div>
                  })
                }
              </div>
            </div>

            <div className="card mt-5 bg-white shadow rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="card-header p-3">
                <p className='text-xl font-semibold'>Top Industries</p>
              </div>
              <div className="card-body">
                {
                  Array.from(new Array(3).fill(1)).map((data : number, index : number) => {
                    return <div key={index} className="border-b p-2 flex items-center border-gray-300 flex gap-2">
                            <div className='bg-green-400 w-[40px] h-[40px] flex justify-center items-center rounded'><FaBriefcase color='white' /></div>
                            <div>
                              <p className='text-base'>Industry</p>
                              <p className='text-sm text-gray-500'>{data} Hirings</p>
                            </div>
                          </div>
                  })
                }
              </div>
            </div>

            <div className="card mt-5 bg-white shadow rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
              <div className="card-header p-3">
                <p className='text-xl font-semibold'>Top Companies</p>
              </div>
              <div className="card-body">
                {
                  Array.from(new Array(3).fill(1)).map((data : number, index : number) => {
                    return <div className="border-b p-2 flex items-center border-gray-300 flex gap-2">
                            <div className='bg-green-400 w-[40px] h-[40px] flex justify-center items-center rounded'><FaBriefcase color='white' /></div>
                            <div>
                              <p className='text-base'>Job Title</p>
                              <p className='text-sm text-gray-500'>{data} Applications</p>
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
