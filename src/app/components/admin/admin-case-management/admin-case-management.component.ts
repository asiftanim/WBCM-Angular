import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-case-management',
  templateUrl: './admin-case-management.component.html',
  styleUrls: ['./admin-case-management.component.css']
})
export class AdminCaseManagementComponent implements OnInit {

  public dummyData: any;
  SelectionType = SelectionType

  constructor() { }

  ngOnInit(): void {
    this.dummyData = [
      {
        "color": "11-06-2021",
        "type": "e526f03c-b4a4-4b28-a150-23e852372a91",
        "registration": "Open",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "1e0a95e7-a91a-48e1-936f-7b43c2d82130",
        "registration": "Fake",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "4ea57304-0d84-4706-95bb-21009aacac2c",
        "registration": "Closed",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "d05c54c2-1b44-4d0a-bc98-f12c5cc81860",
        "registration": "New",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "6f04c650-78cc-41fa-8b18-07d16647540d",
        "registration": "New",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "e526f03c-b4a4-4b28-a150-23e852372a91",
        "registration": "Open",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "1e0a95e7-a91a-48e1-936f-7b43c2d82130",
        "registration": "Fake",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "4ea57304-0d84-4706-95bb-21009aacac2c",
        "registration": "Closed",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "d05c54c2-1b44-4d0a-bc98-f12c5cc81860",
        "registration": "New",
        "capacity": "11-06-2021"
      },
      {
        "color": "11-06-2021",
        "type": "6f04c650-78cc-41fa-8b18-07d16647540d",
        "registration": "New",
        "capacity": "11-06-2021"
      }
    ]

  }

  setPage(pageInfo: any) {
  }

}
