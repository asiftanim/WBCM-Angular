import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  public dummyData: any;
  public closeResult: string ="";


  constructor(private modalService: NgbModal) { }

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

  public addNewUserModal(content: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    }, (reason) => {
    });
  }

}
