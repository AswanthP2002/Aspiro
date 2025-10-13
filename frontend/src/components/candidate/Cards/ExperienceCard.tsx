import { PiBuildingOfficeFill } from 'react-icons/pi';
import { Experience } from '../../../types/entityTypes';
import formatDate from '../../../services/util/formatDate';

export default function CandidateExperienceCard({
  exp, editExperience, deleteExperience
}: {
  exp: Experience, editExperience : any, deleteExperience : any
}) {
  return (
    <div
      className="card p-3 shadow-lg rounded border border-gray-100"
    >
      <div className="card-header flex justify-end gap-3">
        <button onClick={editExperience} className="bg-blue-100 rounded-full w-[30px] h-[30px] flex justify-center items-center">
          <i className="!text-xs !text-black fa-solid fa-pencil"></i>
        </button>
        <button onClick={deleteExperience} className="bg-blue-100 rounded-full w-[30px] h-[30px] flex justify-center items-center">
          <i className="!text-xs !text-black fa-solid fa-trash"></i>
        </button>
      </div>
      <div className="card-body p-2 flex justify-between gap-4 items-center">
        <div className="flex gap-4 items-center">
          <div>
            <PiBuildingOfficeFill size={40} />
          </div>
          <div>
            <p className="font-semibold">{exp.role}</p>
            <p className="bg-blue-100 w-fit text-sm rounded !px-2 mt-2">
              {exp.organization}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              <i className="fa-solid fa-location-dot !text-xs !text-gray-400 me-2"></i>
              {exp.location}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs">{formatDate(exp.startdate)}</p>
          <p className="text-xs mt-2">
            {exp.enddate ? formatDate(exp.enddate) : 'Present'}
          </p>
          <p className="text-xs mt-2 bg-blue-100 w-fit text-gray-500 rounded !px-2">
            {exp.locationtype}
          </p>
        </div>
      </div>
    </div>
  );
}
