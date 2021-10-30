import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { CreateActivityRecordDto } from '../dto/create-activity-record.dto';
import { EmployActivityDocument, EmployeeActivity } from '../schema/employee-activity.schema';
import { Schema as MongooseSchema} from 'mongoose';

@Injectable()
export class EmployeeActivityRepository {
    constructor(
        @InjectModel(EmployeeActivity.name) private readonly employeeActivityModel: Model<EmployActivityDocument>
    ) {
    }

    async createActivityRecord(ceateActivityRecordDto: CreateActivityRecordDto) {
        return await this.employeeActivityModel.findOneAndUpdate(
            {
                employee: ceateActivityRecordDto.employee
            }, 
            {
                $push: {
                   activities: {
                    activity: ceateActivityRecordDto.activity,
                    points_earned: ceateActivityRecordDto.points_earned,
                    timestamp:  new Date(new Date().toISOString().slice(0, 10)).toISOString()
                },
                }
        }, {upsert: true})
        .then(data => {
            return 'ACTIVITY CREATED';
        }).catch(e=> {
            return formatErrorResponse(e.message, HttpStatus.BAD_REQUEST)
        })
    }

    async getEmployeesList(query) {
        const matchQuery = {};
        let sortBy = -1;
        if(query.employeeId) {
            matchQuery['employee'] = query.employeeId
        }
        if(query.sortBy) {
            sortBy = query.sortBy == 'asc' ? 1 : -1
        }
        var pipeline: any = [
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: 'employees',
                localField: 'employee',
                foreignField: 'employee_id',
                as: 'employee'
            }
        },
        {
            $unwind: '$employee'
        },
        {
            $group: {
                _id: '$employee.employee_id',
                'total_points': {
                    $sum: {
                        $sum: '$activities.points_earned'
                    }
                },
                employee: { $first : '$employee'}
            }
        },
        {
            $project: {
                _id: 0,
                total_points: 1,
                name: '$employee.name',
                employee_id: '$employee.employee_id'
            }
        }
        ];
        // console.log('#######', pipeline.length)
        pipeline.push({ $sort : { total_points: sortBy }})
        if(query.limit && query.page) {
            pipeline.push({ $skip: Number(query.limit) * Number(query.page) });
            pipeline.push({ $limit: Number(query.limit) });
        }
        console.log('#######',  pipeline)
        return await this.employeeActivityModel.aggregate(pipeline).exec()
    }

    async getEmployeeActivities(employeeId, query) {
        const matchQuery = {
            employee: employeeId
        };
        if(query.from && query.to) {
            matchQuery['activities'] = {
                $elemMatch: {
                    timestamp:
                        {
                            $gte: new Date(query.from),
                            $lte: new Date(query.to)
                        }
                }
            }
        } 
        console.log(JSON.stringify(matchQuery))
        return await this.employeeActivityModel.aggregate([
            {
                $match: matchQuery
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'employee',
                    foreignField: 'employee_id',
                    as: 'employee'
                }
            },
            {
                $unwind: '$employee'
            },
            {
                $group: {
                    _id: '$employee.employee_id',
                    employee: { $first : '$employee'},
                    activities: { $first : '$activities'}
                }
            },
            {
                $project: {
                    _id: 0,
                    employee:1,
                    activities: (query.from && query.to)  ? {
                        $filter: {
                            input: '$activities',
                            as: 'activity',
                            cond: {
                                    $and : [
                                        {
                                            $gte: ['$$activity.timestamp', new Date(query.from)]
                                        },
                                        {
                                            $lte: ['$$activity.timestamp', new Date(query.to)]
                                        }
                                    ]
                                }   
                        }
                    } : 1,
                    employee_id: '$employee.employee_id'
                }
            },
            {
                $project: {
                    employee: 1,
                    activities: 1,
                    total_points: {
                        "$sum": "$activities.points_earned"
                    },
                }
            }
        ]).exec()
    }
}