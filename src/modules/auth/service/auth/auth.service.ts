import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/service/user/user.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(private userService : UserService,private jwtService : JwtService){

    }


    async signUp(param){
            try {
                const checkIfExist = await this.userService.findOne(param);
                if(checkIfExist&& checkIfExist.isVerified) return false;

                const user = await this.userService.create(param);
                return user;
            } catch (error) {
                return error;                
            }
    }
    //core services

    async login(payload){
        try {
            const user = await this.userService.loggedUserCheck(payload);
            if(user){
                let token = await this.createJwtPayload(user);
                console.log(token,"token");
                return token;
            }
            return user
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async createJwtPayload(payload){
        try {
            let dataObj = {
                phone:payload.phone,
                email:payload.email,
                name:payload.name
            }

            let jwt = this.jwtService.sign(dataObj);
            return jwt;

        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async verifyJwt(payload){
        try {
            const res = await this.jwtService.verify(payload);
            console.log(res);
            return res
            
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
