import { SpinnerDotted} from 'spinners-react'

export default function ThreeDotLoading(){
    return(
        <div className='bg-white h-screen w-full absolute z-100 left-0 top-0 flex justify-center items-center'>
            <SpinnerDotted
                color='blue'
                size={80}
                thickness={70}
                speed={130}
            />
        </div>
    )
}