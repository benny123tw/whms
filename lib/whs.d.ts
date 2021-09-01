import { Whs } from "./core/Whs";
import { BaseConfigSchema, UploadConfigSchema } from "./types/types";
declare const whs: Whs;
/**
 * Upload work record list to database.
 *
 * @param uploadConfig
 */
declare function upload(uploadConfig: UploadConfigSchema): Promise<void>;
export default whs;
declare const baseConfig: BaseConfigSchema;
export { baseConfig, upload };
