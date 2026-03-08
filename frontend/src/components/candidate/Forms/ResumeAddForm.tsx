import { Button, FormControl, FormHelperText, Modal } from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiStar, BiUpload } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { IoCloseCircle } from 'react-icons/io5';
import { addUserResume } from '../../../services/userServices';
import { Notify } from 'notiflix';
import Swal from 'sweetalert2';
import { Resumes } from '../../../types/entityTypes';

interface AddResumeResponsePayload {
  success: true
  message: string
  result: Resumes
}

export default function ResumeAddForm({resumeModalOpen, closeResumeModal, onResumeAdd}: any) {
  const [resume, setResume] = useState<any>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  const [isPrimary, setIsPrimary] = useState<boolean>(false)

  const fileRef = useRef<HTMLInputElement | null>(null);

  const openFileSelect = () => {
    if(fileRef){
        fileRef.current?.click()
    }
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    if(file){
        setResume(file)
        setResumeFileName(file.name)
    }
  }

  const removeSelectedFile = () => {
    setResume(null)
    setResumeFileName('')
    fileRef.current.value = ''
  }

  type Inputs = {
    name: string
  }

  const {control, formState:{errors}, handleSubmit} = useForm<Inputs>({defaultValues:{name: ''}})

  async function addResume(data: Inputs){
    if(!resume) return

    setLoading(true)
    const {name} = data
    const primaryFlag = isPrimary ? "1" : "0"

    const formData = new FormData()
    
    formData.append('name', name)
    formData.append('isPrimary', primaryFlag )
    formData.append('resume', resume)
    
    for(const [key, value] of formData.entries()){
        console.log(`${key} : ${value}`)
    }

    try {
        const result: AddResumeResponsePayload = await addUserResume(formData)
        if(result?.success){
            Notify.success(result.message, {timeout: 3000})
            console.log('-- Checking resume add response--', result)
            onResumeAdd(result.result)
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Oops',
                text: result?.message,
                showCancelButton: false,
                showConfirmButton: true
            })
        }
    } catch (error: unknown) {
        Notify.failure(error instanceof Error ? error.message : 'Something went werong', {timeout: 3000})
    } finally {
        setLoading(false)
        closeResumeModal()
    }
  }

  return (
    <>
      <Modal className="flex items-center justify-center" open={resumeModalOpen}>
        <div className="p-3 bg-white rounded-md">
          <div className="flex justify-between">
            <div>
              <p>Upload Resume</p>
              <p className="text-xs text-gray-700">
                Upload your CV or Resume documents supported format PDF only
              </p>
            </div>
            <div>
              <button onClick={closeResumeModal}>
                <CgClose />
              </button>
            </div>
          </div>

          <div className="mt-3">
            <form onSubmit={handleSubmit(addResume)}>
              {!resume && (
                <div
                  onClick={openFileSelect}
                  className="border cursor-pointer border-gray-200 rounded-md flex flex-col py-10 justify-center items-center"
                >
                  <BiUpload size={28} color="gray" />
                  <p className="text-gray-700">Upload</p>
                </div>
              )}
              {resume && (
                <div className="border border-gray-300 flex justify-between px-3 py-1 rounded-md">
                  <p className="text-gray-700 text-sm font-light">{resumeFileName}</p>
                  <button onClick={removeSelectedFile}>
                    <IoCloseCircle />
                  </button>
                </div>
              )}
              <input accept='application/pdf' onChange={(e) => onFileSelect(e)} className="hidden" ref={fileRef} type="file" />
              <FormControl fullWidth className='!mt-3' error={Boolean(errors.name)}>
                <Controller 
                    control={control}
                    name='name'
                    rules={{
                        required:{value: true, message: 'Document name can not be empty'},
                        maxLength:{value: 100, message: 'Document name can not be longer than 30 charecters'},
                    }}
                    render={({field}) => (
                        <div>
                            <label htmlFor="" className="font-light">Document Name</label>
                            <input {...field} type="text" className="w-full bg-gray-100 border-3 rounded-md px-2 py-1 outline-none" placeholder="Eg: Resume" />
            
                        </div>
                    )}
                />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </FormControl>
              <div className='flex px-3 bg-gray-100 rounded-md py-2 justify-between mt-3 mb-3 items-center'>
                <span className='flex items-center gap-2'>
                    <BiStar />
                    <p className='text-xs'>Set as primary</p>
                </span>
                <div>
                    <input onChange={() => setIsPrimary(prv => !prv)} type="checkbox" />
                </div>
              </div>
              <div>
                <Button type='submit' fullWidth variant='contained' loading={loading} sx={{marginTop: '10px'}}>Add Resume</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
