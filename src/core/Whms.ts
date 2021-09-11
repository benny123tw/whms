import axios, { AxiosResponse } from "axios";
import { BaseConfigSchema, Employee, Project, UploadConfigSchema, UploadResponse, WhmsInstance, WhsRequestConfig, WorkRecord, WorkRecordConfig } from "../../index";

class Whms implements WhmsInstance {
    private section: string[] = [
        "09:00~10:00", "10:00~11:00", "11:00~12:00", "13:30~14:30", 
        "14:30~15:30", "15:30~16:30", "16:30~17:30", "17:30~18:30"
    ]

    baseConfig: BaseConfigSchema;

    constructor(baseConfig: BaseConfigSchema) {
        this.baseConfig = baseConfig;
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

            const employee = eList.find((e: Employee) => e.account === uploadConfig.employeeAccount);
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

            const dStart = new Date(uploadConfig.dateStart);
            const dEnd = new Date(uploadConfig.dateEnd);
            const days = (dEnd.getTime() - dStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
            const dateArr: Date[] = [];
            for (let i = 0; i < days; i++) {
                const curDate = new Date(dStart);
                curDate.setDate(curDate.getDate() + i);
                dateArr.push(curDate);
            }

            const pendArr = [];
            const itemNameArr: string[] = [];
            for (let date of dateArr) {
                if (uploadConfig.exclude.includes(date.toString())) continue;
                if (uploadConfig.passHoliday && (date.getDay() == 0 || date.getDay() == 6)) continue;

                workRecordConfig.createDate = date.getTime();
                pendArr.push(this.save(this.generateWorkReocrd(workRecordConfig)));
                itemNameArr.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
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