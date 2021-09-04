import { AxiosResponse } from "axios";
import { BaseConfigSchema, UploadConfigSchema, WhmsInstance, WhsRequestConfig, WorkRecord, WorkRecordConfig } from "../../index";
declare class Whms implements WhmsInstance {
    private section;
    baseConfig: BaseConfigSchema;
    constructor(baseConfig: BaseConfigSchema);
    /**
     * @deprecated
     * @param path
     * @param filename
     * @param data
     */
    saveToLocal(path: string, filename: string, data: any): Promise<void>;
    /**
     * Get method for projects, employees and workhours.
     *
     * @param {Object} config Whs Requset Config
     * @returns AxiosResponse
     */
    get<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R>;
    /**
     * Post Method for update value
     *
     * @param config Whs Requset Config
     * @returns AxiosResponse
     */
    post<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R>;
    /**
     * Save work record list to the database.
     *
     * @param workRecordList WorkRecord[]
     * @returns
     */
    save<T = any, R = AxiosResponse<T>>(workRecordList: WorkRecord[]): Promise<any>;
    /**
     * Create and return work record list;
     *
     * @param workRecordConfig
     * @returns WorkRecord[]
     */
    generateWorkReocrd(workRecordConfig: WorkRecordConfig): WorkRecord[];
    /**
     * Upload work record list to database.
     *
     * @param uploadConfig
     */
    upload(uploadConfig: UploadConfigSchema): Promise<void>;
}
export { Whms };
