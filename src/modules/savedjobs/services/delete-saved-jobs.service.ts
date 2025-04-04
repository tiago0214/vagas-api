import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteSavedJobDto } from '../dtos/delete-saved-job-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavedJobsEntity } from '../../../database/entities/savedjobs.entity';

@Injectable()
export class DeleteSavedJobsService {
  constructor(
    @InjectRepository(SavedJobsEntity)
    private savedJobsRepository: Repository<SavedJobsEntity>,
  ) {}

  async execute(deleteSavedJobDto: DeleteSavedJobDto, userId: string) {
    const { id } = deleteSavedJobDto;

    if (!id) {
      throw new BadRequestException('Saved job ID must be provided');
    }

    const savedJob = await this.savedJobsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!savedJob || savedJob.user.id !== userId) {
      throw new NotFoundException('Saved job not found or unauthorized');
    }

    await this.savedJobsRepository.remove(savedJob);

    return { message: 'Job deleted successfully' };
  }
}
