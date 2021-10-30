import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EmployeeActivityDto } from './dto/employe-activity.dto';
import { EmpActivityService } from './emp-activity.service';

@Controller('v1/employee-activity')
export class EmpActivityController {
    constructor(
        private readonly employeeActivityService: EmpActivityService
    ) {
    }

    @Post('')
    async createEmpActivity(@Body() body: EmployeeActivityDto) {
        return await this.employeeActivityService.createActivity(body)
    }

    @Get('/list')
    async getEmployeesList(@Query() query) {
        return await this.employeeActivityService.getEmployeesList(query);
    }

    @Get('/:employeeId')
    async getEmployeeActivity(@Param("employeeId") employeeId: string, @Query() query) {
        return await this.employeeActivityService.getEmployeeActivities(employeeId, query);
    }
}


