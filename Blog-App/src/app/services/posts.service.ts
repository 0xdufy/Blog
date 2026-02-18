import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

// import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  firestore: AngularFirestore = inject(AngularFirestore);

  loadFeatured() {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadLatest() {
    return this.firestore
      .collection('posts', (ref) => ref.orderBy('createdAt').limit(9))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadCategoryPost(categoryId: string | null) {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId)
      )
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadPost(id: any) {
    return this.firestore.collection('posts').doc(id).valueChanges();
  }

  loadSimilar(categoryId: any) {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(3)
      )
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            let data = a.payload.doc.data();
            let id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  countViews(id: any) {
    let post: any;
    this.loadPost(id).subscribe((val) => {
      post = val;
      const viewsCount = {
        views: post.views + 1,
      };
      this.firestore
        .collection('posts')
        .doc(id)
        .update(viewsCount)
        .then(() => console.log('Increment is done'))
        .catch(() => console.log("Error"))
    });
  }
}
