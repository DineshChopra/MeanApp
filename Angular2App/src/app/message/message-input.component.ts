import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';
@Component({
    selector : 'app-message-input',
    templateUrl : './message-input.component.html'
})
export class MessageInputComponent implements OnInit{
    message : Message;
    constructor(private messageService : MessageService){
    }
    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message : Message) => this.message = message
        );
    }
    onSubmit(form : NgForm){
        if(this.message){
            // Edit existing message
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                    .subscribe(
                        result => console.log(result)
                    )
            this.message = null;
        }else{
            // create new message
            const content = form.value.content;
            const message = new Message(content, 'Ram');
            this.messageService.addMessage(message).subscribe(
                (response) =>{},
                (err) => {
                    //console.dir(err);
                }
            );
        }
        form.resetForm();
    }

    onClear(form : NgForm){
        this.message = null;
        form.resetForm();
    }
}