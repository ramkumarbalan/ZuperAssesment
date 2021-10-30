import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from './repository/employee.repository';
import { Employee, employeeSchema } from './schema/employee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name, schema: employeeSchema
      }
    ])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository]
})
export class EmployeeModule {}
