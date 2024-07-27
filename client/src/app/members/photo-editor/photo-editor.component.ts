import { Photo } from './../../_models/photo';
import { AccountService } from './../../_services/account.service';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Member } from './../../_models/member';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf,NgFor,NgStyle,NgClass,FileUploadModule,DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{

  private accountService=inject(AccountService);
  private memberService=inject(MemberService)
  member=input.required<Member>();
  uploader?:FileUploader;
  hasBaseDropZoneOver=false;
  baseUrl=environment.apiUrl;
  memberChange=output<Member>();

  ngOnInit(): void
  {
    this.initalizeUploader();
  }

  fileOverBase(e:any)
  {
    this.hasBaseDropZoneOver=e;
  }

  setMainPhoto(photo:Photo)
  {
    this.memberService.setMainPhoto(photo).subscribe({
      next:_=>{
        const user=this.accountService.currentUser();
        if(user)
          {
          user.photoUrl=photo.url;
          this.accountService.setCurrentUser(user)
        }
        const updatedMember={...this.member()}
        updatedMember.photoUrl=photo.url;
        updatedMember.photos.forEach(p=>{
          if(p.isMain) p.isMain = false;
          if(p.id===photo.id) p.isMain=true;
        });
        this.memberChange.emit(updatedMember);
      }
    })
  }

  initalizeUploader()
  {
    this.uploader=new FileUploader({
      url:this.baseUrl+'users/add-photo',
      authToken:'Bearer '+this.accountService.currentUser()?.token,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024,

    });
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false
    }
    this.uploader.onSuccessItem=(item,response,status,headers)=>{
      const photo=JSON.parse(response);
      const updateMember={...this.member()}
      updateMember.photos.push(photo);
      this.memberChange.emit(updateMember);

    }
  }

deletePhoto(photo:Photo)
{
  this.memberService.deletePhoto(photo).subscribe({
    next:_=>{
      const updatedMember={...this.member()};
      updatedMember.photos=updatedMember.photos.filter(x=>x.id!==photo.id);
      this.memberChange.emit(updatedMember);
      }
    })
  }
}
