import { IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    name: string;
    @IsString()
    employee_id: string;
    @IsString()
    email: string;
}