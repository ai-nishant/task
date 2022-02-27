import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { loginDto } from '../../dto/login-dto';
import { signUpDto } from '../../dto/signup-dto';
import { AuthService } from '../../service/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('signup')
    async signUp(@Body() user: signUpDto) {
        try {
            const resp = await this.authService.signUp(user);
            if (resp) {
                return {
                    status: 201,
                    message: "OTP has been sent on mobile " + user.phone,
                    value: resp
                }
            } else {
                return {
                    status: 400,
                    message: "User Already exists with mobile no " + user.phone,
                    value: resp
                }
            }

        } catch (error) {
            return {
                status: 400,
                message: error
            }
            return error;

        }
    }

    @Post('login')
    async login(@Body() payload: loginDto, @Res() res) {
        try {
            console.log(payload, "payload");

            if (!payload.phone && !payload.email) throw new BadRequestException("Details Missing");
            const resp = await this.authService.login(payload);
            return res.status(HttpStatus.OK).json({
                status: 200,
                value: resp
            })
        } catch (error) {
            throw new BadRequestException("Details Missing");
        }
    }

    @Post('verify')
    async verify(@Body() payload) {
        try {
            const res = await this.authService.verifyJwt(payload.token);
            return res;
        } catch (error) {
            return error;
        }
    }
}
