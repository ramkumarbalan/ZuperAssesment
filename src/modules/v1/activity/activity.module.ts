import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './respository/activity.repository';
import { acivitySchema, Activity } from './schema/activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Activity.name, schema: acivitySchema
      }
    ])
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService]
})
export class ActivityModule {}
