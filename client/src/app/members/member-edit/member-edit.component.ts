import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { MemberService } from '../../_services/member.service';
import { Member } from './../../_models/member';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
@ViewChild('editForm') editForm?:NgForm;
@HostListener('windowbeforeunload',['$event']) notify($event:any){
  if(this.editForm?.dirty)
  {
    $event.returnValue=true;
  }
}
member?:Member;
private accountService=inject(AccountService)
private memberService=inject(MemberService)
private toastr=inject(ToastrService)


ngOnInit(): void {
 this.loadMember();
}

loadMember()
{
  const user=this.accountService.currentUser();
  if(!user) return;
  {
    this.memberService.getMember(user.username).subscribe({
      next:member=>this.member=member
  })
  }
}

updateMember()
{
  this.memberService.updateMember(this.editForm?.value).subscribe({
    next:_=>{
      this.toastr.success('Profile Updated Successfully');
      this.editForm?.reset(this.member);
    }
  })

}

}
