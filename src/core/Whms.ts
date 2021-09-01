import axios, { AxiosResponse } from "axios";
import { BaseConfigSchema, WhmsInstance, WhsRequestConfig, WorkRecord, WorkRecordConfig } from "../types/types";

class Whms implements WhmsInstance {
    private section: string[] = [
        "00:00~01:00", "01:00~02:00", "02:00~03:00", "03:00~04:00", "04:00~05:00",
        "05:00~06:00", "06:00~07:00", "07:00~08:00", "08:00~09:00", "09:00~10:00",
        "10:00~11:00", "11:00~12:00", "13:30~14:30", "14:30~15:30",
        "15:30~16:30", "16:30~17:30", "17:30~18:30", "19:00~20:00",
        "20:00~21:00", "21:00~22:00", "22:00~23:00", "23:00~24:00"
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
    public async save<T = any, R = AxiosResponse<T>>(workRecordList: WorkRecord[]): Promise<R> {
        return new Promise(async (resolve, reject) => {
            const { createDate } = workRecordList[0];

            if (workRecordList.length !== 22)
                return reject(`Wrong list length: ${workRecordList.length}. It should be 22.`);

            const res = await this.post(
                {
                    method: 'addWorkRecord',
                    data: {
                        workRecordList: workRecordList
                    }
                }
            );

            const workRecordCreateDate = new Date(createDate);

            const dateString = workRecordCreateDate.getFullYear() + 
                            '-' + (workRecordCreateDate.getMonth()+1) + 
                            '-' + workRecordCreateDate.getDate();

            console.log(res.status == 200 ? `${dateString} uploaded.` : (`Failed: ${res.status} ${dateString} upload failed`));
        });
    }

    /**
     * Create and return work record list;
     * 
     * @param workRecordConfig 
     * @returns WorkRecord[] 
     */
    public generateWorkReocrd(workRecordConfig: WorkRecordConfig): WorkRecord[] {
        let serial = 1;
        const workRecordList: WorkRecord[] = [];

        for (let i = 0; i < this.section.length; i++) {
            const workRecord: WorkRecord = {
                employee: workRecordConfig.employee,
                createDate: workRecordConfig.createDate,
                serial: serial++,
                section: this.section[i],
                projectId: 0,
                content: '',
            }
            if (i <= 16 && i >= 9) {
                workRecord.projectId = workRecordConfig.projectId;
                workRecord.content = workRecordConfig.content;
            }
            workRecordList.push(workRecord);
        }
        return workRecordList;
    }
}

export { Whms };