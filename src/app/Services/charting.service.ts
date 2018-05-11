import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs"
import { Flight  } from "../Models/Flight";
import { FlightPlan  } from "../Models/FlightPlan";

@Injectable()
export class ChartingService {
    public flights: Flight[] = [];

constructor() { }
    public loadFlights(): Observable<Flight[]> {
        this.flights = [
            {
                flightId: 1, flightName: "Flight One", flightPlans: [
                {flightPlanId: 1, flightPlanName: "FlightPlan One"},
                {flightPlanId: 2, flightPlanName: "FlightPlan Two"}
            ]},
            {
                flightId: 2, flightName: "Flight Two", flightPlans: [
                {flightPlanId: 3, flightPlanName: "FlightPlan Three"},
                {flightPlanId: 4, flightPlanName: "FlightPlan Four"},
                {flightPlanId: 5, flightPlanName: "FlightPlan Five"}
            ]},
            {
                flightId: 3, flightName: "Flight Three", flightPlans: [
                {flightPlanId: 6, flightPlanName: "FlightPlan Six"},
                {flightPlanId: 7, flightPlanName: "FlightPlan Seven"},
                {flightPlanId: 8, flightPlanName: "FlightPlan Eight"}
            ]}
        ];

        return of(this.flights);
    }

    public pushFlight(flight: Flight) {
        this.flights.push(flight);
    }

    public popFlight(flightId: number) {
        delete this.flights[flightId];
    }
}
