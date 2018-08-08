import { Component, OnInit } from '@angular/core';
import { ChartingService } from '../../Services/charting.service';
import { Chart } from '../../Models/chart';
import { ChartPlan } from '../../Models/chartPlan';

@Component({
  selector: 'app-Charting',
  templateUrl: './charting.component.html',
  styleUrls: ['./charting.component.scss']
})
export class ChartingComponent implements OnInit {
  public charts: Chart[] = [];

  constructor(private service: ChartingService) { 
    this.charts = this.service.charts;
  }

  ngOnInit() {
    this.service.loadCharts()
      .subscribe(() => this.charts = this.service.charts);
  }

  openEditFlight(chart: Chart) {
    console.log(chart.chartName);
  }

  openEditFlightPlan(chartPlan: ChartPlan) {
    console.log(`ChartId ${chartPlan.chartPlanId}`)
  }
}
