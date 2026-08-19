import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf((info: winston.Logform.TransformableInfo) => {
    const { timestamp, level, message, stack } = info;

    return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
});

export const logger = winston.createLogger({
    level: "info",

    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        errors({ stack: true }),
        logFormat
    ),

    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                errors({ stack: true }),
                logFormat
            )
        }),

        new winston.transports.File({
            filename: "logs/framework.log"
        })
    ]
});