import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/modules/logs/service/logs/logs.service';
import { Repository } from 'typeorm';
import { User } from '../../model/user';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo:Repository<User>,private otpService : LogsService){}


    async create(param){
        try {
          
            
            const checkIfExist = await this.findOne(param);   
            if(param && param.otp){                
                if(param.otp == checkIfExist.lastActiveOtp){                    
                    const updateUserNewOtp = await this.userRepo.update({userid:checkIfExist.userid },{isVerified:true})          
                    console.log(updateUserNewOtp,"updateUserNewOtp");
                    return true;
                }
            }
            
            if(!checkIfExist){
            var user = await this.userRepo.save(param);  
            }
            let generatedOtp =  await this.generateOtp();
            let otp={
                userid : checkIfExist?checkIfExist.userid :user.userid,
                type:'OTP',
                value :generatedOtp
            }
            
            const generateOtp = await this.otpService.create(otp);
            const updateUserNewOtp = await this.userRepo.update({userid:checkIfExist?checkIfExist.userid :user.userid},{lastActiveOtp:generatedOtp})          
            return generateOtp
        } catch (error) {
            return error
        }
    }

    async findOne(param){
        try {
            const findUser = await this.userRepo.findOne({where:[{phone:param.phone},{email:param.email}]});
            return findUser;
        } catch (error) {
            return error;
        }
        

    }

    async generateOtp(){
        return Math.random().toString().substr(2, 6);
    }

    async loggedUserCheck(payload){
        try {
            const user = await this.findOne({phone:payload.phone});

            //verifying already generated otp
            if(payload && payload.otp){                
                if(payload.otp == user.lastActiveOtp){ 
                    return user;
                }
            }

            if(user){
                const otp = await this.generateOtp();
                console.log(otp,"otp");
                
                const generateOtp = await this.otpService.create(otp);
                const updateUserNewOtp = await this.userRepo.update({userid:user.userid},{lastActiveOtp:otp})          
                
            }
        } catch (error) {
            throw new UnauthorizedException(error);
            
        }
    }
}
