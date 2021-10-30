import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateActivityDto {
    @IsDefined()
    @IsString()
    name: string;
    @IsDefined()
    @IsString()
    code: string;
    @IsDefined()
    @IsNumber()
    point: number;
}