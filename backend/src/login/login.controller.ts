import {Controller, Get, Res} from '@nestjs/common';

@Controller('login')
export class LoginController {
    @Get()
    mostrarPantallaLogin(
        @Res() res
    ) {
        res.render('login');
    }
}
