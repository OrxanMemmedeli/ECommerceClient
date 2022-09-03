import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() options: Partial<FileUploadOptions>;

  constructor(
    private httpClientService: HttpClientService,
    private alertify: AlertifyService,
    private customToastr: CustomToastrService
  ) { }

  public files: NgxFileDropEntry[];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileDatas: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileDatas.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, fileDatas).subscribe(data => {
      const messageText = "Fayllar yuklendi";
      if (this.options.isAdminPage) {
        this.alertify.message(messageText, {
          messageType: MessageType.success,
          position: Position.TopCenter
        })
      } else {
        this.customToastr.message(messageText, "Ugurlu Emeliyat", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter
        })
      }
    }, (errorResponse: HttpErrorResponse) => {
      const messageText = "Fayllar yuklenmedi";
      if (this.options.isAdminPage) {
        this.alertify.message(messageText, {
          messageType: MessageType.error,
          position: Position.TopCenter
        })
      } else {
        this.customToastr.message(messageText, "Xeta bas verdi", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter
        })
      }
    });


    // for (const droppedFile of files) {

    //   // Is it a file?
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((file: File) => {

    //       // Here you can access the real file
    //       console.log(droppedFile.relativePath, file);

    //       /**
    //       // You could upload it like this:
    //       const formData = new FormData()
    //       formData.append('logo', file, relativePath)

    //       // Headers
    //       const headers = new HttpHeaders({
    //         'security-token': 'mytoken'
    //       })

    //       this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
    //       .subscribe(data => {
    //         // Sanitized logo returned from backend
    //       })
    //       **/

    //     });
    //   } else {
    //     // It was a directory (empty directories are added, otherwise only files)
    //     const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    //     console.log(droppedFile.relativePath, fileEntry);
    //   }
    // }
  }


  public fileOver(event): void {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}