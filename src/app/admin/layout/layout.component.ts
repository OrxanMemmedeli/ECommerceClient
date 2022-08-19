import { Component, OnInit } from '@angular/core';
import { AlertifyOptions, AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.getalertify("1",{messageType: MessageType.success, delay: 5, position: Position.TopCenter});
    this.getalertify("2",{messageType: MessageType.error, position: Position.TopLeft});
  }

  getalertify(message: string, options: Partial<AlertifyOptions>){
    this.alertifyService.message(message,options);
  }
}
