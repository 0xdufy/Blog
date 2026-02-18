import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css',
})
export class SingleCategoryComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  postService: PostsService = inject(PostsService);
  postsArray!: Array<Object>;
  categoryName!: string | null;

  ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      this.postService.loadCategoryPost(data.get('id')).subscribe((posts) => {
        this.postsArray = posts;
        console.log(this.postsArray);
      });
      this.categoryName = data.get('category');
    });
  }
}
