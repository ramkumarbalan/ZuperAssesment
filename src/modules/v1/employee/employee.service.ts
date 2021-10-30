import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeRepository } from './repository/employee.repository';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly employeePrepository: EmployeeRepository
    ) {}


    async createEmploye(createEmployeeDto: CreateEmployeeDto) {
        return await this.employeePrepository.createEmploye(createEmployeeDto);
    }

    async getAllEmployees() {
        return await this.employeePrepository.getAllEmployees()
    }
}

