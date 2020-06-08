import { LocaleHelper } from './app.locale.helper';

export class LocalizedComponent {
    public localeId: string = null;

    constructor() {
        this.localeId = LocaleHelper.getCurrentLocale();
      }
}