import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedJobsService } from '././././services/savedjobs.service';
import { SavedJobsEntity } from '../../database/entities/savedjobs.entity';
import { UsersEntity } from '../../database/entities/users.entity';
import { JobsEntity } from '../../database/entities/jobs.entity';
import { DeleteSavedJobsService } from './services/delete-saved-jobs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SavedJobsEntity, UsersEntity, JobsEntity]), // Adicione JobsEntity aqui
  ],
  providers: [SavedJobsService, DeleteSavedJobsService],
  exports: [SavedJobsService, DeleteSavedJobsService],
})
export class SavedJobsModule {}
