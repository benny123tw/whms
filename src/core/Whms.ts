import axios, { AxiosResponse } from "axios";
import { BaseConfigSchema, Employee, Project, UploadConfigSchema, UploadResponse, WhmsInstance, WhsRequestConfig, WorkRecord, WorkRecordConfig } from "../../index";
import * as moment from 'moment';

class Whms implements WhmsInstance {
    private section: string[] = [
        "09:00~10:00", "10:00~11:00", "11:00~12:00", "13:30~14:30",
        "14:30~15:30", "15:30~16:30", "16:30~17:30", "17:30~18:30"
    ]

    baseConfig: BaseConfigSchema;
    format: string;
    formatArr: Array<string>;

    constructor(baseConfig: BaseConfigSchema) {
        this.baseConfig = baseConfig;
        this.format = "YYYY/MM/DD";
        this.formatArr = [this.format, "YYYY-MM-DD"];
    }

    /**
     * @deprecated
     * @param path 
     * @param filename 
     * @param data 
     */
    public async saveToLocal(path: string, filename: string, data: any): Promise<void> {
        console.log(`${data}`);
        console.log(`${filename} saved to ${path}`);
    }

    /**
     * Get method for projects, employees and workhours.
     * 
     * @param {Object} config Whs Requset Config
     * @returns AxiosResponse
     */
    public async get<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R> {
        const res = await axios.get(this.baseConfig.requestUrl + config.method, {
            headers: { 'Content-Type': 'application/json', },
            data: config.data
        });

        return res.data;
    };

    /**
     * Post Method for update value
     * 
     * @param config Whs Requset Config
     * @returns AxiosResponse
     */
    public async post<T = any, R = AxiosResponse<T>>(config: WhsRequestConfig): Promise<R> {
        const res: R = await axios.post(this.baseConfig.requestUrl + config.method, JSON.stringify(config.data), {
            headers: { 'Content-Type': 'application/json', },
        });

        return res;
    };

    /**
     * Save work record list to the database.
     * 
     * @param workRecordList WorkRecord[] 
     * @returns 
     */
    public async save<T = any, R = AxiosResponse<T>>(workRecordList: WorkRecord[]): Promise<any> {
        return new Promise(async (resolve, reject) => {

            if (workRecordList.length !== 8)
                return reject(`Wrong list length: ${workRecordList.length}. It should be 8.`);

            return resolve(await this.post(
                {
                    method: 'addWorkRecord',
                    data: {
                        workRecordList: workRecordList
                    }
                }
            ));
        });
    }

    /**
     * Create and return work record list;
     * 
     * @param workRecordConfig 
     * @returns WorkRecord[] 
     */
    public generateWorkReocrd(workRecordConfig: WorkRecordConfig): WorkRecord[] {
        let serial = 10;
        const workRecordList: WorkRecord[] = [];

        for (let i = 0; i < this.section.length; i++) {
            const workRecord: WorkRecord = {
                employee: workRecordConfig.employee,
                createDate: workRecordConfig.createDate,
                serial: serial++,
                section: this.section[i],
                projectId: '',
                content: '',
            }
            workRecord.projectId = workRecordConfig.projectId;
            workRecord.content = workRecordConfig.content;
            workRecordList.push(workRecord);
        }
        return workRecordList;
    }

    /**
     * Upload work record list to database.
     * 
     * @param uploadConfig 
     */
    async upload(uploadConfig: UploadConfigSchema): Promise<UploadResponse[]> {
        return new Promise<UploadResponse[]>(async (resolve, reject) => {
            if (!uploadConfig.employeeAccount) return reject(`Failed: Empty employee name.`);

            const eList: Employee[] = await this.get(
                {
                    method: 'getEmployees',
                    data: {
                        employeeShowDisabled: true,
                    }
                }
            ); 
            const pList: Project[] = await this.get(
                {
                    method: "getProjects",
                    data: {}
                }
            );

            const employee = eList.find((e: Employee) => e.id === uploadConfig.id || e.account === uploadConfig.employeeAccount);
            const projectId: string | number = pList.find((p: Project) => p.code === uploadConfig.projectCode)?.id || '';

            if (!employee) {
                return reject(`Invalid employee: Can't find a match.`);
            }

            const workRecordConfig: WorkRecordConfig = {
                employee: employee,
                projectId: projectId,
                content: uploadConfig.content,
                createDate: 0
            }

            const dStart = moment(uploadConfig.dateStart, this.formatArr);
            const dEnd = moment(uploadConfig.dateEnd, this.formatArr);
            const days = dEnd.diff(dStart, 'days') + 1; // include first date
            const dateArr: moment.Moment[] = [];
            for (let i = 0; i < days; i++) {
                const curDate = moment(dStart);
                curDate.add(i, 'days');
                dateArr.push(curDate);
            }

            const pendArr = [];
            const itemNameArr: string[] = [];
            for (let date of dateArr) {
                if (uploadConfig.exclude.some(eDate => moment(eDate, this.formatArr).diff(date) == 0)) continue;
                if (uploadConfig.passHoliday && (date.isoWeekday() > 5)) continue;

                workRecordConfig.createDate = date.valueOf();
                pendArr.push(this.save(this.generateWorkReocrd(workRecordConfig)));
                itemNameArr.push(date.format(this.format));
            }

            const resArr: AxiosResponse[] = await Promise.all(pendArr);
            return resolve(resArr.map((res, idx) => {
                return {
                    item: itemNameArr[idx],
                    response: res
                }
            }));
        })
    }
}

export { Whms };