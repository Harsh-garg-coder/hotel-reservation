export default class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const record = await this.model.create(data);
        return record;
    }
}