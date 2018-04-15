import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs"
import { Flight  } from "../Models/Flight";
import { FlightPlan  } from "../Models/FlightPlan";

@Injectable()
export class ChartingService {
    public flights: Flight[] = [];

constructor() { }
    public loadFlights(): Observable<Flight[]> {
        this.flights = [
            {flightId: 1, flightName: "Flight One", flightPlans: [
                {flightPlanId: 1, flightPlanName: "FlightPlan One"}
            ]}
        ];

        return Observable.of(this.flights);
    }
}
