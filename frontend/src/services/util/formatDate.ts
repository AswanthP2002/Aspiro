import moment from "moment"

export default function formatDate(createdAt : Date | string) : string {
    const joined = new Date(createdAt)
    return `${joined.getDate()}-${joined.getMonth() + 1}-${joined.getFullYear()}`
}

export function transformDate(date : string) {
    const formatedDate = moment(date).format('MMMM Do YYYY')
    return formatedDate
}

export function formatRelativeTime(date : any){
    return moment(date).startOf('days').fromNow()
}