import { IoSchoolSharp } from 'react-icons/io5';
import { Education } from '../../../types/entityTypes';

export default function CandidateEducationCard({
  education,
  deleteEducation,
  openEditEducationModal
}: {
  education: Education,
  deleteEducation : any,
  openEditEducationModal : any
}) {
  return (
    <div className="card shadow-lg rounded border border-gray-100">
      <div className="card-header flex justify-between !p-3">
        <IoSchoolSharp size={30} />
        <div className="flex gap-3">
          <button onClick={openEditEducationModal} className="bg-blue-100 w-[30px] h-[30px] flex justify-center items-center rounded-full">
            <i className="fa-solid fa-pencil !text-black !text-xs"></i>
          </button>
          <button onClick={deleteEducation} className="bg-blue-100 w-[30px] h-[30px] flex justify-center items-center rounded-full">
            <i className="fa-solid fa-trash !text-black !text-xs"></i>
          </button>
        </div>
      </div>
      <div className="card-body p-3">
        <p className="font-semibold">{education.stream}</p>
        <p className="!text-gray-500 text-sm">{education.level}</p>
        <p className="text-gray-500 text-xs mt-3">
          {education.organization}, {education.location}
        </p>
        <p className="text-gray-500 text-xs mt-5 font-semibold">
          {education.startYear} -{' '}
          {education.isPresent ? 'Present' : education.endYear}
        </p>
      </div>
    </div>
  );
}
