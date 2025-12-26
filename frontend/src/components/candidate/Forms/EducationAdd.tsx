import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  higherSecondaryEducation,
  bachelorsDegree,
  mastersDegree,
  diploma,
} from '../../../assets/data/educationalStreamsData';
import { addUserEducation } from '../../../services/userServices';
import { Controller, useForm } from 'react-hook-form';
import { Notify } from 'notiflix';

export default function AddEducationForm({
  educationModalOpen,
  closeEducationModal,
  onAddEducation,
}: any) {
  type Inputs = {
    educationLevel: string;
    educationStream: string;
    educationInstitution: string;
    isPresent: boolean;
    startYear: string;
    endYear: string;
    location: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues:{
      educationLevel:"",
      educationStream:"",
      educationInstitution:"",
      isPresent:false,
      startYear:"",
      endYear:"",
      location:""
    }
  });

  const addEducation = async (data: Inputs) => {
    setLoading(true);
    const { educationInstitution, educationLevel, isPresent, educationStream, startYear, endYear, location } =
      data;
    try {
      const result = await addUserEducation(
        educationLevel,
        educationStream,
        educationInstitution,
        isPresent,
        startYear,
        endYear,
        location
      );
      
        if (result?.success) {
          Notify.success('Education added', { timeout: 2000 });
        } else {
          Notify.failure(result?.message, { timeout: 2000 });
          return
        }
       // closeEducationModal();
       
        onAddEducation({
          educationLevel: educationLevel,
          educationStream: educationStream,
          institution: educationInstitution,
          isPresent: isPresent,
          location: location,
          startYear: startYear,
          endYear: endYear,
        });
    
    } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
       reset({
          educationLevel: '',
          educationStream: '',
          educationInstitution: '',
          isPresent: false,
          startYear: '',
          endYear: '',
          location: '',
        });
      closeEducationModal()
      setLoading(false)
    }
  };

  const eduLevel = watch('educationLevel');
  const currentEducationStatus = watch('isPresent')

  const [loading, setLoading] = useState(false);
  const [isPresent, setIspresent] = useState(false);

  //seting vales from watch

  const toggleIsPresent = () => {
    setIspresent((prev) => !prev);
  };

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

  return (
    <Modal open={educationModalOpen} onClose={closeEducationModal}>
      <Box sx={style}>
        <div className="w-full flex justify-end">
          <button onClick={closeEducationModal} type="button" className="">
            <i className="fa-solid fa-close"></i>
          </button>
        </div>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          Add Education
        </Typography>
        <form onSubmit={handleSubmit(addEducation)}>
          <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.educationLevel)}>
            <InputLabel id="education-level-label">Education Level</InputLabel>
            <Controller
              name="educationLevel"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Education level can not be empty',
                },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="education-level-label"
                  label="Education Level"
                  error={Boolean(errors.educationLevel)}
                >
                  <MenuItem value="higherSecondary">Higher Secondary</MenuItem>
                  <MenuItem value="bachelors">Bachelors Degree</MenuItem>
                  <MenuItem value="masters">Masters Degree</MenuItem>
                  <MenuItem value="diploma">Diploma</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.educationLevel?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: '20px' }} error={Boolean(errors.educationStream)}>
            {eduLevel === 'other' ? (
              <TextField
                variant="outlined"
                label="Education Stream"
                {...register('educationStream', {
                  required: {
                    value: true,
                    message: 'Education stream can not empty',
                  },
                  minLength: { value: 2, message: 'Minimum 2 charecters' },
                  maxLength: { value: 30, message: 'Maximum 30 charecters' },
                  pattern: {
                    value: /^[a-zA-Z0-9\s-&()\/]+$/,
                    message: 'Enter a valid education',
                  },
                })}
                error={Boolean(errors.educationStream)}
                helperText={errors.educationStream?.message}
              />
            ) : (
              <>
                <InputLabel id="education-stream-label">Education Stream</InputLabel>
                <Controller
                  name="educationStream"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Education stream can not be empty',
                    },
                  }}
                  render={({ field }) => (
                    <Select {...field} labelId="education-stream-label" label="Education Stream">
                      {eduLevel === 'higherSecondary' &&
                        higherSecondaryEducation.map((stream, index: number) => (
                          <MenuItem key={index} value={stream}>
                            {stream}
                          </MenuItem>
                        ))}
                      {eduLevel === 'bachelors' &&
                        bachelorsDegree.map((stream, index: number) => (
                          <MenuItem key={index} value={stream}>
                            {stream}
                          </MenuItem>
                        ))}
                      {eduLevel === 'masters' &&
                        mastersDegree.map((stream, index: number) => (
                          <MenuItem key={index} value={stream}>
                            {stream}
                          </MenuItem>
                        ))}
                      {eduLevel === 'diploma' &&
                        diploma.map((stream, index: number) => (
                          <MenuItem key={index} value={stream}>
                            {stream}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.educationStream?.message}</FormHelperText>
              </>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: '20px' }}>
            <TextField
              variant="outlined"
              label="Institution"
              {...register('educationInstitution', {
                required: {
                  value: true,
                  message: 'Institution name can not be empty',
                },
                maxLength: { value: 50, message: 'Maximum 50 charecters' },
                pattern: {
                  value: /^[a-zA-Z0-9\s.,'()&-]+$/,
                  message: 'Enter a valid name',
                },
              })}
              error={Boolean(errors.educationInstitution)}
              helperText={errors.educationInstitution?.message}
            />
          </FormControl>

          <Controller
            name="isPresent"
            control={control}
            render={({field}) => (
              <FormControlLabel
                control={<Checkbox {...field} value={field.value} />}
                label="Im currently studying here"
              />
            )}
          />

          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              gap: '10px',
              width: '100%',
            }}
          >
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Start year"
                {...register('startYear', {
                  required: {
                    value: true,
                    message: 'Start year can not be empty',
                  },
                  pattern: {
                    value: /^(19|20)\d{2}$/,
                    message: 'Enter a valid year',
                  },
                })}
                error={Boolean(errors.startYear)}
                helperText={errors.startYear?.message}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="End year"
                disabled={currentEducationStatus}
                {...register('endYear', {
                  required: {
                    value: currentEducationStatus ? false : true,
                    message: 'End year can not be empty',
                  },
                  pattern: {
                    value: /^(19|20)\d{2}$/,
                    message: 'Enter a valid year',
                  },
                })}
                error={Boolean(errors.endYear)}
                helperText={errors.endYear?.message}
              />
            </FormControl>
          </Box>

          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <FormControl fullWidth error={Boolean(errors.location)}>
              <Controller
                name="location"
                control={control}
                rules={{
                  required: { value: true, message: 'Please enter location' },
                  minLength: { value: 5, message: 'Minimum 5 charecters' },
                  maxLength: { value: 50, message: 'Maximum 50 charecters' },
                  pattern: {
                    value: /^[\w\s-]+(?:,\s*[\w\s-]+){0,3}$/,
                    message: 'Enter a valid location',
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      label="Location"
                      variant="outlined"
                      error={Boolean(errors.location)}
                      helperText={errors.location?.message}
                    />
                  );
                }}
              />
            </FormControl>
          </Box>

          <Box sx={{ width: '100%', marginTop: '10px' }}>
            <Button
              type="submit"
              fullWidth
              sx={{ color: 'white', background: 'blue' }}
              variant="outlined"
              loading={loading}
              loadingPosition="end"
            >
              Add Education
            </Button>
            {/* <button onClick={addEducation} className="bg-blue-400 rounded w-full p-1 text-white">Add</button> */}
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
