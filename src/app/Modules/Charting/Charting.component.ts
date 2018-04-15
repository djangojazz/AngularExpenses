import { Component, OnInit } from '@angular/core';
import { ChartingService } from '../../Services/charting.service';
import { Flight } from '../../Models/Flight';

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

}
