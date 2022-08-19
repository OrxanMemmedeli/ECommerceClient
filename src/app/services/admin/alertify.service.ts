import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions> ){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    alertify[options.messageType](message);
  }
}

export enum MessageType{
  error = "error",
  message = "message",
  notify = "notify",
  success = "success",
  warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.message;
  position: Position = Position.TopRight;
  delay: number = 3;
}
