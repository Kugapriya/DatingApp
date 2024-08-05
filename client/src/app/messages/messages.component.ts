import { TimeagoPipe, TimeagoModule } from 'ngx-timeago';


import { Component, inject, Input, OnInit } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from '../_services/message.service';
import { Message } from '../_models/message';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { previousDate } from 'ngx-bootstrap/datepicker/bs-datepicker.component';




@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ButtonsModule,FormsModule,TimeagoModule,RouterLink,PaginationModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit{

  messageService=inject(MessageService);
  container="Inbox";
  pageNumber=1;
  pageSize=5;
  isOutbox=this.container==='Outbox'
  ngOnInit(): void {
    this.loadMessages();
  }
    loadMessages()
    {
this.messageService.getMessages(this.pageNumber,this.pageSize,this.container);

    }
    pageChanged(event:any)
    {
      if(this.pageNumber!=event.page)
      {
        this.pageNumber=event.page;
        this.loadMessages();
      }
    }

    getRoute(message:Message)
    {
if(this.container==='Outbox') return `/members/${message.recipientUserName}`;
else return `/members/${message.senderUsername}`;
    }

    deleteMessage(id:number)
    {
      this.messageService.deleteMessage(id).subscribe({
        next:_=>{
          this.messageService.paginatedResult.update(prev=>{
            if(prev && prev.items)
            {
              prev.items.splice(prev.items.findIndex(m=>m.id===id),1);
              return prev;
            }
            return prev;
          })
        }
      })
    }
  }
