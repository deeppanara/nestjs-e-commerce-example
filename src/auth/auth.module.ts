import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/tables/user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('ACCESS_KEY'),
          signOptions: { algorithm: 'HS256', expiresIn: '1y' },
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
