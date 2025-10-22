import React from 'react';

interface FilterOptions {
  status: boolean[];
  roles: string[];
  verification: boolean[];
}

interface FilterComponentProps {
  handleFilterChange: (
    category: keyof FilterOptions,
    value: string | boolean,
    isChecked: boolean
  ) => void;
  currentFilters: FilterOptions;
  closeFilter: () => void;
  filterType: 'user' | 'candidate'; // To control which filters are shown
  jobRole?: any[]; // Optional, for other filter types
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  handleFilterChange,
  currentFilters,
  closeFilter,
  filterType,
}) => {
  const userRoles = ['user', 'recruiter', 'admin'];

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-start z-40">
      <div className="bg-white w-70 h-full p-6 shadow-lg animate-slide-in">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h3 className="font-bold text-xl text-gray-800">Filters</h3>
          <i
            onClick={closeFilter}
            className="cursor-pointer fa-solid fa-times text-gray-500 hover:text-gray-800 transition-colors"
          ></i>
        </div>

        {/* User Filters */}
        {filterType === 'user' && (
          <div className="space-y-8">
            {/* Filter by Status (Blocked/Active) */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Status</h4>
              <ul className="space-y-2">
                <li>
                  <input
                    type="checkbox"
                    id="status-active"
                    className="form-checkbox h-4 w-4 text-orange-600"
                    checked={currentFilters.status.includes(false)}
                    onChange={(e) =>
                      handleFilterChange('status', false, e.target.checked)
                    }
                  />
                  <label htmlFor="status-active" className="ml-3 text-sm text-gray-600">
                    Active
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="status-blocked"
                    className="form-checkbox h-4 w-4 text-orange-600"
                    checked={currentFilters.status.includes(true)}
                    onChange={(e) =>
                      handleFilterChange('status', true, e.target.checked)
                    }
                  />
                  <label htmlFor="status-blocked" className="ml-3 text-sm text-gray-600">
                    Blocked
                  </label>
                </li>
              </ul>
            </div>

           {/* Filter by verification */}
           <div>
              <h4 className="font-semibold mb-3 text-gray-700">Verificaion</h4>
              <ul className="space-y-2">
                <li>
                  <input
                    type="checkbox"
                    id="status-active"
                    className="form-checkbox h-4 w-4 text-orange-600"
                    checked={currentFilters.verification.includes(true)}
                    onChange={(e) =>
                      handleFilterChange('verification', true, e.target.checked)
                    }
                  />
                  <label htmlFor="status-active" className="ml-3 text-sm text-gray-600">
                    Verified
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="status-blocked"
                    className="form-checkbox h-4 w-4 text-orange-600"
                    checked={currentFilters.verification.includes(false)}
                    onChange={(e) =>
                      handleFilterChange('verification', false, e.target.checked)
                    }
                  />
                  <label htmlFor="status-blocked" className="ml-3 text-sm text-gray-600">
                    Not Verified
                  </label>
                </li>
              </ul>
            </div>

            {/* Filter by Role */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Role</h4>
              <ul className="space-y-2">
                {userRoles.map((role) => (
                  <li key={role}>
                    <input
                      type="checkbox"
                      id={`role-${role}`}
                      className="form-checkbox h-4 w-4 text-orange-600"
                      checked={currentFilters.roles.includes(role)}
                      onChange={(e) =>
                        handleFilterChange('roles', role, e.target.checked)
                      }
                    />
                    <label htmlFor={`role-${role}`} className="ml-3 text-sm text-gray-600 capitalize">
                      {role}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter by Verification Status */}
            {/* ... (You can add this following the same pattern for `isVerified`) ... */}

          </div>
        )}

        {/* You can add 'candidate' specific filters here */}
        {filterType === 'candidate' && (
          <div>
            {/* Candidate-specific filter UI */}
            <p>Candidate filters would go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;