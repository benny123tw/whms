import { Method, AxiosResponse } from 'axios';

export declare type WhsRequestConfig = RequestProjects | RequestWorkRecord | RequestEmployee; //updateEmployee

export declare type RequestProjects = GetProjects | GetAvalibleProjects | GetProjectsByCondition;

export declare type RequestWorkRecord = GetWorkRecord | PostWorkRecord;

export declare type RequestEmployee = GetEmployees | GetEmployeesByCondition;

export declare interface GetProjects {
    method: 'getProjects';
    data: {},
}

export declare interface GetAvalibleProjects {
    method: 'getAvalibleProjects';
    data: {},
}

export declare interface GetProjectsByCondition {
    method: 'getProjectsByCondition';
    data: ProjectsCondition,
}

export declare interface GetWorkRecord {
    method: 'getWorkRecord';
    data: GetWorkRecordData;
}

export declare interface PostWorkRecord {
    method: 'addWorkRecord';
    data: PostWorkRecordData;
}

export declare interface GetEmployees {
    method: 'getEmployees';
    data: EmployeeData;
}

export declare interface GetEmployeesByCondition {
    method: 'getEmployeesByCondition';
    data: EmployeeCondition;
}

export declare interface GetWorkRecordData {
    workRecordEmployeeId: number;
    /**
     * Timestamp
     */
    workRecordCreateDate: number;
}

export declare interface PostWorkRecordData {
    workRecordList: WorkRecord[]
}

export declare interface ProjectsCondition {
    projectCodeSearch: string,
    projectNameSearch: string,
    projectShowAll: boolean
}

export declare interface EmployeeData {
    employeeShowDisabled: boolean;
}

export declare interface EmployeeCondition {
    employeeIdSearch: string,
    employeeNameSearch: string
}

export declare interface WorkRecord {
    employee: Employee;
    createDate: number;
    projectId: string | number;
    content: string;
    serial: number;
    section: string;
}

export declare interface WorkRecordConfig {
    employee: Employee;
    createDate: number;
    projectId: string | number;
    content: string;
}

export declare interface Employee {
    id: number;
    code?: string;
    name: string;
    account: string;
    password: string;
    tel?: string;
    ext?: string;
    email: string;
    enabled: boolean;
}

export declare interface Project {
    id: string | number;
    code: string;
    name: string;
    startDate: Date;
    inchargeEmployeeName: string;
    inchargeEmployeeTel: string;
    inchargeEmployeeEmail: string;
    displayOrder: number;
    endDate: Date;
    email: string;
    tel: string;
}

export declare interface BaseConfigSchema {
    /**
     * http method from axios `Method`. 
     * For more information please see [axios](https://axios-http.com/docs/intro).
     */
    method: Method;
    headers: any;
    data: any;
    requestUrl: string;
    baseUrl: string;
    projectUrl: string;
}

export declare interface UploadConfigSchema {
    /**
     * **Notice**: `employeeAccount` is your account name not the user name.
     */
    employeeAccount: string;
    projectCode: string;
    content: string;
    /**
     * Formate: "yyyy-MM-dd"
     */
    dateStart: string;
    dateEnd: string;
    passHoliday: boolean;
    /**
     * Exclude date such as national vacations, leave, etc.
     * Formate: "yyyy-MM-dd"
     */
    exclude: string[];
}

export declare interface WhmsInstance {
    /**
     * Config settings for connecting to Work Hour Management System.
     */
    baseConfig: BaseConfigSchema;
    /**
     * This method is not available for this instance. It will
     * be deprecated in the future.
     * 
     * @deprecated
     * @param path Path to the file.
     * @param filename File name to save.
     * @param data Data to save.
     */
    saveToLocal(path: string, filename: string, data: any): Promise<void>;
    /**
     * Get method for projects, employees and work records list.
     * 
     * @param {Object} config `WhsRequestConfig`
     * @returns `AxiosResponse`. For more information please see [axios](https://axios-http.com/docs/intro).
     */
    get<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R>;
    /**
     * Post Method for update value
     * 
     * @param config `WhsRequestConfig`
     * @returns `AxiosResponse`. For more information please see [axios](https://axios-http.com/docs/intro).
     */
    post<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R>;
    /**
     * Save work record list to the database.
     * 
     * @param workRecordList `WorkRecord[]`
     * @returns `AxiosResponse`. For more information please see [axios](https://axios-http.com/docs/intro).
     */
    save<T = any, R = AxiosResponse<T>>(workRecordList: WorkRecord[]): Promise<R>;
    /**
     * Create and return work record list;
     * 
     * @param workRecordConfig `WorkRecordConfig`
     * @returns `WorkRecord[]` 
     */
    generateWorkReocrd(workRecordConfig: WorkRecordConfig): WorkRecord[];
    /**
     * Upload work record list to database.
     * 
     * @param uploadConfig `UploadConfigSchema`
     * @returns `AxiosResponse`. For more information please see [axios](https://axios-http.com/docs/intro).
     */
    upload(uploadConfig: UploadConfigSchema): Promise<void>;
}

declare const whms: WhmsInstance;

export default whms;