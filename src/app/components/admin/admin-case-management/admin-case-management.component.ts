import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-case-management',
  templateUrl: './admin-case-management.component.html',
  styleUrls: ['./admin-case-management.component.css']
})
export class AdminCaseManagementComponent implements OnInit {

  public dummyData: any;

  constructor() { }

  ngOnInit(): void {
    this.dummyData = [
      {
        "color": "purple",
        "type": "minivan",
        "registration": 2020,
        "capacity": 7
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      },
      {
        "color": "red",
        "type": "station wagon",
        "registration": 2012,
        "capacity": 5
      }
    ]

  }

  setPage(pageInfo: any) {
  }

}
