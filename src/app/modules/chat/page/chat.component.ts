import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from 'src/app/core/services/web-socket.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Chat } from 'src/app/core/models/chat';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { APIResponse } from 'src/app/core/models/api-response';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatArray = [];
  chatForm: FormGroup;
  loadedAllChats = false;
  
  @ViewChild(PerfectScrollbarComponent, {static: false}) componentRef?: PerfectScrollbarComponent;
  @ViewChild('scrollMe', {read: ElementRef, static: false}) scrollDiv: ElementRef;
  @ViewChild('searchInput', {read: ElementRef, static: false}) searchInput: ElementRef;

  // keyboard listener for "Enter"
  // @HostListener('document:keypress', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   console.log(this.chatForm);

  //   if (event.key === 'Enter') {
  //       this.sendMessage();
  //   }
  // }


  constructor(
    private chatService: ChatService,
    private webSocketService: WebSocketService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.webSocketService.newMessageReceived().subscribe(data => {
      this.chatArray.push(data);
      console.log(this.chatArray);
      // this.isTyping = false;

      setTimeout(() => {
        this.scrollToBottom(this.scrollDiv.nativeElement.scrollHeight);
      });

      
    });
  }

  /**
   * Instantiate the chat form
   * @return        void
   * @author        Babie Entoma
   */
  private createForm() {
    this.chatForm = this.fb.group({
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.populateChat();
    this.createForm();
  }

  populateChat() {
    this.chatService.getAllChats().subscribe(
      (res: APIResponse) => {
        if (res.success) {
          this.chatArray = res.data;
          setTimeout(() => {
            this.scrollToBottom(this.scrollDiv.nativeElement.scrollHeight);
          });
        }
        this.loadedAllChats = true;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          alert('An error occurred: ' + err.error.message);
        } else {
          alert(`Backend returned code ${err.status} body was: ${err.error}`);

          this.router.navigate(['/login']);
        }
     }
   );
  }

/**
   * Scroll the page based on the scroll height
   * @param         yScrollHeight - height
   * @return        none
   */
  scrollToBottom(yScrollHeight: number) {
    this.componentRef.directiveRef.scrollTo(0, yScrollHeight, 500);
  }

  sendMessage() {
    const message = this.chatForm.value.message;

    if (this.chatForm.valid && message.trim() !== '') {
      const chat: Chat = {
        user: localStorage.getItem('user_id'),
        message: this.chatForm.value.message.trimLeft(),
        timestamp: new Date(),
        dis: true
      };
  
      this.webSocketService.sendMessage(chat);
    } 

    this.chatForm.patchValue({message: ''});
  }

  typing() {
    this.webSocketService.typing({user: this.userService.getLoggedInUser().username});
  }

}
