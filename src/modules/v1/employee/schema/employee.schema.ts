import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EmployeeDocument =  Employee & Document  

@Schema({timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Employee {
    @Prop({type: String})
    name: string;

    @Prop({type: String})
    employee_id: string;

    @Prop({type: String})
    email: string;
}

export const employeeSchema = SchemaFactory.createForClass(Employee)