import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreatePublicArchitectureDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsObject()
    @IsNotEmpty()
    architecture: Record<string, any>;

    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tag?: string[];
}
