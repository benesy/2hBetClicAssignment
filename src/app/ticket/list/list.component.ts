import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendService } from 'src/app/backend.service';
import { Ticket } from 'src/interfaces/ticket.interface';
import { User } from 'src/interfaces/user.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  search: string = "";
  users: User[] = [{id: 0, name: "All"}];
  selectedUser: User;
  public tickets$: Observable<Ticket[]> = this.backendService.tickets();
  public ticketsFiltered$: Observable<Ticket[]>;

  constructor(private readonly backendService: BackendService) {
    this.backendService.users().subscribe(usr => this.users = this.users.concat(usr));
    this.selectedUser = this.users[0];
   }

  ngOnInit(): void {
    this.update();
  }

  update() {
    let tmp =this.tickets$;
     if (this.search != "") {
       tmp = tmp.pipe(map(s => s.filter(ss => ss.description.includes(this.search))));
     }
     if (this.selectedUser && this.selectedUser.id != 0){
       tmp = tmp.pipe(map(s => s.filter(ss => ss.assigneeId === this.selectedUser.id)));
     }
     this.ticketsFiltered$ = tmp;
   }

}
