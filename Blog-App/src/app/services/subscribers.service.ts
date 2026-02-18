import { inject, Injectable } from '@angular/core';
import { Sub } from '../models/sub';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  firestore: AngularFirestore = inject(AngularFirestore);
  toastr: ToastrService = inject(ToastrService);

  addSub(subs: Sub) {
    this.firestore
      .collection('subscribers')
      .add(subs)
      .then(() => {
        this.toastr.success("You subscribe successfully");
        console.log('Done');
      });
  }
  checkSubs(email: string) {
    return this.firestore
      .collection('subscribers', (ref) => ref.where('email', '==', email))
      .get();
  }
}
