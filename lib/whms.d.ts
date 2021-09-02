import { Whms } from "./core/Whms";
import { BaseConfigSchema, UploadConfigSchema } from "../types/types";
declare const whms: Whms;
/**
 * Upload work record list to database.
 *
 * @param uploadConfig
 */
declare const upload: (uploadConfig: UploadConfigSchema) => Promise<void>;
declare const baseConfig: BaseConfigSchema;
export default whms;
export { baseConfig, upload };
