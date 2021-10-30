import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('v1/employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) {}

    @Post('')
    async createEmploye(@Body() body :CreateEmployeeDto) {
        return await this.employeeService.createEmploye(body)
    }
    
    @Get('all')
    async getAllEmployees() {
        return await this.employeeService.getAllEmployees()
    }
}
