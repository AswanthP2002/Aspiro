import pino from "pino";

const logger = pino({
    level:'info',
    transport:{
        target:'pino-pretty',
        options:{colorize:true, translateteTime:'SYS:HH:MM TT'}
    }
})

export default logger