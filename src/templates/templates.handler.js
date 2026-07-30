import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { InternalServerError } from "../utils/errors/app.error.js";
import Handlebars from 'handlebars';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function renderMailTemplate(templateId, params) {
    const templatePath = path.join(__dirname, 'mailer', `${templateId}.hbs`);
    try {
        const content = await fs.readFile(templatePath, 'utf-8');
        const finalTemplate = Handlebars.compile(content);
        return finalTemplate(params);
    } catch (error) {
        throw new InternalServerError(`Template not found: ${templateId}`);
    }
}