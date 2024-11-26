import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreatePrivateArchiectureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsObject()
    @IsNotEmpty()
    architecture: Record<string, any>;

    @IsNumber()
    @IsNotEmpty()
    cost: number;
}
