import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: "info",

    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

        format.printf((info: { timestamp: any; level: any; message: any; }) => {
            const { timestamp, level, message } = info;
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),

    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/framework.log" })
    ]
});