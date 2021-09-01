import { Method, AxiosResponse } from 'axios';

export declare type WhsRequestConfig = RequestProjects | RequestWorkRecord | RequestEmployee; //updateEmployee

export declare type RequestWorkRecord = GetWorkRecord | PostWorkRecord;

export declare interface RequestProjects {
    method: 'getProjects';
    data: {},
}

export declare interface GetWorkRecord {
    method: 'getWorkRecord';
    data: GetWorkRecordData;
}

export declare interface PostWorkRecord {
    method: 'addWorkRecord';
    data: PostWorkRecordData;
}

export declare interface RequestEmployee {
    method: 'getEmployees';
    data: EmployeeData;
}

export declare interface GetWorkRecordData {
    workRecordEmployeeId: number;
    workRecordCreateDate: number;
}

export declare interface PostWorkRecordData {
    workRecordList: WorkRecord[]
}

export declare interface EmployeeData {
    employeeShowDisabled: boolean;
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
    method: Method;
    headers: any;
    data: any;
    requestUrl: string;
    baseUrl: string;
    projectUrl: string;
}

export declare interface UploadConfigSchema {
    employeeAccount: string;
    projectCode: string;
    content: string;
    dateStart: string;
    dateEnd: string;
    passHoliday: boolean;
    exclude: string[];
}

export declare interface WhmsInstance {
    baseConfig: BaseConfigSchema;
    saveToLocal(path: string, filename: string, data: any): Promise<void>;
    get<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R>;
    save<T = any, R = AxiosResponse<T>>(orkRecordList: WorkRecord[]): Promise<R>;
    generateWorkReocrd( workRecordConfig: WorkRecordConfig): WorkRecord[];
}

declare const whms: WhmsInstance;

export default whms;