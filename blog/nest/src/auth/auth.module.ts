import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      //Use Factory function to dynamically get the configuration.
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('TOKEN_SECRET'), //Get the token secret key.
          signOptions: { expiresIn: '10d' }, //Set the expiration time of the token.
        }
      },
    }),
  ], //Use the JWT encryption service that relies on the config module.
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
