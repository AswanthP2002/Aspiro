import moment from "moment";

export default function getReminingDays(expDate : Date | string) : number {
        const startDate = moment(new Date())
        const endDate = moment(new Date(expDate))

        const reminingDays = endDate.diff(startDate, 'days')

        return reminingDays

    }