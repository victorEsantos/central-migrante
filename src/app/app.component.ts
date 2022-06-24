import { Component } from '@angular/core';
import { LocalizationService } from './internationalization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private localizationService: LocalizationService) { }

  get name(): string {
    return this.localizationService.translate('banner.world');
  }

  title = 'central-migrante';
}
