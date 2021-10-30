import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ActivityDocument = Activity & Document

@Schema({timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Activity {
    @Prop({type: String})
    name: string;

    @Prop({type: String})
    code: string;

    @Prop({type: Number})
    point: number;
}

export const acivitySchema = SchemaFactory.createForClass(Activity)