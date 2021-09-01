import { Whms } from "./core/Whms";
import { BaseConfigSchema, UploadConfigSchema } from "./types/types";
declare const whms: Whms;
/**
 * Upload work record list to database.
 *
 * @param uploadConfig
 */
declare function upload(uploadConfig: UploadConfigSchema): Promise<void>;
export default whms;
declare const baseConfig: BaseConfigSchema;
export { baseConfig, upload };
