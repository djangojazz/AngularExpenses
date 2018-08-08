import { Component, OnInit } from '@angular/core';
import { ChartingService } from '../../Services/charting.service';
import { Flight } from '../../Models/Flight';
import { FlightPlan } from '../../Models/FlightPlan';

@Component({
  selector: 'app-Charting',
  templateUrl: './Charting.component.html',
  styleUrls: ['./Charting.component.scss']
})
export class ChartingComponent implements OnInit {
  public flights: Flight[] = [];

  constructor(private service: ChartingService) { 
    this.flights = this.service.flights;
  }

  ngOnInit() {
    this.service.loadFlights()
      .subscribe(() => this.flights = this.service.flights);
  }

  openEditFlight(flight: Flight) {
    console.log(flight.flightName);
  }

  openEditFlightPlan(flightPlan: FlightPlan) {
    console.log(`FlightId ${flightPlan.flightPlanId}`)
  }
}
