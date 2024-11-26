import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateVersionDto {
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
