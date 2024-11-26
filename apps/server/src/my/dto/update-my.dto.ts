import { PartialType } from '@nestjs/swagger';
import { CreateMyDto } from './create-my.dto';

export class UpdateMyDto extends PartialType(CreateMyDto) {}
