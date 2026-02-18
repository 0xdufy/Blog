import { Component, inject } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css',
})
export class SubscribersComponent {
  subService: SubscribersService = inject(SubscribersService);
  subs: any;
  displayLoading: boolean = true;

  ngOnInit() {
    this.subService.loadSubs().subscribe((val) => {
      this.subs = val;
      this.displayLoading = false;
    });
  }

  onDelete(id: any) {
    this.subService.deleteSub(id);
  }
}
