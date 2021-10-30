import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from '../activity/activity.module';
import { EmpActivityController } from './emp-activity.controller';
import { EmpActivityService } from './emp-activity.service';
import { EmployeeActivityRepository } from './respository/employee-activity.repository';
import { employeActivitySchema, EmployeeActivity } from './schema/employee-activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
          name: EmployeeActivity.name, schema: employeActivitySchema
        }
    ]),
    ActivityModule
  ],
  controllers: [EmpActivityController],
  providers: [EmpActivityService, EmployeeActivityRepository]
})
export class EmpActivityModule {}
