export default function getReminingDays(expDate : Date | string) : number {
        const expiryDate = new Date(expDate)
        const currentDate = new Date()

        const millSec = expiryDate.getTime() - currentDate.getTime()

        const days = Math.ceil(millSec / (1000 * 60 * 60 * 24))

        return days
    }