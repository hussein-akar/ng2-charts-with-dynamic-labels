import { Component } from "@angular/core";
import {
  Label,
  PluginServiceGlobalRegistrationAndOptions,
  SingleDataSet
} from "ng2-charts";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public doughnutLabel: string = "";

  public doughnutChartLabels: Label[] = ["BMW", "Mercedes", "Lamborghini"];

  public doughnutChartType: any = "doughnut";

  public doughnutChartData: SingleDataSet = [189, 198, 221];

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [
    {
      beforeDraw(chart) {
        const ctx = chart.ctx;

        let label = "";

        try {
          var active = chart.active
            ? chart.tooltip._active[0]._datasetIndex
            : "";

          if (active !== "") {
            label =
              chart.tooltip._data.datasets[0].data[
                chart.tooltip._active[0]._index
              ];
          } else {
            label = chart.tooltip._data.datasets[0].data[0];
          }

          label = label + " MPH";

          this.doughnutLabel = label;
        } catch (err) {
          label = this.doughnutLabel;
        }

        const sidePadding = 60;
        const sidePaddingCalculated =
          (sidePadding / 100) * (chart.innerRadius * 2);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2 + 3;

        const stringWidth = ctx.measureText(label).width + 15;
        const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(28 * widthRatio);
        const elementHeight = chart.innerRadius * 2;

        const fontSizeToUse = Math.min(newFontSize, elementHeight);

        ctx.font = fontSizeToUse + "px Arial";
        ctx.fillStyle = "#666";

        ctx.fillText(label, centerX, centerY);
      }
    }
  ];
}
