export interface LogData {
  organization?: string; // Organization or project name
  context?: string; // Bounded Context name
  app?: string; // Application or Microservice name
  sourceClass?: string; // Classname of the source
  correlationId?: string; // Correlation ID
  error?: Error; // Error object
  props?: NodeJS.Dict<any>; // Additional custom properties
}