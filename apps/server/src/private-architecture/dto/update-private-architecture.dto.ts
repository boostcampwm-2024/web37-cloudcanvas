import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateArchiectureDto } from './create-private-architecture.dto';

export class UpdatePrivateArchiectureDto extends PartialType(
    CreatePrivateArchiectureDto,
) {}
