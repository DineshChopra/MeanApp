import { Injectable, EventEmitter, Output } from '@angular/core';
import { Error } from './error.model';

@Injectable()
export class ErrorService {
    errorOccurred : EventEmitter<Error> = new EventEmitter();
    handleError(error: any) {
        const errorData = new Error(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    }
}