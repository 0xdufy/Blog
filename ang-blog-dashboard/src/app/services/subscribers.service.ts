import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  afs: AngularFirestore = inject(AngularFirestore);
  toastr: ToastrService = inject(ToastrService);

  loadSubs() {
    return this.afs
      .collection('subscribers')
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            let id = a.payload.doc.id;
            let data = a.payload.doc.data();
            return { id, data };
          });
        })
      );
  }
  deleteSub(id: any) {
    this.afs
      .collection('subscribers')
      .doc(id)
      .delete()
      .then(() => this.toastr.success('Subscriber deleted successfully'));
  }
}
