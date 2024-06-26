/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { classes } from '@automapper/classes';
/**
 * Providers
 */
import { InfrastructureModule } from '@app/infrastructure/infrastructure.module';
import { USE_CASES } from './useCases';
import { PROFILES } from './profiles';

@Module({
  imports: [
    InfrastructureModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    JwtModule.register({
      secret: 'test-key',
      global: true,
      signOptions: {
        expiresIn: process.env.NODE_ENV === 'production' ? '30m' : '7d',
      },
    }),
  ],
  providers: [...USE_CASES, ...PROFILES],
  exports: [...USE_CASES],
})
export class ApplicationModule {}
