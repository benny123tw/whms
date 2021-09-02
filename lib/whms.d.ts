import { Whms } from "./core/Whms";
import { BaseConfigSchema } from "../index";
declare const whms: Whms;
/**
 * Upload work record list to database.
 *
 * @param uploadConfig
 */
declare const upload: (uploadConfig: import("../index").UploadConfigSchema) => Promise<void>;
declare const baseConfig: BaseConfigSchema;
export default whms;
export { baseConfig, upload };
