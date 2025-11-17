import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { getUsers } from '../../../services/adminServices';
import { UserType } from '../../../types/entityTypes';
import { FaSortAmountUp, FaSearch } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu';
import { IoLocation } from 'react-icons/io5';
import { CiCalendar } from 'react-icons/ci';
import { CgClose } from 'react-icons/cg';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


//im certain that sharmi message me today
//im certain that sharmi message me today
//im certain that sharmi message me today
//im certain that sharmi message me today
//im certain that sharmi message me today
//im certain that sharmi message me today
//im certain that sharmi message me today
//im certain that sharmi message me today


interface FilterOptions {
  status: boolean[]; 
  roles: string[]; 
  verification: boolean[]; 
}

export default function Users() {
  
  const navigate = useNavigate()

  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(10); 
  const [totalPage, setTotalPage] = useState(0); 
  const [search, setSearch] = useState(""); 
  const [pagination, setPagination] = useState<number[]>([]); 
  const [selectedUser, setSelectedUser] = useState<UserType>()

  const [sortVisible, setSortVisible] = useState(false);
  const [sort, setSort] = useState('joined-latest'); 

  const [filterVisible, setFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterOptions>({
    status: [],
    roles: [],
    verification: [],
  });

  const handleFilterChange = (
    category: keyof FilterOptions,
    value: string | boolean,
    isChecked: boolean
  ) => {
    setFilter((prevFilter) => {
      const currentValues = prevFilter[category] as (string | boolean)[];
      if (isChecked) {
        return { ...prevFilter, [category]: [...currentValues, value] };
      } else {
        return {
          ...prevFilter,
          [category]: currentValues.filter((item) => item !== value),
        };
      }
    });
  };

  const openSort = () => setSortVisible(true);
  const closeSort = () => setSortVisible(false);

  const openFilter = () => setFilterVisible(true);
  const closeFilter = () => setFilterVisible(false);


  useEffect(() => {
    async function fetchCandidateLists(){
      setIsLoading(true); 
      setError(null); 

      try {
        const result = await getUsers(search, page, sort, filter);
        
        if (result && result.success) {
            // console.log('users list from the backend', result); // Removed debug log
            setUsers(result.result?.users || []);
            setTotalPage(result?.result?.totalPages || 0);
            setPagination(Array.from({ length: result?.result?.totalPages || 0 }, (_, i) => i + 1));
            
            if (result?.result?.users.length > 0) {
              setSelectedUser(result?.result?.users[0]);
            }
        } else if (result && result.message) {
           
            setError(result.message);
            Notify.failure(result.message);
            setUsers([]); 
            setPagination([]);
            setSelectedUser(undefined);
        } else {
            setError("An unknown error occurred while fetching users.");
            Notify.failure("An unknown error occurred while fetching users.");
            setUsers([]);
            setPagination([]);
            setSelectedUser(undefined);
        }
      } catch (err: any) {
        console.error('Failed to fetch user list:', err);
        setError(err.message || "Failed to fetch user list.");
        Notify.failure(err.message || "Failed to fetch user list.");
        setUsers([]); 
        setPagination([]);
        setSelectedUser(undefined);
      } finally {
        setIsLoading(false); 
      }
    }

    fetchCandidateLists()
      
  }, [search, page, sort, filter])

  function formatDate(createdAt: Date | string): string {
    const joined = new Date(createdAt);
    return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`;
  }

  function changePage(pageNumber: number) {
    setPage(pageNumber);
  }

  const nextPage = () => setPage(prev => prev + 1);
  const previousPage = () => setPage(prev => prev - 1);

  function searchCandidates(event: React.ChangeEvent<HTMLInputElement>) { 
    setSearch(event.target.value);
  }

  
  const debouncedSearch = (fn: Function, delay: number): Function => {
      let timer: ReturnType<typeof setTimeout>;
      return function(...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
        }, delay);
      };
  };

  const dSearch = debouncedSearch(searchCandidates, 600);

  return (
    <>
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full px-5 py-5 grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-9">
          <div className="w-full border-border-gray-200 bg-white rounded-md">
            <div className="header relative flex justify-between items-center p-3">
              <p>Users</p>
              <div className="flex gap-3">
                <button onClick={openFilter} className="text-sm text-gray-500 flex items-center border border-gray-200 rounded-md !px-3 gap-2 !py-1">
                  <FiFilter />
                  Filter
                </button>
                <button onClick={openSort} className="text-sm text-gray-500 flex items-center border border-gray-200 rounded-md !px-3 gap-2 !py-1">
                  <FaSortAmountUp />
                  Sort
                </button>
           {/* {Filter} */}
           {
            filterVisible && (
              <div className=" absolute bg-white top-15 w-xs right-20 shadow border border-gray-200 rounded-md">
                <div className='p-3 border-b border-gray-200 flex justify-between items-center'>
                  <p className='text-sm font-medium'>Filter Users</p>
                  <button onClick={closeFilter}><CgClose /></button>
                </div>
                <div className='p-3'>
                    <p className='text-sm font-light'>Status</p>
                    <ul className='flex flex-col gap-2 mt-3'>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox"
                          checked={filter.status.includes(false)}
                          onChange={(e) => handleFilterChange('status', false, e.target.checked )}
                        /> 
                        Active
                      </li>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox" 
                          checked={filter.status.includes(true)}
                          onChange={(e) => handleFilterChange('status', true, e.target.checked )}
                        /> 
                        Blocked
                      </li>
                    </ul>
                </div>
                <div className='p-3'>
                    <p className='text-sm font-light'>Verification</p>
                    <ul className='flex flex-col gap-2 mt-3'>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox"
                          checked={filter.verification.includes(true)}
                          onChange={(e) => handleFilterChange('verification', true, e.target.checked )}
                        /> 
                        Verified
                      </li>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox"
                          checked={filter.verification.includes(false)}
                          onChange={(e) => handleFilterChange('verification', false, e.target.checked )}
                        /> 
                        Not Verfied
                      </li>
                    </ul>
                </div>
                <div className='p-3'>
                    <p className='text-sm font-light'>Roles</p>
                    <ul className='flex flex-col gap-2 mt-3'>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox"
                          checked={filter.roles.includes('user')}
                          onChange={(e) => handleFilterChange('roles', 'user', e.target.checked )}
                        /> 
                        User
                      </li>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox"
                          checked={filter.roles.includes('recruiter')}
                          onChange={(e) => handleFilterChange('roles', 'recruiter', e.target.checked )}
                        /> 
                        Recruiter
                      </li>
                      <li className='text-xs flex items-center gap-2 text-gray-700'>
                        <input type="checkbox" 
                          checked={filter.roles.includes('admin')}
                          onChange={(e) => handleFilterChange('roles', 'admin', e.target.checked )}
                          /> 
                          Admin
                      </li>
                    </ul>
                </div>
              </div>
            )
           }
           {/* Sort */}
           {sortVisible && (
                <div className="absolute sort bg-white shadow p-3 top-15 border border-gray-200 rounded-md w-xs right-0">
                  <div className="flex justify-between items-center">
                    <p className='text-sm'>Sort by</p>
                    <i onClick={closeSort} className="cursor-pointer fa-solid fa-circle-xmark"></i>
                  </div>
                  <ul className='mt-5'>
                    <li className={`${sort === 'name-a-z' ? 'bg-orange-200' : 'bg-white'} !p-2 rounded-md`}><button onClick={() => setSort('name-a-z')} className='text-gray-500 text-xs flex items-center gap-3'><FaArrowUp /> Name A - Z</button></li>
                    <li className={`${sort === 'name-z-a' ? 'bg-orange-200' : 'bg-white'} !p-2 rounded-md`}><button onClick={() => setSort('name-z-a')} className='text-gray-500 text-xs flex items-center gap-3'><FaArrowDown /> Name Z - A</button></li>
                    <li className={`${sort === 'joined-latest' ? 'bg-orange-200' : 'bg-white'} !p-2 rounded-md`}><button onClick={() => setSort('joined-latest')} className='text-gray-500 text-xs flex items-center gap-3'><FaArrowUp /> Joined Latest</button></li>
                    <li className={`${sort === 'joined-oldest' ? 'bg-orange-200' : 'bg-white'} !p-2 rounded-md`}><button onClick={() => setSort('joined-oldest')} className='text-gray-500 text-xs flex items-center gap-3'><FaArrowDown /> Joined Oldest</button></li>
                  </ul>
                </div>
            )}
              </div>
            </div>
            <div className='mt-5 p-3'>
              <div className='bg-gray-100 flex items-center gap-2 !py-1 px-2 rounded-md '>
                <FaSearch color='gray' size={16} />
                <input onKeyUp={(event) => dSearch(event)} type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search Users' />
              </div>
            </div>
            <div className="overflow-y-auto mt-3">
              <table className="text-sm w-full text-left overflow-x-auto">
               <thead className="text-gray-500 font-medium border-t border-gray-300">
                 <tr className='border-b border-gray-300'> 
                   <td className='!p-2'>Name</td>
                   <td className='!p-2'>Email</td>
                   <td className='!p-2'>Role</td>
                   <td className='!p-2'>Joined</td>
                   <td className='!p-2'>Status</td>
                 </tr>
               </thead>
               <tbody>
                 {users.map((user : UserType) => ( 
                <tr
                  key={user._id} 
                  onClick={() => setSelectedUser(user)}
                  className={`${selectedUser?._id === user?._id ? "bg-orange-100" : "bg-white"} rounded-lg cursor-pointer border-b border-gray-300`} // Added cursor-pointer
                >
                  <td className='flex items-center gap-2 p-2'>
                      <div className='bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300'>
                        <p>{user?.name ? user?.name[0] : 'U'}</p>
                      </div>
                      <p className='text-xs'>{user.name}</p>
                  </td>
                  
                  <td><p className='text-xs'>{user?.email}</p></td>
                  <td>{
                    user?.role?.map((role: string, index: number) => (
                      <p key={index} className='text-xs'>{role}</p>
                    ))
                  }</td>
                  <td><p className='text-xs'>{formatDate(user?.createdAt as string)}</p></td>
                  <td>
                    {
                      user?.isBlocked
                          ? <span className='text-xs text-red-500 bg-red-100 rounded-full !px-2'>Blocked</span>
                          : <span className='text-xs text-green-500 bg-green-100 rounded-full !px-2'>Active</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            <div className="flex items-center justify-between text-xs p-3">
           <span>Showing {page} of {totalPage} Page</span>
           <div className="flex gap-2">
             {
              page > 1 && <button onClick={previousPage} className="px-2 py-1 bg-gray-100 rounded">Prev</button>
            }
            {
              pagination.map((pageNumber) => { 
                return(
                    <button onClick={() => changePage(pageNumber)} key={pageNumber} className={pageNumber === page ? 'px-3 py-1 bg-orange-500 text-white rounded' : 'px-3 py-1 bg-gray-100 rounded'}>{pageNumber}</button>
                )
              })
            }
            {
              page < totalPage && <button onClick={nextPage} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-500">Next</button>
            }
          </div>
        </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <div className="border border-gray-200 rounded-md bg-white">
              <div className='p-3 border-b border-gray-300 flex flex-col items-center justify-center'>
                <div className='w-15 h-15 flex items-center justify-center rounded-full bg-gray-200'>
                  <p className='text-2xl font-light text-gray-500'>{selectedUser?.name ? selectedUser?.name[0] : 'U'}</p>
                </div>
                <p className='mt-3 text-sm'>{selectedUser?.name}</p>
                <p className='mt-1 text-xs text-gray-700'>{selectedUser?.email}</p>
              </div>
              <div className="p-3 border-b border-gray-300">
                <p className='text-sm'>Summary</p>
                <p className="text-xs text-gray-700 mt-2">{selectedUser?.summary || 'Not Added'}</p>
              </div>
              <div className='p-3'>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                  <span className='text-xs text-gray-700 flex items-center gap-1'><LuUser /> Gender</span>
                  <p className="text-sm mt-1">{'Male'}</p>
                </div>

                <div>
                  <span className='text-xs text-gray-700 flex items-center gap-1'><CiCalendar /> Joined</span>
                  <p className="text-sm mt-1">{selectedUser?.createdAt ? formatDate(selectedUser?.createdAt as string) : 'Not Added'}</p>
                </div>

                <div>
                  <span className='text-xs text-gray-700 flex items-center gap-1'><IoLocation /> Location</span>
                  <p className="text-sm mt-1">{selectedUser?.location?.city ? `${selectedUser?.location.city}, ${selectedUser?.location.state}, ${selectedUser?.location.country}` : 'Not Added'}</p>
                </div>
                </div>

                <div className="mt-4">
                {
                  selectedUser?.location?.city && (
                    <iframe
                  width="100%"
                  height="200"
                  style={{ borderRadius: "10px" }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${selectedUser?.location?.city}, ${selectedUser?.location?.state}, ${selectedUser?.location?.country}`)}&output=embed`}
                ></iframe>
                  )
                }
                {
                  !selectedUser?.location?.city && (
                    <p className='text-center text-gray-500 text-sm'>No map data available</p>
                  )
                }
                </div>
                <div className='mt-2'>
                  <button onClick={() => navigate(`details/${selectedUser?._id}`)} className='w-full bg-gradient-to-br from-orange-400 to-orange-500 text-white !p-1 rounded-md'>View</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
