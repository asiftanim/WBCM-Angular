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
        "color": "325 Days",
        "type": "test@gmail.com",
        "registration": "Adm",
        "capacity": "3 Days"
      },
      {
        "color": "324 Days",
        "type": "test@gmail.com",
        "registration": "CML",
        "capacity": "5 days"
      },
      {
        "color": "365 Days",
        "type": "test@gmail.com",
        "registration": "CMA",
        "capacity": "6 days"
      },
      {
        "color": "65",
        "type": "test@gmail.com",
        "registration": "Disabled",
        "capacity": "3 Days"
      },
      {
        "color": "26",
        "type": "test@gmail.com",
        "registration": "CML",
        "capacity": "6 Days"
      },
      {
        "color": "325 Days",
        "type": "test@gmail.com",
        "registration": "Adm",
        "capacity": "3 Days"
      },
      {
        "color": "324 Days",
        "type": "test@gmail.com",
        "registration": "CML",
        "capacity": "5 days"
      },
      {
        "color": "365 Days",
        "type": "test@gmail.com",
        "registration": "CMA",
        "capacity": "6 days"
      },
      {
        "color": "65",
        "type": "test@gmail.com",
        "registration": "Disabled",
        "capacity": "3 Days"
      },
      {
        "color": "26",
        "type": "test@gmail.com",
        "registration": "CML",
        "capacity": "6 Days"
      }
    ]

  }

  setPage(pageInfo: any) {
  }

  public addNewUserModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

}
