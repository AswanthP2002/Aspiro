import { useEffect, useState } from 'react';
import { getUsers } from '../../../services/userServices';
import { userBlock, banUser, userUnblock, deleteUser } from '../../../services/userServices';
// import { banUser } from '../../../services/adminServices';
import { UserType } from '../../../types/entityTypes';
import { FaSortAmountUp } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { LuShieldBan, LuUser } from 'react-icons/lu';
import { IoSearchOutline } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BiTrash } from 'react-icons/bi';
import { formattedDateMoment } from '../../../services/util/formatDate';
import ReusableTable, { TableColumn } from '../../../components/admin/reusable/Table';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdBlock } from 'react-icons/md';
import { Modal } from '@mui/material';
import { toast } from 'react-toastify';

interface FilterOptions {
  status: boolean[]; 
  roles: string[]; 
  verification: boolean[]; 
}

export function OptionsMenu({
  row,
  onBlock,
  onUnBlock,
  onBan,
  onDelete,
  navigateUserDetails
}: {
  row: UserType,
  onBlock: (userId: string) => void,
  onUnBlock: (userId: string) => void,
  onBan: (userId: string) => void,
  onDelete: (userId: string) => void,
  navigateUserDetails: (userId: string) => void
}){
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const toggleOptionsMenu = () => setIsMenuOpen(prv => !prv)

  return(
    <>
      <div className="relative">
        <button onClick={toggleOptionsMenu}><BsThreeDotsVertical /></button>
      
        {isMenuOpen && (
          <div className='absolute border border-gray-200 rounded-md shadow-lg z-10 bg-white right-20'>
            <ul className='text-xs'>
              <li onClick={() => {navigateUserDetails(row._id as string); setIsMenuOpen(false)}} className='cursor-pointer px-4 py-2 hover:bg-gray-100 flex gap-2 items-center'><LuUser /> View Profile</li>
              {
                row.isBlocked
                  ? (!row.isBanned && (<li onClick={() => {onUnBlock(row._id as string); setIsMenuOpen(false)}} className='cursor-pointer px-4 py-2 hover:bg-gray-100 flex gap-2 items-center'><MdBlock /> Unsuspend Account</li>))
                  : (!row.isBanned && (<li onClick={() => {onBlock(row._id as string); setIsMenuOpen(false)}} className='cursor-pointer px-4 py-2 hover:bg-gray-100 flex gap-2 items-center'><MdBlock /> Suspend Account</li>))
              }
              {
                !row.isBanned && (<li onClick={() => {onBan(row._id as string); setIsMenuOpen(false)}} className='cursor-pointer px-4 py-2 flex gap-2 items-center'><LuShieldBan /> Permanent Ban</li>)
              }
              <li onClick={() => {onDelete(row._id as string); setIsMenuOpen(false)}} className='cursor-pointer text-red-500 px-4 py-2 flex gap-2 items-center'><BiTrash /> Delete User</li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default function Users() {
  
  const navigate = useNavigate()

  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1); 
  const [totalPage, setTotalPage] = useState(0); 
  const [search, setSearch] = useState(""); 
  // const [pagination, setPagination] = useState<number[]>([]); 
  // const [selectedUser, setSelectedUser] = useState<UserType>()
  const [viewUserProfilePicture, setViewUserProfilePicture] = useState(false)
  const [clickedUserProfilePicture, setClickedUserProfilePicture] = useState<string | null>(null)
  const [sortVisible, setSortVisible] = useState(false);
  const [sort, setSort] = useState('joined-latest'); 

  const [filterVisible, setFilterVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(true); 
  // const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterOptions>({
    status: [],
    roles: [],
    verification: [],
  });

  const openProfileImage = (url: string) => {
    setClickedUserProfilePicture(url)
    setViewUserProfilePicture(true)
  }
  const closeProfileImage = () => setViewUserProfilePicture(false)

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

  const bloackUser = async (id: string) => {
    if(!id) return

    Swal.fire({
      icon: 'warning',
      title: 'Block ?',
      text: 'Are you sure, you want to block this user ?',
      showConfirmButton: true, 
      confirmButtonText: 'Block',
      showCancelButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
      await userBlock(id)
      toast.success('User blocked')
      setUsers((prvUsers: UserType[]) => {
        return prvUsers.map((user: UserType) => {
          if(user._id === id){
            return {...user, isBlocked: true}
          }else {
            return user
          }
        })
      })
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
      }else{
        return
      }
    })
  }
  const unblockUser = async (id: string) => {
    if(!id) return

    Swal.fire({
      icon:'warning',
      title: 'Unblock ?',
      text: 'Are you sure, you want to unblock this user ?',
      showConfirmButton: true, 
      confirmButtonText: 'Unblock',
      showCancelButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
      await userUnblock(id)
      toast.success('Removed user suspension')
      setUsers((prvUsers: UserType[]) => {
        return prvUsers.map((user: UserType) => {
          if(user._id === id){
            return {...user, isBlocked: false}
          }else{
            return user
          }
        })
      })
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
      }else {
        return
      }
    })
  }

  const banUserPermanently = async (userId: string) => {
    if(!userId) return

    Swal.fire({
      icon: 'warning',
      title: 'Ban ?',
      text: 'Are you sure, you want to ban this user permanently?. This action can not be undone',
      showConfirmButton: true, 
      confirmButtonText: 'Ban',
      showCancelButton: true,
      cancelButtonText: 'No',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
      const result = await banUser(userId)
      toast.success(result?.message)
      setUsers((prvUsers: UserType[]) => {
        return prvUsers.map((user: UserType) => {
          if(user._id === userId){
            return {...user, isBanned: true}
          }else {
            return user
          }
        })
      })
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    }
      }else{
        return
      }
    })
  }

  const deleteAUser = async (userId: string) => {
    if(!userId) return

    Swal.fire({
      icon: 'warning',
      title: 'Delete ?',
      text: 'Are you sure?. Do you want to delete this user?. This cant be undone',
      showConfirmButton: true,
      confirmButtonText: "Delete",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then(async (response) => {
      if(response.isConfirmed){
        try {
          const result = await deleteUser(userId)
          setUsers((prv: UserType[]) => {
            return prv.filter((user: UserType) => user._id !== userId)
          })
          toast.success(result?.message)
        } catch (error: unknown) {
          toast.error(error instanceof Error ? error.message : 'Something went wrong')
        }
      }
    })
  }

  const navigateToUserDetailsPage = (userId: string) => {
    return navigate(`details/${userId}`)
  }

  useEffect(() => {
    async function fetchCandidateLists(){
       try {
        const result = await getUsers(search, page, sort, filter);
        
        if (result && result.success) {
            setUsers(result.result?.users || []);
            setTotalPage(result?.result?.totalPages || 0);
            
        } else if (result && result.message) {
            toast.error(result.memssage)
            setUsers([]); 
        } else {
           toast.error("An unknown error occurred while fetching users.");
            setUsers([]);
        }
      } catch (err: unknown) {
        console.error('Failed to fetch user list:', err);
        toast.error(err instanceof Error ? err.message : 'Something went wrong')
        setUsers([]); 
      } 
    }

    fetchCandidateLists()
      
  }, [search, page, sort, filter])

  function searchCandidates(event: React.ChangeEvent<HTMLInputElement>) { 
    setSearch(event.target.value);
  }

  
  const debouncedSearch = <T extends (...args: never[]) => void>(fn: T, delay: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return function(...args: Parameters<T>) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
        }, delay);
      };
  };

  const dSearch = debouncedSearch(searchCandidates, 600);

  const userTableColumns: TableColumn<UserType>[] = [
  {
    key: 'name',
    header: "USER",
    render: (row: UserType) => (
      <div className='flex gap-2'>
        {row.profilePicture?.cloudinarySecureUrl
          ? <div onClick={() => openProfileImage(row.profilePicture?.cloudinarySecureUrl as string)} className="w-10 h-10 cursor-pointer rounded-full ring-1 ring-blue-500">
            <img src={row.profilePicture.cloudinarySecureUrl} className='object-cover h-full w-full rounded-full' alt="" />
          </div>
          : <div className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-indigo-400 rounded-full">{row.name ? row.name[0] : 'U'}</div>
        }
        <div>
          <p className='font-medium'>{row.name}</p>
          <p className='text-xs'>{row.email}</p>
        </div>
      </div>
    )
  },
  {
    header: "JOINED DATE",
    key: 'createdAt',
    render: (row: UserType) => (
      <p className='text-xs'>{formattedDateMoment(row.createdAt as string, "MMM DD YYYY")}</p>
    )
  },
  {
    header: "ROLE",
    key: 'role',
    render: (row: UserType) => (
      <div className='flex flex-wrap gap-2'>
        {
          row.role?.map((r: string, index: number) => (
            <span className={`${r === 'user' ? 'bg-gray-200 text-gray-500 border-2 border-gray-300' : 'bg-blue-200 text-blue-500 border-2 border-blue-300'} px-2 rounded-md text-xs`} key={index}>{r}</span>
          ))
        }
      </div>
    )
  },
  {
    header: "STATUS",
    key: 'isBlocked',
    render: (row: UserType) => {
      if(row.isBlocked){
        return <span className='border-2 border-orange-300 bg-orange-200 text-orange-500 px-2 text-xs rounded-md'>Suspended</span>
      }
      if(row.isBanned){
        return <span className='border-2 border-red-300 bg-red-200 text-red-500 px-2 text-xs rounded-md'>Banned</span>
      }

      return <span className='border-2 border-green-300 bg-green-200 text-green-500 px-2 text-xs rounded-md'>Active</span>
    }
  },
  {
    header: "VERIFICATION",
    key: 'isVerified',
    render: (row: UserType) => {
      if(row.isVerified){
        return <span className='text-xs text-green-500'>Verified</span>
      }else{
        return <span className='text-xs text-red-500'>Not Verified</span>
      }
    }
  },
  {
    header: "ACTIONS",
    key: 'actions',
    render: (row: UserType) => (
      <OptionsMenu 
        row={row}
        onBlock={bloackUser}
        onUnBlock={unblockUser}
        onBan={banUserPermanently}
        onDelete={deleteAUser}
        navigateUserDetails={navigateToUserDetailsPage}
      />
    )
  }
]

  return (
    <>
    <div className="w-full min-h-screen p-5 lg:p-10 bg-gray-100">
      <p className='text-lg font-medium'>User Management</p>
      <p className='text-xs mt-1 mb-5'>Manaage all users and account security</p>
      <div className="p-3 border border-gray-200 bg-white rounded-md mb-3 relative">
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-6 lg:col-span-8">
            <div className="border border-gray-200 rounded-md px-2 py-1 flex items-center gap-2">
              <IoSearchOutline color='gray' />
              <input onKeyUp={(event) => dSearch(event)} type="text" className='!text-xs py-1 w-full' placeholder='Search users' />
            </div>
          </div>
          <div className="col-span-3 lg:col-span-2">
            <button onClick={openFilter} className="text-sm w-full text-gray-500 flex items-center border border-gray-200 rounded-md !px-3 gap-2 !py-1">
                  <FiFilter />
                  Filter
            </button>
          </div>
          <div className="col-span-3 lg:col-span-2">
            <button onClick={openSort} className="text-sm w-full text-gray-500 flex items-center border border-gray-200 rounded-md !px-3 gap-2 !py-1">
                  <FaSortAmountUp />
                  Sort
            </button>
          </div>
        </div>

        {filterVisible && (
          <div className="absolute z-25 bg-white top-15 w-xs right-20 shadow border border-gray-200 rounded-md">
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
        )}

        {sortVisible && (
          <div className="absolute z-25 sort bg-white shadow p-3 top-15 border border-gray-200 rounded-md w-xs right-0">
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
      
      <ReusableTable
        data={users as UserType[]}
        columns={userTableColumns}
        currentPage={page}
        totalPages={totalPage}
        onPageChange={(page: number) => setPage(page)}
      />
    </div>

    {viewUserProfilePicture && (
      <ProfilePictureView imgUrl={clickedUserProfilePicture as string} open={viewUserProfilePicture} onClose={closeProfileImage} />
    )}
    </>
  );
}

function ProfilePictureView({imgUrl, open, onClose}: {imgUrl: string, open: boolean, onClose: () => void}){
  return(
    <>
    <Modal className='flex flex-col items-center justify-center backdrop-blur-lg' open={open} onClose={onClose}>
        <div className='shadow-2xl w-50 h-50 rounded-full relative'>
          <img className='w-full h-full object-cover rounded-full' src={imgUrl} alt="" />
          <button onClick={onClose} className='absolute top-0 right-0'><CgClose size={25} color='white' /></button>
        </div>
    </Modal>
    </>
  )
}