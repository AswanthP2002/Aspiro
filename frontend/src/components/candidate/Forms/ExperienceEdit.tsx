import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { editCandidateExperience } from '../../../services/userServices';
import { Experience } from '../../../types/entityTypes';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

export default function EditExperienceForm({
  experience,
  editExperienceModalOpen,
  closeExpEditModal,
  onEditExperience,
}: any) {
  type Inputs = {
    role: string;
    jobType: string;
    organization: string;
    startDate: any;
    endDate: any;
    location: string;
    workMode: string;
  };

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const [editableRole, setEditableRole] = useState('');
  const [editableRoleError, setEditableRoleError] = useState('');
  const [editableJobType, setEditableJobType] = useState('');
  const [editableJobTypeError, setEditableJobTypeError] = useState('');
  const [editableOrganization, setEditableOrganization] = useState('');
  const [editableOrganizationError, setEditableOrganizationError] =
    useState('');
  const [editableIsPresent, setEditableIsPresent] = useState(false);
  const [editableStartDate, setEditableStartDate] = useState('');
  const [editableStartDateError, setEditableStartDateError] = useState('');
  const [editableEndDate, setEditableEndDate] = useState('');
  const [editableEndDateError, setEditableEndDateError] = useState('');
  const [editableLocation, setEditableLocation] = useState('');
  const [editableLocationError, setEditableLocationError] = useState('');
  const [editableLocationType, setEditableLocationType] = useState('');
  const [editableLocationTypeError, setEditableLocationTypeError] =
    useState('');

  useEffect(() => {
    if (experience) {
      setEditableRole(experience.role);
      setEditableJobType(experience.jobtype);
      setEditableOrganization(experience.organization);
      setEditableIsPresent(experience.ispresent);
      setEditableStartDate(experience.startdate);
      setEditableEndDate(experience.enddate);
      setEditableLocation(experience.location);
      setEditableLocationType(experience.locationtype);

      reset({
        role:experience.role,
        jobType:experience.jobtype,
        organization:experience.organization,
        startDate:dayjs(experience.startDate),
        endDate:dayjs(experience.enddate),
        location:experience.location,
        workMode:experience.locationtype
      })
    }
  }, [experience]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    minWidth: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  function toggleIsPresent() {
    setEditableIsPresent((prevState) => !prevState);
  }

  async function validateEditExperience(experienceId: string) {
    const roleerror =
      !editableRole || !/^[a-zA-Z\s]{2,50}$/.test(editableRole) || false;
    const organizationerror =
      !editableOrganization ||
      !/^[a-zA-Z0-9\s\.,&-]{2,100}$/.test(editableOrganization) ||
      false;
    const jobtypeerror = !editableJobType || false;
    const startdateerror = !editableStartDate || false;
    let enddateerror = false;
    const locationerror =
      !location || !/^[a-zA-Z\s,]{2,100}$/.test(editableLocation) || false;
    const locationtypeerror = !editableLocationType;

    if (!editableIsPresent) {
      enddateerror = !editableEndDate || false;
    }

    roleerror
      ? setEditableRoleError('Please enter a valid job role')
      : setEditableRoleError('');
    jobtypeerror
      ? setEditableJobTypeError('Please select job type')
      : setEditableJobTypeError('');
    organizationerror
      ? setEditableOrganizationError('Please enter a valid organization name')
      : setEditableOrganizationError('');
    startdateerror
      ? setEditableStartDateError('Please provide a starting date')
      : setEditableStartDateError('');
    enddateerror
      ? setEditableEndDateError('Please provide a ending date')
      : setEditableEndDateError('');
    locationerror
      ? setEditableLocationError('Please provide company location')
      : setEditableLocationError('');
    locationtypeerror
      ? setEditableLocationTypeError('Please select location type')
      : setEditableLocationTypeError('');

    if (
      roleerror ||
      organizationerror ||
      jobtypeerror ||
      startdateerror ||
      enddateerror ||
      locationerror ||
      locationtypeerror
    ) {
      console.log(
        'checking booleans',
        roleerror,
        organizationerror,
        jobtypeerror,
        locationerror,
        locationtypeerror,
        startdateerror,
        enddateerror
      );
      return;
    }

    await editExperience(experienceId);
  }

  async function editExperience(experienceId?: string) {
    console.log('editable data', )
    const {role, jobType, organization, startDate, endDate, location, workMode} = watch()
    await editCandidateExperience(experienceId as string, role, jobType, organization, editableIsPresent, startDate, endDate, location, workMode)
    closeExpEditModal();
    Swal.fire({
      icon: 'success',
      title: 'Edited',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2000,
    }).then(() => {
      onEditExperience({
        _id: experienceId,
        role: role,
        organization: organization,
        jobtype: jobType,
        location: location,
        locationtype: workMode,
        startdate: startDate,
        enddate: endDate,
        ispresent: editableIsPresent,
      });
    });
  }

  return (
    <Modal open={editExperienceModalOpen} onClose={closeExpEditModal}>
      <Box sx={style}>
        <div className="w-full flex justify-end">
          <button onClick={closeExpEditModal} type="button" className="">
            <i className="fa-solid fa-close"></i>
          </button>
        </div>
        <Typography variant="h6" component="h2" sx={{ textAlign: ' center' }}>
          Edit Experience
        </Typography>
        <form onSubmit={handleSubmit(() => editExperience(experience?._id))}>
          <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: { value: true, message: 'Please enter job role' },
                  minLength: { value: 3, message: 'Minimum 3 charecters' },
                  maxLength: { value: 50, message: 'Maximum 50 charecters' },
                  pattern: {
                    value: /^[a-zA-Z0-9\s.,&()/-]{2,100}$/,
                    message: 'Please enter a valid job role',
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Role"
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
                    />
                  );
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <FormControl fullWidth error={Boolean(errors.jobType)}>
              <InputLabel id="employment-type-label">
                Employment Type
              </InputLabel>
              <Controller
                name="jobType"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Please select employment type',
                  },
                }}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      labelId="employment-type-label"
                      label="Employment Type"
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                    </Select>
                  );
                }}
              />
              <FormHelperText>{errors.jobType?.message}</FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <FormControl fullWidth>
              <Controller
                name="organization"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Organization name can not be empty',
                  },
                  minLength: { value: 3, message: 'Minimum 3 charecters' },
                  maxLength: { value: 50, message: 'Maximum 50 charecters' },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      variant="outlined"
                      label="Organization"
                      {...field}
                      error={Boolean(errors.organization)}
                      helperText={errors.organization?.message}
                    />
                  );
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={editableIsPresent ? true : false}
                  onChange={toggleIsPresent}
                />
              }
              label="I am currently working in this role"
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', gap: '20px' }}>
            <FormControl fullWidth error={Boolean(errors.startDate)}>
              <Controller
                name="startDate"
                control={control}
                rules={{
                  required: { value: true, message: 'Dates can not be emtpy' },
                }}
                render={({ field }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateField']}>
                        <DateField
                          error={Boolean(errors.startDate)}
                          {...field}
                          label="Start Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                }}
              />
              <FormHelperText>
                {errors.startDate?.message as string}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth error={Boolean(errors.endDate)}>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: {
                    value: editableIsPresent ? false : true,
                    message: 'Dates can not be empty',
                  },
                }}
                render={({ field }) => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateField']}>
                        <DateField
                        disabled={editableIsPresent ? true : false}
                          error={Boolean(errors.endDate)}
                          {...field}
                          label="End Date"
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  );
                }}
              />
              <FormHelperText>
                {errors.endDate?.message as string}
              </FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <FormControl fullWidth>
              <Controller
                name="location"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Location name can not be empty',
                  },
                  minLength: { value: 3, message: 'Minimum 3 charecters' },
                  maxLength: { value: 50, message: 'Maximum 50 charecters' },
                  pattern: {
                    value: /^[\w\s-]+(?:,\s*[\w\s-]+){0,3}$/,
                    message: 'Please enter a valid location',
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      label="Location"
                      variant="outlined"
                      {...field}
                      error={Boolean(errors.location)}
                      helperText={errors.location?.message}
                    />
                  );
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <FormControl fullWidth error={Boolean(errors.workMode)}>
              <InputLabel id="work-mode-label">Work Mode</InputLabel>
              <Controller
                name="workMode"
                control={control}
                rules={{
                  required: { value: true, message: 'Please select work mode' },
                }}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      label="Work Mode"
                      labelId="work-mode-label"
                    >
                      <MenuItem value="In-office">In-office</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                    </Select>
                  );
                }}
              />
              <FormHelperText>
                {errors.workMode?.message as string}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <button
              type="submit"
              className="bg-blue-400 rounded w-full p-1 text-white"
            >
              Edit
            </button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
