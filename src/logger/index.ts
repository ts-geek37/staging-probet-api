import fs from "fs";
import path from "path";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors, colorize } = format;

const baseLogDir = path.join(process.cwd(), "logs");
const errorDir = path.join(baseLogDir, "errors");
const infoDir = path.join(baseLogDir, "infos");


[baseLogDir, errorDir, infoDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const currentDate = new Date().toISOString().split("T")[0];

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `${timestamp} ${level.toUpperCase()}: ${stack}`
    : `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(errors({ stack: true }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    }),

    new transports.File({
      filename: path.join(infoDir, `${currentDate}-info.log`),
      level: "info",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(({ timestamp, level, message }) => `${timestamp} ${level.toUpperCase()}: ${message}`)
      ),
    }),

    new transports.File({
      filename: path.join(errorDir, `${currentDate}-error.log`),
      level: "error",
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        printf(({ timestamp, level, message, stack }) =>
          stack
            ? `${timestamp} ${level.toUpperCase()}: ${stack}`
            : `${timestamp} ${level.toUpperCase()}: ${message}`
        )
      ),
    }),
  ],
  exitOnError: false,
});

export default logger;
