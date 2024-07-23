
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../_services/member.service';
import { ActivatedRoute} from '@angular/router';
import { Member } from '../../_models/member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule,GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{

private memberService=inject(MemberService);
private route=inject(ActivatedRoute);
member?:Member;
images:GalleryItem[]=[];


ngOnInit(): void {
  this.loadMember()
}

loadMember(): void {
  const username = this.route.snapshot.paramMap.get('username');
  if (!username) return;

   this.memberService.getMember(username).subscribe({
    next: member => {
      this.member = member;
      if (member.photos && Array.isArray(member.photos)) {
        member.photos.forEach(p => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });
      }
    },
    error: err => {
      console.error('Error loading member:', err);
      
    }
  });
}

}

