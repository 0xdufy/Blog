import { Component, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  postsService: PostsService = inject(PostsService);
  featuredPosts!: Array<Object>;
  latestPost!: Array<Object>;

  ngOnInit() {
    this.postsService.loadFeatured().subscribe(posts => {
      this.featuredPosts = posts;
    });
    this.postsService.loadLatest().subscribe(latest => {
      this.latestPost = latest;
    })
  }
}
