import { Injectable } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { CreateActivityRecordDto } from './dto/create-activity-record.dto';
import { EmployeeActivityDto } from './dto/employe-activity.dto';
import { EmployeeActivityRepository } from './respository/employee-activity.repository';

@Injectable()
export class EmpActivityService {
    constructor(
        private readonly activitySerive: ActivityService,
        private readonly employeeActivityRepo: EmployeeActivityRepository,
    ) {}


    async createActivity(employeeActivityDto :EmployeeActivityDto) {
        const activityDetail = await this.activitySerive.getPointsForActivity(employeeActivityDto.activity)
        const createActivityRecordDto: CreateActivityRecordDto = {
            employee: employeeActivityDto.employee,
            activity: employeeActivityDto.activity,
            points_earned: activityDetail.point
        }
        console.log(createActivityRecordDto)
        return await this.employeeActivityRepo.createActivityRecord(createActivityRecordDto);
    }

    async getEmployeesList(query) {
        return await this.employeeActivityRepo.getEmployeesList(query)
    }

    async getEmployeeActivities(employeeId, query) {
        return await this.employeeActivityRepo.getEmployeeActivities(employeeId, query)
    }
}
