import BaseRepository from "./base.repository.js";
import { User } from "../models/index.js";

export default class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        const user = await this.model.findOne({
            where: {
                email
            }
        });

        return user;
    }
}