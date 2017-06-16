import { Component, OnInit, Input, Output } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService : MessageService) { }

  ngOnInit() {
  }
  @Input() message : Message;
  onEdit(){
    this.messageService.editMessage(this.message);
    console.log('message is editing');
  }
  onDelete(){
    this.messageService.deleteMessage(this.message)
        .subscribe(
          (response) => {console.log('Message is deleted');},
          (err) => {console.error(err);}
        );
  }
  belongsToUser(){
    return localStorage.getItem('userId') == this.message.userId;
  }
}
