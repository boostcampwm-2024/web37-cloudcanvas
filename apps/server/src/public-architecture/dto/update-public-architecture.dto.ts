import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePublicArchitectureDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}
