import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import e from "express";
import { Model } from "mongoose";
import { formatErrorResponse } from "src/infrastructure/response-formatter/response-formatter";
import { CreateActivityDto } from "../dto/create-activity.dto";
import { Activity, ActivityDocument } from "../schema/activity.schema";

@Injectable()
export class ActivityRepository {
    constructor(
        @InjectModel(Activity.name) private readonly activityModel: Model<ActivityDocument>
    ) {}

    async createActivity(body: CreateActivityDto) {
        const exists = await this.activityModel.findOne({code: body.code}).exec()
        if(exists) {
            return formatErrorResponse('ALREADY EXISTS WITH SAME CODE', HttpStatus.CONFLICT);
        }
        return await new this.activityModel(body).save()
        .then(data => {
            return data;
        }).catch(e => {
            return formatErrorResponse(e.message, HttpStatus.BAD_REQUEST);
        })
    }

    async getActivities() {
        return await this.activityModel.find().exec() 
    }

    async updateActivity(id, data) {
        return await this.activityModel.findByIdAndUpdate(id, data)
        .then(result => {
            if(result) {
                return 'ACTIVITY UPDATED'
            } else {
                return formatErrorResponse('ACTIVITY NOT FOUND', HttpStatus.NOT_FOUND)
            }
        })
    }

    async getPointsForActivity(code) {
        return await this.activityModel.findOne({code})
        .then(data => {
            if(data) {
                return data;
            }
            return formatErrorResponse('Invalid Activity', HttpStatus.BAD_REQUEST);
        })
    }
}