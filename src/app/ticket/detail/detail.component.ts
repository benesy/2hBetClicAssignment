import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
 
  user : User;
  users: User[];
  ticket : Ticket;
  validate = true;
  error = false;
  selectedUser : User;
  updating = false;

  constructor(private readonly backendService: BackendService,
    private route: ActivatedRoute)
    {
      this.backendService.users().subscribe(usr => this.users = usr);
     }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getDetail(id);
  }

  getDetail(id: number): void {
    this.backendService.ticket(id).subscribe(ticket => {
      if (ticket){
        this.backendService.user(ticket.assigneeId).subscribe(user => {
          this.user = user;
          this.selectedUser = this.user;
          this.ticket = ticket;
        });
      }
      else {
        this.error = true;
      }
    })
  }

  completeTicket(){
    this.validate = false;
    this.backendService.complete(this.ticket.id, !this.ticket.completed).subscribe(ticket => {
      this.ticket = ticket;
      this.validate = true;
    });
  }

  userChange(){
    this.updating = true;
    this.backendService.assign(this.ticket.id, this.selectedUser.id).subscribe(_ => this.updating = false);
  }

}
