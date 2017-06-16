import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, ResponseOptions } from '@angular/http';
import { Message } from './message.model';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ErrorService } from '../error/error.service';

@Injectable()
export class MessageService {

  private messages : Message[] = [];
  messageIsEdit = new EventEmitter<Message>();
  
  constructor(private http : Http, private errorService : ErrorService) { }

  private MESSAGE_URL = 'http://localhost:3010/api/message';

  addMessage(message : Message){
    const token = localStorage.getItem('token');
    const tokenParam = token ? '?token='+token : '';
    const URL = this.MESSAGE_URL+tokenParam;
    const body = JSON.stringify(message);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(URL, body, {headers : headers})
                .map((response : Response) => {
                    const result = response.json();
                    const message = new Message(result.obj.content, 
                                result.obj.user.firstName, 
                                result.obj._id, 
                                result.obj.user._id);
                    this.messages.push(message);
                  }
                  )
                .catch((error: Response) => {
                  console.log(error.json());
                  this.errorService.handleError(error.json());
                  return Observable.throw(error.json());
                });
  }
// : Observable<Message>
  getMessage() {
    for(let i=0; i< 100; i++){
      
    }
    return this.http.get(this.MESSAGE_URL)
            .map((response : Response) =>{
                const messages = response.json().obj;
                let transformedMessages : Message[] = [];
                for(let message of messages){
                  transformedMessages.push(new Message(message.content, 
                            message.user.firstName, 
                            message._id,  
                            message.user._id));
                }
                this.messages = transformedMessages;
                return transformedMessages;
              }
            )
            .catch((error : Response) => {
                console.dir(error);
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
              });
  }
  updateMessage(message : Message){
    let msg = this.messages.find((m : any)=>{
      if(message.messageId === m.messageId){
        m.content = message.content;
        return m;
      }
    });

    const token = localStorage.getItem('token');
    const tokenParam = token ? '?token='+token : '';
    const body = JSON.stringify(message);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const URL = this.MESSAGE_URL+'/'+message.messageId + tokenParam;
    return this.http.patch(URL, body, {headers : headers})
                .map((response : Response) => {
                    response.json()
                  })
                .catch((error : Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                  });
  }
  editMessage(message : Message){
    this.messageIsEdit.emit(message);
    // this.http.put
  }

  deleteMessage(message : Message){
    this.messages.splice(this.messages.indexOf(message), 1);
    const token = localStorage.getItem('token');
    const tokenParam = token ? '?token='+token : '';
    const URL = this.MESSAGE_URL+'/'+message.messageId + tokenParam;
    const body = JSON.stringify(message);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(URL)
                .map((response : Response) => {response.json()})
                .catch((error : Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                  });
  }
}
