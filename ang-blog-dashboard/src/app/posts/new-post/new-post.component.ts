import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { ImageService } from '../../services/image.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  permalink: string = '';
  imgSrc: any = '/assets/placeholder-image.jpg';
  selectedImg: any;
  categories: any;
  postForm!: FormGroup;
  displayLoading: boolean = false;
  router: Router = inject(Router);
  newOrEdit: boolean = true;
  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  selectedId!: string | null;
  selectedPost!: any;

  constructor(
    private categoryServices: CategoriesService,
    private imageService: ImageService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.categoryServices.loadData().subscribe((val) => {
      this.categories = val;
    });

    this.activateRoute.queryParamMap.subscribe((resp) => {
      this.selectedId = resp.get('id');
      if (
        this.selectedId == undefined ||
        this.selectedId == '' ||
        this.selectedId == null
      ) {
        return;
      } else {
        this.newOrEdit = false;
        this.loadSelectedPost();
      }
    });

    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      permalink: new FormControl({ value: null, disabled: true }),
      excerpt: new FormControl(null, [
        Validators.required,
        Validators.minLength(50),
      ]),
      category: new FormControl(null, Validators.required),
      postImg: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  loadSelectedPost() {
    this.displayLoading = true;
    this.postService.loadAPost(this.selectedId).subscribe((resp) => {
      this.selectedPost = resp;
      console.log(this.selectedPost);
      this.postForm.patchValue({
        title: this.selectedPost.title,
        permalink: this.selectedPost.permalink,
        excerpt: this.selectedPost.excerpt,
        category: `${this.selectedPost.category.categoryId}-${this.selectedPost.category.categoryName}`,
        content: this.selectedPost.content,
      });
      this.imgSrc = this.selectedPost.postImgPath;
      this.displayLoading = false;
    });
  }

  onTitleChanged(title: any) {
    let value: string = title.target.value;
    this.permalink = value.replace(/\s/g, '-');
  }

  showPreview(data: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL(data.target.files[0]);
    this.selectedImg = data.target.files[0];
  }

  onSubmit() {
    this.displayLoading = true;
    this.imageService.uploadImage(this.selectedImg).subscribe({
      next: (response) => {
        let imagePath: string = response.data.url;
        if (this.newOrEdit) {
          this.postService.savePost(this.savePostData(imagePath));
        } else {
          this.postService.updatePost(
            this.selectedId,
            this.savePostData(imagePath)
          );
        }
        this.imgSrc = '/assets/placeholder-image.jpg';
        this.postForm.reset();
        this.displayLoading = false;
        this.permalink = '';
        this.router.navigate(['posts']);
      },
      error: (err) => {
        console.log(err);
        this.displayLoading = false;
      },
    });
  }

  savePostData(imagePath: string) {
    const category = this.postForm.value.category.split('-');
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.permalink,
      excerpt: this.postForm.value.excerpt,
      category: {
        categoryId: category[0],
        categoryName: category[1],
      },
      postImgPath: imagePath,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    return postData;
  }
}
