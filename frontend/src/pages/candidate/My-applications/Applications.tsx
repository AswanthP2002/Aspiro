import { useEffect, useState } from 'react';
import { getMyApplications } from '../../../services/userServices';
import moment from 'moment';
import Swal from 'sweetalert2';
import { MyApplications as Application } from '../../../types/entityTypes';
import { Link } from 'react-router-dom';
import { PiBriefcase, PiMapPin } from 'react-icons/pi';
import CircularSpinner from '../../../components/common/CircularSpinner';

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState(true);

  function formatLocalDateTime(date?: string) {
    return moment(date).format('DD MMM YYYY, h:mm a');
  }

  useEffect(() => {
    (async function () {
      try {
        const result = await getMyApplications();
        if (result.success) {
          setApplications(result?.applications || []);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result?.message || 'Failed to fetch applications.',
          });
          setApplications([]);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
        setApplications([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'shortlisted':
        return 'text-blue-600 bg-blue-100';
      case 'accepted':
      case 'hired':
        return 'text-green-600 bg-green-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-2xl font-bold text-gray-800">My Applications ({applications?.length || 0})</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularSpinner size={50} color="blue" />
        </div>
      ) : applications && applications.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app: Application) => (
                <tr key={app._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-100 rounded-lg">
                        <PiBriefcase className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{app.jobDetails?.jobTitle}</div>
                        <div className="text-sm text-gray-500">
                            <span>Posted by {app.recruiterUserProfile.name} | {app.recruiterProfile.organizationDetails?.organizationName}</span>
                            <div className='flex items-center gap-2'>
                                <PiMapPin />
                                <p>{app.jobDetails.workMode} {app.jobDetails.workMode === 'On-site' ? `- ${app.jobDetails.location}` : ''}</p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatLocalDateTime(app.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/jobs/${app.jobDetails?._id}`} className="text-blue-600 hover:text-blue-900">
                      View Job
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <PiBriefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-sm text-gray-500">You have not applied for any jobs yet.</p>
          <div className="mt-6">
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}