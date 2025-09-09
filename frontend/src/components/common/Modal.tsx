import {Box, Modal} from '@mui/material'

export default function GeneralModal({openModal, closeModal, children, size = 'medium'} : {openModal : boolean, closeModal : any, children : any, size : string}){
    const modalStyle = {
        background:'white', 
        padding:'10px', 
        width:'fit-content', 
        borderRadius:'12px',
        outline:'none'
    }

    return(
        <>
        <Modal sx={{display:'flex', justifyContent:'center', alignItems:'center'}} open={openModal} onClose={closeModal}>
            <Box sx={modalStyle}>
                <div className='w-full flex justify-end'>
                    <button onClick={closeModal}><i className="fa-solid fa-xmark-circle !text-xl"></i></button>
                </div>
                {children}
            </Box>
        </Modal>
        </>
    )
}