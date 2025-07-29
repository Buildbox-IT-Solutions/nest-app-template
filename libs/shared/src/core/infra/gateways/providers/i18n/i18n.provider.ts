import { Injectable } from '@nestjs/common';
import { AbstractI18nProvider } from '~/core/application/gateways/providers/i18n/i18n.provider.abstract';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class i18nProvider implements AbstractI18nProvider {
  constructor(private readonly i18n: I18nService) {}

  t(key: string): string {
    return this.i18n.t(key);
  }
}
