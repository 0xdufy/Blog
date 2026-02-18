import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private ngFirestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  savePost(post: Post) {
    this.ngFirestore
      .collection('posts')
      .add(post)
      .then((docRef) => {
        this.toastr.success('Data Inserted Successfully');
      })
      .catch((err) => console.log(err));
  }

  loadPosts() {
    return this.ngFirestore
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((response) => {
          return response.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadAPost(id: any) {
    console.log('load post');
    return this.ngFirestore.collection('posts').doc(id).valueChanges();
  }

  updatePost(id: any, post: Post) {
    this.ngFirestore
      .collection('posts')
      .doc(id)
      .update(post)
      .then(() => {
        this.toastr.success('Data Updated Successfully');
      });
  }

  deletePost(id: any) {
    this.ngFirestore
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        this.toastr.warning('Data Deleted Successfully');
      });
  }

  updateFeatured(id: any, featured: boolean) {
    this.ngFirestore.collection('posts').doc(id).update({
      isFeatured: featured,
    }).then(() => {
      this.toastr.info('Featured Status Updated');
    });
  }
}
