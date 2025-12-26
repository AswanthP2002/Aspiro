import { ErrorInfo, ReactNode } from "react"
import { Component } from "react"
import { HiHome } from "react-icons/hi2"

interface Props {
    children: React.ReactNode
}

interface State {
    hasError: boolean,
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props){
        super(props)
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log('--Error boundary caught an error: ', error)
        console.log('--Error info--', errorInfo)
        this.setState({hasError: true})
    }

    render(): ReactNode {
        
        if(this.state.hasError){
            return <div className="w-full h-screen flex flex-col px-10 justify-center bg-gradient-to-br from-red-500 to-red-600 items-center">
                <p className="text-center text-white font-bold text-2xl">Oops! Something went wrong</p>
                <p className="text-sm font-light mt-2 text-white text-center">
                    An unknown error occured, leave the page and try again after some time
                </p>
                <button className="text-xs flex items-center gap-2 mt-5 border-2 text-white hover:bg-green-500 border-white px-5 py-2 rounded-md">
                    <HiHome />
                    Go to home
                </button>
            </div>
        }else{
            return this.props.children
        }
    }

}

export default ErrorBoundary