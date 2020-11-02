import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  ticket : Ticket = {id: -1, assigneeId: -1, description: "", completed : false};
  users: User[];
  user : FormControl; 
  ticketDescription =  new FormControl('');
  validate = true;

  constructor(private readonly backendService: BackendService) { 
    this.backendService.users().subscribe(usr => this.users = usr);
    this.user = new FormControl(this.users);
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.validate = false;
    this.ticket.description = this.ticketDescription.value;
    this.backendService.newTicket(this.ticket).subscribe(
      ticket => {
      this.backendService.assign(ticket.id, this.user.value.id).subscribe( _ => this.validate = true)
    });
  }
}
