import { Whms } from "./core/Whms";
import { readFileSync } from 'fs';
import * as path from 'path';
import { BaseConfigSchema, Employee, Project, UploadConfigSchema, WorkRecordConfig } from "./types/types";

const file = readFileSync(path.join(process.cwd(), 'config', 'base.json'), { encoding: 'utf-8', flag: 'r+' });
const config: BaseConfigSchema = JSON.parse(file);

// Create Whs instance
const whms = new Whms(config);

/**
 * Upload work record list to database.
 * 
 * @param uploadConfig 
 */
async function upload(uploadConfig: UploadConfigSchema): Promise<void> {
    return new Promise<any>(async (resolve, reject) => {
        if (!uploadConfig.employeeAccount) return reject(`Failed: Empty employee name.`);

        const eList: Employee[] = await whms.get(
            {
                method: 'getEmployees',
                data: {
                    employeeShowDisabled: true,
                }
            }
        );
        const pList: Project[] = await whms.get(
            {
                method: "getProjects",
                data: {}
            }
        );

        const employee = eList.find((e: Employee) => e.account === uploadConfig.employeeAccount);
        const projectId: string | number = pList.find((p: Project) => p.code === uploadConfig.projectCode)?.id || '';

        if (!employee) {
            return reject(`Can't find a match.`);
        }

        const workRecordConfig: WorkRecordConfig = {
            employee: employee,
            projectId: projectId,
            content: uploadConfig.content,
            createDate: 0
        }

        const dStart = new Date(uploadConfig.dateStart);
        const dEnd = new Date(uploadConfig.dateEnd);

        const days = (dEnd.getTime() - dStart.getTime()) / (1000 * 60 * 60 * 24);

        for (let i = 0; i <= days; i++) {
            const currentDate = new Date(dStart);     
            dStart.setDate(dStart.getDate() + 1);
            if (uploadConfig.exclude.includes(currentDate.toString())) continue;
            if (uploadConfig.passHoliday && (currentDate.getDay() == 0 || currentDate.getDay() == 6)) continue;

            workRecordConfig.createDate = currentDate.getTime();
            whms.save(whms.generateWorkReocrd(workRecordConfig));
        }
    })
}

export default whms;

const baseConfig = whms.baseConfig;
export {
    baseConfig,
    upload
}