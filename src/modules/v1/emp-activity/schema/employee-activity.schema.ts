import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Employee } from "../../employee/schema/employee.schema";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Activity } from "../../activity/schema/activity.schema";
import { Doc } from "prettier";
import { timestamp } from "rxjs";

export type EmployActivityDocument = EmployeeActivity & Document;

@Schema({timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class EmployeeActivity {
    @Prop({
        type: String, 
        ref: 'Employee'
    })
    employee: String;

    @Prop(raw({
        activity: {type: String, ref: 'Activity'},
        points_earned: {type: Number, default: 0},
        timestamp: {type: Date}
      }))
    activities: Record<string, any>[];
}

export const employeActivitySchema = SchemaFactory.createForClass(EmployeeActivity);