import { NgIf, TitleCasePipe } from '@angular/common';
import { AccountService } from './../_services/account.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule,RouterLink,RouterLinkActive,TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
 accountService=inject(AccountService);
 private router=inject(Router)
 private toastr=inject(ToastrService);
model:any={};

login(){
 this.accountService.login(this.model).subscribe({
  next:response=>{
     this.router.navigateByUrl('/members')
     console.log(response);
  },
  error:error=>
  {
    this.toastr.error(error.error);
    console.error('login error: ',error);
    }
 });
}

logout()
{
  this.accountService.logout();
  this.router.navigateByUrl('/')
}
}
