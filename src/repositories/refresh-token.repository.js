import { RefreshToken } from "../models/index.js";
import BaseRepository from "./base.repository.js";

export default class RerfeshTokenRepository extends BaseRepository {
    constructor() {
        super(RefreshToken);
    }
}