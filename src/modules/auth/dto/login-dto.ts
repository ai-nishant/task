import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";


export class loginDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    email: string;
  
    @ApiProperty()
    @Length(10,10)
    @IsNumber()
    @IsOptional()
    phone: number;

    @ApiProperty()
    @Length(6,6)
    @IsNumber()
    @IsOptional()
    otp: number;

}