import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";


export class signUpDto {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @Length(10,10)
    @IsNumber()
    phone: number;

    @ApiProperty()
    @IsOptional()
    @Length(6)
    @IsNumber()
    otp: number;
  
  
    @ApiProperty()
    @IsEmail()
    email: string;
  }