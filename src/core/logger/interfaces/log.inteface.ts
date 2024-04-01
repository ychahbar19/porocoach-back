import { LogLevel } from "../logger.constant";
import { LogData } from "./logData.inteface";

export interface Log {
  timestamp: number; // Unix timestamp
  level: LogLevel; // Log level
  message: string; // Log message
  data: LogData; // Log data
}