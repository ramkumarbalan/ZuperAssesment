import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './modules/v1/activity/activity.module';
import { EmployeeModule } from './modules/v1/employee/employee.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './infrastructure/exception-filter/http-exception.filters';
import { EmpActivityModule } from './modules/v1/emp-activity/emp-activity.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    EmployeeModule,
    ActivityModule,
    EmpActivityModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		}],
})
export class AppModule {}
