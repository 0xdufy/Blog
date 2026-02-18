import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent {
  categoriesService: CategoriesService = inject(CategoriesService);
  categories!: any[];

  ngOnInit() {
    this.categoriesService.loadCategories().subscribe((cate) => {
      this.categories = cate;
    });
  }
}
