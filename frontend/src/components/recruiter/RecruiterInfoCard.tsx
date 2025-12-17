import React from 'react';
import { UserType } from '../../types/entityTypes';


const RecruiterInfoCard = ({ recruiterDetails } : {recruiterDetails: any}) => {
    if (!recruiterDetails) {
        return null;
    }

    const { organizationDetails } = recruiterDetails;

    return (
        <div className="">
            <div className="border border-gray-200 p-6 rounded-lg shadow-md mb-4">
                <p className='font-semibold text-gray-600'>Recruiting Type</p>
                <p className='text-gray-800'>{recruiterDetails?.employerType}</p>
            </div>
            
            <div className="border !p-6 rounded-lg border-gray-200 shadow-md mb-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{organizationDetails?.organizationName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="font-semibold text-gray-600">Industry</p>
                    <p className="text-gray-800">{organizationDetails?.industry}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Organization Type</p>
                    <p className="text-gray-800">{organizationDetails?.organizationType}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Team Strength</p>
                    <p className="text-gray-800">{organizationDetails?.teamStrength}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Website</p>
                    <a href={organizationDetails?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{organizationDetails?.website}</a>
                </div>
                <div className="md:col-span-2">
                    <p className="font-semibold text-gray-600">About Company</p>
                    <p className="text-gray-800">{organizationDetails?.aboutCompany}</p>
                </div>
                <div className="md:col-span-2">
                    <p className="font-semibold text-gray-600">Vision</p>
                    <p className="text-gray-800">{organizationDetails?.vision}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Contact Email</p>
                    <p className="text-gray-800">{organizationDetails?.organizationEmail}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Contact Number</p>
                    <p className="text-gray-800">{organizationDetails?.organizationContactNumber}</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default RecruiterInfoCard;

