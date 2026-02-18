import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private AngularFirestoreService: AngularFirestore,
    private toastrService: ToastrService
  ) {}

  saveData(categoryData: Category) {
    this.AngularFirestoreService.collection('categories')
      .add(categoryData)
      .then((docRef) => {
        this.toastrService.success('Data Inserted Successfully');
      })
      .catch((err) => console.log(err));
  }

  loadData() {
    return this.AngularFirestoreService.collection('categories')
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  updateData(id: string, editData: string) {
    this.AngularFirestoreService.collection('categories')
      .doc(id)
      .update(editData)
      .then((docRef) => {
        this.toastrService.success('Data Updated Successfully');
      })
      .catch((err) => console.log(err));
  }

  deleteData(id: string) {
    this.AngularFirestoreService.collection('categories')
      .doc(id)
      .delete()
      .then((docRef) => {
        this.toastrService.success('Data Deleted Successfully');
      })
      .catch((err) => console.log(err));
  }
}
