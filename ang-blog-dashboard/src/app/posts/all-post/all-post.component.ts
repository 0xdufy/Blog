import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css',
})
export class AllPostComponent {
  postService: PostService = inject(PostService);
  posts!: any;
  displayLoading: boolean = true;
  router: Router = inject(Router);

  ngOnInit() {
    this.postService.loadPosts().subscribe((val) => {
      this.posts = val;
      this.displayLoading = false;
    });
  }

  onEdit(id: string) {
    this.router.navigate(['posts/new'], { queryParams: { id: id } });
  }

  onDelete(id: any) {
    this.postService.deletePost(id);
  }

  onFeatured(id: any, isFeatured: boolean) {
    this.postService.updateFeatured(id, isFeatured);
  }
}
