import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
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
        // Console logs
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

        // File logs
        new winston.transports.File({
            filename: "logs/framework.log"
        })
    ]
});