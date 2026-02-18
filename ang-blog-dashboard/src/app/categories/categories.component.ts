import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categoryData!: any;
  formCategory: any;
  formStatus: string = 'New';
  categoryId!: string;

  constructor(private categoriesServices: CategoriesService) {}

  ngOnInit() {
    this.categoriesServices.loadData().subscribe(val => {
      this.categoryData = val;
    })
  }

  onSubmit(categoryForm: NgForm) {
    if(this.formStatus == 'New')
      this.categoriesServices.saveData(categoryForm.value);
    else if(this.formStatus == 'Edit') {
      this.categoriesServices.updateData(this.categoryId, categoryForm.value);
      this.formStatus = 'New';
    }
    categoryForm.reset();
  }

  onEdit(categoryName: string, id: string) {
    this.formStatus = 'Edit';
    this.categoryId = id;
    this.formCategory = categoryName;
  }

  onDelete(id: string) {
    this.categoriesServices.deleteData(id);
  }

}
