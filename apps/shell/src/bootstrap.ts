import { bootstrap } from '@angular-architects/module-federation-tools';
import { AppModule } from './app/app.module';

bootstrap(AppModule, {
  appType: 'shell',
  production: true,
});
