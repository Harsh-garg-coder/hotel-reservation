import { AsyncLocalStorage } from "node:async_hooks";

export const asyncLocalStorage = new AsyncLocalStorage();

export const getCorrelationId = () => {
    const asyncStore = asyncLocalStorage.getStore();

    const correlationId = asyncStore?.correlationId || "system";

    return correlationId;
}