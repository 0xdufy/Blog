import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent {
  subService: SubscribersService = inject(SubscribersService);
  showError: boolean;
  showMessage: boolean = false;

  onSubmit(form: any) {
    const subData: Sub = {
      name: form.name,
      email: form.email
    }
    this.subService.checkSubs(form.email).subscribe(val => {
      console.log(val)
      if(val.empty){
        this.showMessage = true
        this.subService.addSub(subData);
      }
      else{
        this.showError = true;
      }
    })
  }
}
