import { IsString } from "class-validator";

export class EmployeeActivityDto {
    @IsString()
    employee: string;
    @IsString()
    activity: string;
}