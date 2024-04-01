export const ContextStorageServiceKey = Symbol();

export default interface ContextStorageService {
  setContextId(contextId: string): void;
  getContextId(): string | undefined;
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T): void;
}