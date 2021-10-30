import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('v1/activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) {}

    @Post('/create')
    async createActivity(@Body() body: CreateActivityDto) {
        return await this.activityService.createActivity(body);
    }

    @Post('/update/:id')
    async updateActivity(@Body() body: CreateActivityDto, @Param('id') id: string) {
        return await this.activityService.updateActivity(id, body);
    }

    @Get('/all')
    async getActivities() {
        return await this.activityService.getActivities()
    }
}
