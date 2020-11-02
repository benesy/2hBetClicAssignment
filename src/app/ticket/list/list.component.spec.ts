import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BackendService } from 'src/app/backend.service';
import { Ticket } from 'src/interfaces/ticket.interface';

import { ListComponent } from './list.component';

const back = {
  tickets() {
    return of(
      [
        {
            id: 0,
            completed: false,
            assigneeId: 111,
            description: 'Install a monitor arm'
        },
        {
            id: 1,
            completed: false,
            assigneeId: 111,
            description: 'Move the desk to the new location'
        }
    ]);
  }
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let backService: BackendService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [BackendService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    backService = new BackendService();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('sould not filter', () =>{
  //   component.tickets$ = backService.tickets();
  //   component.update();
  //   let result: Ticket[];
  //   component.ticketsFiltered$.subscribe(s => result = s);
  //   expect(result.length).toBe(2);
  // })
});
