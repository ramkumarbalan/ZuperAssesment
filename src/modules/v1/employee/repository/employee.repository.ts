import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Mode } from "fs";
import { Model } from "mongoose";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { Employee } from "../schema/employee.schema";

@Injectable()
export class EmployeeRepository {
    constructor(
        @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>
    ) {}

    async createEmploye(createEmployeeDto: CreateEmployeeDto) {
        console.log(createEmployeeDto)
        return await new this.employeeModel(createEmployeeDto).save()
    }

    async getAllEmployees() {
        return await this.employeeModel.find().exec()
    }
}