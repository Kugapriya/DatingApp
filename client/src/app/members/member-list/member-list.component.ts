import { UserParams } from './../../_models/userParams';
import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountService } from '../../_services/account.service';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent,PaginationModule,FormsModule,ButtonsModule,NgFor],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
 memberService=inject(MemberService);
genderList=[{value:'male',display:'Males'},{value:'female',display:'Females'}]
// members: Member[] = [];

  ngOnInit(): void {
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers()
  {
    this.memberService.getMembers();
  }

  resetFilters()
  {
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event:any)
  {
    if(this.memberService.userParams().pageNumber!=event.page)
    {
      this.memberService.userParams().pageNumber=event.page;
      this.loadMembers();
    }
  }
 
}
