import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations'; // JSON Server URL // jason-server --watch db.json
  // Must use terminal to run then only the data will be retrieved

  constructor() { }

  // Must fetch data from JSON Server
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url); 
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(firstName, lastName, email);
  }
}
