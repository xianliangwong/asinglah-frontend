import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgChartsModule } from 'ag-charts-angular';
import type { AgChartOptions } from 'ag-charts-community';
import { selectOweAmountState } from 'src/app/features/expense-donutChart/expense-donutChart.selector';
import { ToastSignalService } from 'src/app/features/toast/ToastSignalService';
import { ExpenseDonutChartResDTO } from 'src/app/model/responseDTO/ExpenseDonutChartResDTO';

@Component({
  selector: 'app-owed-component',
  standalone: true,
  imports: [AgChartsModule, CommonModule],
  templateUrl: './owed-component.component.html',
  styleUrl: './owed-component.component.css',
})
export class OwedComponentComponent {
  activeTab: 'youowed' | 'youareowed' = 'youowed';

  OweDonutChart$!: Signal<ExpenseDonutChartResDTO[]>;

  oweOptions: AgChartOptions = {
    series: [
      {
        type: 'donut' as const,
        angleKey: 'amount',
        calloutLabelKey: 'category',
        sectorLabelKey: 'amount',
        sectorLabel: { fontSize: 14, color: 'white', formatter: ({ value }) => `$${value}` },
        innerRadiusRatio: 0.8,
        innerLabels: [{ text: 'Total You Owe', fontWeight: 'bold' }],
        data: [{ category: 'None', amount: 0 }],
      },
    ],
  };

  constructor(
    private store: Store,
    private toastService: ToastSignalService,
  ) {
    this.OweDonutChart$ = this.store.selectSignal(selectOweAmountState);

    effect(() => {
      const OweDonutChart = this.OweDonutChart$();
      if (OweDonutChart !== null && OweDonutChart !== undefined) {
        const chartData =
          OweDonutChart.length > 0
            ? OweDonutChart.map((e) => ({ category: e.name, amount: e.amount }))
            : [{ category: 'None', amount: 0 }]; // fallback

        this.oweOptions = {
          series: [
            {
              type: 'donut' as const,
              angleKey: 'amount',
              calloutLabelKey: 'category',
              sectorLabelKey: OweDonutChart.length > 0 ? 'amount' : undefined,
              sectorLabel: {
                fontSize: 14,
                color: 'white',
                formatter: ({ value }) => `$${Number(value).toFixed(2)}`,
              },
              innerRadiusRatio: 0.8,
              innerLabels:
                OweDonutChart.length > 0
                  ? [
                      { text: 'Total You Owe', fontWeight: 'bold', fontSize: 10, color: 'black' },
                      {
                        text: `$${chartData.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}`,
                        color: 'black',
                        fontSize: 10,
                      },
                    ]
                  : [{ text: 'You do not owe', fontWeight: 'bold', fontSize: 10, color: 'black' }],
              data: chartData,
            },
          ],
        };
      }
    });
  }

  ngOnInit() {}

  selectTab(tabName: 'youowed' | 'youareowed') {
    this.activeTab = tabName;
  }
}
