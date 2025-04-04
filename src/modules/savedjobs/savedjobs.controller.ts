import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SavedJobsService } from '../savedjobs/services/savedjobs.service';
import { SavedJobsEntity } from '../../database/entities/savedjobs.entity';
import { CreateSavedJobDto } from '../savedjobs/dtos/create-savedJob-dto';
import { DeleteSavedJobDto } from './dtos/delete-saved-job-dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { UsersEntity } from '../../database/entities/users.entity';
import { DeleteSavedJobsService } from './services/delete-saved-jobs.service';

@ApiTags('saved-jobs')
@Controller('saved-jobs')
export class SavedJobsController {
  constructor(
    private readonly savedJobsService: SavedJobsService,
    private readonly deleteSavedJobs: DeleteSavedJobsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Save a job for a user' })
  async saveJob(
    @Body() createSavedJobDto: CreateSavedJobDto,
  ): Promise<SavedJobsEntity> {
    return this.savedJobsService.saveJob(createSavedJobDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a saved job' })
  @ApiParam({ name: 'id', description: 'The ID of the saved job to delete' })
  async deleteSavedJob(
    @Param() deleteSavedJobDto: DeleteSavedJobDto,
    @LoggedUser() user: UsersEntity,
  ) {
    return this.deleteSavedJobs.execute(deleteSavedJobDto, user.id);
  }
}
