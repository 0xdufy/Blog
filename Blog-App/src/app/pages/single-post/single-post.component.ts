import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  postService: PostsService = inject(PostsService);
  post!: any;
  postsArray!: Array<Object>;

  ngOnInit() {
    this.route.paramMap.subscribe((val) => {
      this.postService.loadPost(val.get('id')).subscribe((postData) => {
        this.post = postData;
        // this.postService.countViews(val.get('id'));
        this.postService
          .loadSimilar(this.post.category.categoryId)
          .subscribe((val) => {
            this.postsArray = val;
          });
      });
    });
  }
}
