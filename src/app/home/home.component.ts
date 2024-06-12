import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocations" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocations: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocations: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocations: HousingLocation[]) => {
      this.housingLocations = housingLocations;
      this.filteredLocations = housingLocations;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.housingLocations;
    } else {
      this.filteredLocations = this.housingLocations.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }
  }
}
