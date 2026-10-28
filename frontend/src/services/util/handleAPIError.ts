import axios from 'axios'
import { toast } from 'react-toastify'

const handleApiError = (
    error: unknown,
    fallBackMessage: string
) => {
    console.log('Error type: ', axios.isAxiosError(error), 'status: ', axios.isAxiosError(error) ? error.response?.status : 'not an axios error')
    if(
        axios.isAxiosError(error) &&
        error.response?.status === 406
    ){
        return
    }

    toast.error(fallBackMessage)
}

export default handleApiError