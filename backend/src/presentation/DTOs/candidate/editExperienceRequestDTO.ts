export default interface EditExperienceRequestDTO {
  experienceId: string;
  editableRole: string;
  editableJobType: string;
  editableOrganization: string;
  editableIsPresent: boolean;
  editableStartDate: string;
  editableEndDate: string;
  editableLocation: string;
  editableLocationType: string;
}
