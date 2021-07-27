import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { CaseService } from '../../../services/CaseService';

@Component({
  selector: 'app-admin-statictics',
  templateUrl: './admin-statictics.component.html',
  styleUrls: ['./admin-statictics.component.css']
})
export class AdminStaticticsComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true,
          max: 50,
          min: 0
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Male', 'Female'];
  public pieChartData: SingleDataSet = [500, 300];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  private _data: APIResponseModel = new APIResponseModel();
  public selectedCompany: string = 'all';
  public caseSummaryData: any = [];
  public allCaseCompany: any = [];
  public caseGender: any = [];
  public caseCountByYear: any = [];
  public selectedCaseYear: string = '2021';

  constructor(private _caseService: CaseService) {
  }

  ngOnInit(): void {
    this.getAllCaseCompanyName();
    this.getCaseSummaryByCompanyName();
    this.getCaseGenderCount();
    this.getCaseCountByYear();
  }

  getAllCaseCompanyName() {
    this._caseService.getAllCaseCompanyName().subscribe(response => {
      this._data = JSON.parse(JSON.parse(JSON.stringify(response)));

      if (this._data.ResponseCode == 2000) {
        this.allCaseCompany = this._data.BusinessData;
      }
    });
  }

  getCaseSummaryByCompanyName() {
    this._caseService.getCaseSummaryByCompanyName(this.selectedCompany).subscribe(response => {
      this._data = JSON.parse(JSON.parse(JSON.stringify(response)));

      if (this._data.ResponseCode == 2000) {
        this.caseSummaryData = this._data.BusinessData;
      }
    });
  }

  getCaseGenderCount() {
    this._caseService.getCaseGenderCount().subscribe(response => {
      this._data = JSON.parse(JSON.parse(JSON.stringify(response)));

      if (this._data.ResponseCode == 2000) {
        this.caseGender = this._data.BusinessData;
        this.pieChartData = [this.caseGender['male'], this.caseGender['female']]
      }
    });
  }

  getCaseCountByYear() {
    this._caseService.getCaseCountByYear(this.selectedCaseYear).subscribe(response => {
      this._data = JSON.parse(JSON.parse(JSON.stringify(response)));

      if (this._data.ResponseCode == 2000) {
        this.caseCountByYear = this._data.BusinessData;
        var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        data[6] = parseInt(this.caseCountByYear);
        this.barChartData[0].data = data;
        console.log(this.barChartData[0].data)
      }
    });
  }

  onCompanyChange() {
    this.getCaseSummaryByCompanyName();
  }

  onCaseYearChange() {
    this.getCaseCountByYear();
  }

}
