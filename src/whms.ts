import { Whms } from "./core/Whms";
import { readFileSync } from 'fs';
import * as path from 'path';
import { BaseConfigSchema, Employee, Project, UploadConfigSchema, WorkRecordConfig } from "../types/types";

const file = readFileSync(path.join(__dirname, '..', 'config', 'base.json'), { encoding: 'utf-8', flag: 'r+' });
const config: BaseConfigSchema = JSON.parse(file);

// Create Whs instance
const whms = new Whms(config);

/**
 * Upload work record list to database.
 * 
 * @param uploadConfig 
 */
const upload = whms.upload.bind(whms);

const baseConfig = whms.baseConfig;

export default whms;
export {
    baseConfig,
    upload
}