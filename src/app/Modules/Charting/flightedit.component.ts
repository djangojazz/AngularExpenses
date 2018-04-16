import { Component, OnInit } from '@angular/core';
import { Flight } from "../../Models/Flight";
import { FlightPlan } from "../../Models/FlightPlan";

@Component({
  selector: 'app-flightedit',
  templateUrl: './flightedit.component.html'
})
export class FlighteditComponent implements OnInit {

  constructor(public flight: Flight) { }

  ngOnInit() {
  }

}
