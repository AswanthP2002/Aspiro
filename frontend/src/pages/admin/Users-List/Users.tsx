import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultUser from '../../../../public/default-img-instagram.png'
import { jobRoles } from '../../../assets/data/dummyJobRole';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';
import FilterComponent from '../../../components/common/FilterComponent';
import { getUsers } from '../../../services/adminServices';
import { UserType } from '../../../types/entityTypes';

interface FilterOptions {
  status: boolean[]; // For isBlocked
  roles: string[]; // For user roles
  verification: boolean[]; // For isVerified
}

export default function Users() {
  
  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(1); // Renamed for consistency
  const [limit, setLimit] = useState(10); // Renamed for consistency
  const [totalPage, setTotalPage] = useState(0); // Renamed for consistency
  const [search, setSearch] = useState(""); // Renamed for consistency
  const [pagination, setPagination] = useState<number[]>([]); // Changed type to number[]
  const [selectedUser, setSelectedUser] = useState<UserType>()

  const [sortVisible, setSortVisible] = useState(false);
  const [sort, setSort] = useState('joined-latest'); // Renamed for consistency
  const [currentSort, setCurrentSort] = useState('joined-latest'); // Reflects the *applied* sort

  const [filterVisible, setFilterVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState<string | null>(null); // Added error state
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

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCandidateLists(){
      setIsLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        const result = await getUsers(search, page, sort, filter);
        
        if (result && result.success) { // Check for success flag from backend
            // console.log('users list from the backend', result); // Removed debug log
            setUsers(result.result?.users || []);
            setPage(result.result?.currentPage || 1);
            setTotalPage(result?.result?.totalPages || 0);
            // Create an array for pagination buttons: [1, 2, ..., totalPages]
            setPagination(Array.from({ length: result?.result?.totalPages || 0 }, (_, i) => i + 1));
            
            if (result?.result?.users.length > 0) {
              setSelectedUser(result?.result?.users[0]);
            }
            setCurrentSort(result?.result?.sort || sort); // Use backend's applied sort, or fallback to requested sort
        } else if (result && result.message) {
            // Handle backend-specific error messages if success is false
            setError(result.message);
            Notify.failure(result.message);
            setUsers([]); // Clear users on error
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
        setUsers([]); // Clear users on error
        setPagination([]);
        setSelectedUser(undefined);
      } finally {
        setIsLoading(false); // End loading
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

  function searchCandidates(event: React.ChangeEvent<HTMLInputElement>) { // Added type for event
    setSearch(event.target.value);
  }

  // Debounce function definition (should be outside component or memoized)
  // For simplicity, keeping it here for now, but ideally it's a stable reference.
  const debouncedSearch = (fn: Function, delay: number): Function => {
      let timer: ReturnType<typeof setTimeout>; // Correct type for timer
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
    {
      filterVisible && ( <FilterComponent
        handleFilterChange={handleFilterChange}
        currentFilters={filter}
        closeFilter={closeFilter} 
        filterType={'user'}
        jobRole={jobRoles} 
      />)
    }
    <div className="px-6 flex gap-20">
      <h2 className='font-bold'>Users</h2>
      <div className="bg-white search-wrapper rounded-full w-[400px] relative">
        <input onKeyUp={(event) => dSearch(event)} type="text" name="" id="" className="outline-none border-none px-3 py-2" placeholder='Search Users' />
        <i className="fa-solid fa-search absolute right-5 bottom-2 !text-sm"></i>
      </div>
    </div>
    <>
    {isLoading ? (<p className='text-center text-gray-500 mt-5'>Loading users...</p>) 
               : error ? (<p className='text-center text-red-500 mt-5'>Error: {error}</p>) 
                       : users?.length > 0 ? (
      <div className="flex gap-6 p-6 bg-[#fff7f1] min-h-screen">
      {/* Company List Section */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        <div className="flex justify-end items-center mb-4 relative">
          <div className="flex gap-3">
            <button onClick={openFilter} className="text-sm text-gray-500">Filter</button>
            <button onClick={openSort} className="text-sm text-gray-500">Sort</button>
            {/* Sort */}
            {sortVisible && (
                <div className="absolute sort bg-white shadow p-3 right-0">
                  <div className="flex justify-end"><i onClick={closeSort} className="cursor-pointer fa-solid fa-circle-xmark"></i></div>
                  <ul>
                    <li className="list-none"><input onChange={() => setSort('joined-latest')} type="radio" checked={currentSort === 'joined-latest'} name="sort-group" id="sort-latest" /> <label htmlFor="sort-latest">Joined Latest</label></li>
                    <li className="list-none"><input onChange={() => setSort('joined-oldest')} type="radio" checked={currentSort === 'joined-oldest'} name="sort-group" id="sort-oldest" /> <label htmlFor="sort-oldest">Joined Oldest</label></li>
                    <li className="list-none"><input onChange={() => setSort('name-a-z')} type="radio" checked={currentSort === 'name-a-z'} name="sort-group" id="sort-az" /> <label htmlFor="sort-az">Name A - Z</label></li>
                    <li className="list-none"><input onChange={() => setSort('name-z-a')} type="radio" checked={currentSort === 'name-z-a'} name="sort-group" id="sort-za" /> <label htmlFor="sort-za">Name Z - A</label></li>
                  </ul>
                </div>
            )}
          </div>
        </div>

        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-t">
              <tr> 
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user : UserType) => ( // Removed index from key, use user._id
                <tr
                  key={user._id} // Use unique ID for key
                  onClick={() => setSelectedUser(user)}
                  className={`${selectedUser?._id === user?._id ? "bg-orange-300" : "bg-white"} rounded-lg cursor-pointer`} // Added cursor-pointer
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={user?.profilePicture?.cloudinarySecureUrl || defaultUser} alt="logo" className="w-8 h-8 rounded-full" />
                    {user.name}
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.headline ? user?.headline : "Not specified"}</td>
                  <td>{formatDate(user?.createdAt as string)}</td>
                  <td>
                    {
                      user?.isBlocked
                          ? <p className="text-red-400">Blocked</p>
                          : <p className='text-green-400'>Active</p>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Showing {page} of {totalPage} Page</span>
          <div className="flex gap-2">
            {
              page > 1 && <button onClick={previousPage} className="px-2 py-1 bg-gray-100 rounded">Prev</button>
            }
            {
              pagination.map((pageNumber) => { // Use pageNumber directly
                return(
                    <button onClick={() => changePage(pageNumber)} key={pageNumber} className={pageNumber === page ? 'px-3 py-1 bg-orange-500 text-white rounded' : 'px-3 py-1 bg-gray-100 rounded'}>{pageNumber}</button>
                )
              })
            }
            {
              page < totalPage && <button onClick={nextPage} className="px-2 py-1 bg-gray-100 rounded">Next</button>
            }
          </div>
        </div>
      </div>
      

      {selectedUser && ( // Only render if selectedUser exists
        <div className="w-[300px] bg-white p-5 rounded-xl shadow flex flex-col gap-3">
        <div className="text-sm text-center text-gray-400">{selectedUser?.headline || "Not Specified"}</div>
        <img style={{objectFit:'cover'}} src={selectedUser?.profilePicture?.cloudinarySecureUrl || defaultUser} alt="logo" className="w-16 h-16 rounded-full mx-auto" />
        <div className="text-center">
          <h3 className="font-semibold">{selectedUser?.name}</h3>
          {/* <p className="text-sm text-gray-500">{selectedCandidate?.username}</p> */}
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-600 mb-1">About</h4>
          <p className="text-xs text-gray-500">
            {selectedUser?.summary ? selectedUser?.summary : "Not Added Yet"}
          </p>
        </div>

        <div className="grid grid-cols-2 text-xs gap-2 mt-2 text-gray-600">
          <div>
            <span className="font-medium">Age</span>
            <p>Not Added</p>
          </div>
          <div>
            <span className="font-medium">Gender</span>
            <p>Not Added</p>
          </div>
          <div>
            <span className="font-medium">Joined</span>
            <p>{formatDate(selectedUser?.createdAt as string)}</p>
          </div>
          <div>
            <span className="font-medium">Location</span>
            <p>{selectedUser?.location?.city || "Not Added"}</p>
          </div>
        </div>

        <div className="mt-4">
          <iframe
          width="100%"
          height="200"
          style={{ borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(`${selectedUser?.location?.city}, ${selectedUser?.location?.state}, ${selectedUser?.location?.country}`)}&output=embed`}
          ></iframe>
        </div>

        <button onClick={() => navigate(`/admin/candidate/details/${selectedUser?._id}`)} className="mt-auto bg-orange-500 text-white rounded py-2">View</button>
      </div>)}
    </div>)
    : <p className='text-center font-gray-400 mt-3'>No Users</p>
    }
    </>
    </>
  );
}
