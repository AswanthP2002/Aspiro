import pino from 'pino';

// const transport = pino.transport({
//   target: 'pino-roll',
//   options: {
//     file: './logs/app.log',
//     frequency: 'daily',
//     limit: { count: 7 },
//     mkdir: true,
//   },
// });

const logger = pino(
  {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateteTime: 'SYS:HH:MM TT',
      },
    },
  }
  // pino.destination('./logs/app.log')
);

export default logger;
