import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { User } from '../../_models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  private adminService=inject(AdminService);
  private modalService=inject(BsModalService)
  users:User[]=[];

  bsModalRef:BsModalRef<RolesModalComponent>=new BsModalRef<RolesModalComponent>();

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles()
  {
    this.adminService.getUserWithRoles().subscribe({
      next:users=>this.users=users
    })
}
openRolesModal(user:User)
{
  const initalState:ModalOptions={
    class:'modal-lg',
    initialState:{
      title:'User roles',
      username:user.username,
      selectedRoles:[...user.roles],
      availableRoles:['Admin','Moderator','Member'],
      users:this.users,
      rolesUpdated:false
    }
  }
  this.bsModalRef=this.modalService.show(RolesModalComponent,initalState);
  this.bsModalRef.onHide?.subscribe({
    next:()=>{
      if(this.bsModalRef.content && this.bsModalRef.content.rolesUpdated)
      {
        const selectedRols=this.bsModalRef.content.selectedRoles;
        this.adminService.updateUserRoles(user.username,selectedRols).subscribe({
          next:roles=>user.roles=roles
        })
      }
    }
  })
}
}
