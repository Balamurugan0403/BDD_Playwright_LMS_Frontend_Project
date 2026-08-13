import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),

        format.printf((info: any) => {
            return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`;
        })
    ),
    transports: [
        new transports.Console()
    ]
});