import { Whms } from "./core/Whms";
import { BaseConfigSchema } from "../index";

const config: BaseConfigSchema = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    data: {},
    requestUrl: "http://192.168.8.188:8088/whms/ajax/",
    baseUrl: "http://192.168.8.188:8088/",
    projectUrl: "http://192.168.8.188:8088/whms/workhour/list/"
}

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