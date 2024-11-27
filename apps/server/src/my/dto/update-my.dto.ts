import { PartialType } from '@nestjs/swagger';
import { CreateMyDto } from './create-my.dto.js';

export class UpdateMyDto extends PartialType(CreateMyDto) {}
