import { Controller, Get, Param, Res } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Controller('radius')
export class RadiusController {
    constructor(private readonly userService: UserService) { }

    @Get('/check/:username')
    async check(@Param('username') username, @Res() res) {
        console.log(`GET /check/${username}`);
        const mac = username.replace('%3', ':');
        const user = await this.userService.findByUsername(mac);
        if (user === null || user === undefined) {
            res.status(401);
            return res.json({
                'Reply-Message': 'Login invalid',
            });
        }
        res.set('Content-Type', 'application/json');
        return res.sendStatus(204);
    }

    @Get('/auth/:username')
    async dhcpAuth(@Param('username') username, @Res() res) {
        console.log(`GET /auth/${username}`);
        const mac: string = username.replace('%3', ':');
        const user: User = await this.userService.findByUsername(mac);
        let pool: string;
        if (user === null || user === undefined) {
            res.status(401);
            return res.json({
                'Reply-Message': 'Login invalid',
            });
        }
        if (user.status === 'active') {
            pool = user.profile.addressPool;
        } else if (user.status === 'suspended') {
            pool = 'POOL_SUSPENDIDOS';
        } else {
            res.status(401);
            return res.json({ 'Reply-Message': 'Login disabled' });
        }
        res.set('Content-Type', 'application/JSON');
        return res.json({
            'Session-Timeout': '60',
            'Framed-Pool': pool,
            'Mikrotik-Address-List': user.profile.addressList,
            /*
             * Mikrotik Simple Queue
            'Mikrotik-Rate-Limit': `${user.profile.MaxUpload}/${user.profile.MaxDownload}
             ${user.profile.BurstRateUpload}/${user.profile.BurstRateDownload}
             ${user.profile.BurstThresholdUpload}/${user.profile.BurstThresholdDownload}
             ${user.profile.BurstTimeUpload}/${user.profile.BurstTimeDownload}
             ${user.profile.Priority} 
             ${user.profile.MinUpload}/${user.profile.MinDownload}`,
             *
             */
        });

    }

    @Get('/auth/:username/:password')
    async pppoeAuth(@Param('username') username, @Param('password') password, @Res() res) {
        console.log(`GET /auth/${username}/${password}`);
        const mac: string = username.replace('%3', ':');
        const user: User = await this.userService.findByUsername(mac);
        let pool: string;
        if (user === null || user === undefined) {
            res.status(401);
            return res.json({
                'Reply-Message': 'Login invalid',
            });
        }
        if (user.password !== password) {
            res.status(401);
            return res.json({
                'Reply-Message': 'Login invalid',
            });
        }
        if (user.status === 'active') {
            pool = user.profile.addressPool;
        } else if (user.status === 'suspended') {
            pool = 'POOL_SUSPENDIDOS';
        } else {
            res.status(401);
            return res.json({ 'Reply-Message': 'Login disabled' });
        }
        res.set('Content-Type', 'application/JSON');
        return res.json({
            'Session-Timeout': '60',
            'Framed-Pool': pool,
            'Mikrotik-Address-List': user.profile.addressList,
        });

    }
}
