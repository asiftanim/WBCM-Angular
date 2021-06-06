import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-user-add-edit-case',
  templateUrl: './user-add-edit-case.component.html',
  styleUrls: ['./user-add-edit-case.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAddEditCaseComponent implements OnInit {

  mode = '';
  uuid: any;

  constructor(private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit(): void {
  this.uuid = uuidv4();
    this.route.queryParams.subscribe(params => {
      this.mode = params['q'];
      console.log(this.mode);
  });
  }

  open(content: any) {
    this.modalService.open(content, {centered: true});
  }

  openReplyModal(reply: any) {
    this.modalService.open(reply, {size: 'lg', centered: true});
  }

  generateUUID(){
    this.uuid = uuidv4();
  }
}
