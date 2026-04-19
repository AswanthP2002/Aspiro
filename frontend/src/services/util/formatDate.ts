import moment from "moment"
import {formatDistanceToNow} from 'date-fns'

export default function formatDate(createdAt : Date | string) : string {
    const joined = new Date(createdAt)
    return `${joined.getDate()}/${joined.getMonth() + 1}/${joined.getFullYear()}`
}

export function transformDate(date : string) {
    const formatedDate = moment(date).format('MMMM Do YYYY')
    return formatedDate
}

export function formatRelativeTime(date : string | Date){
    return formatDistanceToNow(date, {addSuffix:true})
}

export function formattedDateMoment(
    date: string,
    format: "MMM DD YYYY"
){
    const formatted = moment(date).format(format)
    return formatted
}