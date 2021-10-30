import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './respository/activity.repository';

@Injectable()
export class ActivityService {
    constructor(
        private readonly activityRepository: ActivityRepository
    ) {

    }

    async createActivity(body) {
        return await this.activityRepository.createActivity(body);
    }

    async getActivities() {
        return await this.activityRepository.getActivities();
    }

    async updateActivity(id, data) {
        return await this.activityRepository.updateActivity(id, data)
    }

    async getPointsForActivity(code) {
        return await this.activityRepository.getPointsForActivity(code)
    }
}
