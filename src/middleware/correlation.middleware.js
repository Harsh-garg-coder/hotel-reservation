import { v4 as uuidV4 } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/request.helper.js";

export const attachCorrelationId = (req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] || uuidV4();

    req.headers['x-correlation-id'] = correlationId;
    res.set('x-correlation-id', correlationId);

    asyncLocalStorage.run({ correlationId }, () => {
        next();
    });
}