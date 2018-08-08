import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs"
import { Chart  } from "../Models/chart";
import { ChartPlan  } from "../Models/chartPlan";

@Injectable()
export class ChartingService {
    public charts: Chart[] = [];

constructor() { }
    public loadCharts(): Observable<Chart[]> {
        this.charts = [
            {
                chartId: 1, chartName: "Chart One", chartPlans: [
                {chartPlanId: 1, chartPlanName: "ChartPlan One"},
                {chartPlanId: 2, chartPlanName: "ChartPlan Two"}
            ]},
            {
                chartId: 2, chartName: "Chart Two", chartPlans: [
                {chartPlanId: 3, chartPlanName: "ChartPlan Three"},
                {chartPlanId: 4, chartPlanName: "ChartPlan Four"},
                {chartPlanId: 5, chartPlanName: "ChartPlan Five"}
            ]},
            {
                chartId: 3, chartName: "Chart Three", chartPlans: [
                {chartPlanId: 6, chartPlanName: "ChartPlan Six"},
                {chartPlanId: 7, chartPlanName: "ChartPlan Seven"},
                {chartPlanId: 8, chartPlanName: "ChartPlan Eight"}
            ]}
        ];

        return of(this.charts);
    }

    public pushChart(chart: Chart) {
        this.charts.push(chart);
    }

    public popChart(chartId: number) {
        delete this.charts[chartId];
    }
}
