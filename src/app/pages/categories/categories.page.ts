import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../interfaces/category.interface";
import { InterestService } from "src/app/services/interest.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  categories: Observable<Category[]>;

  constructor(
    private categoriesServices: CategoryService,
    private interestService: InterestService
  ) {}

  async ngOnInit() {
    const interests: number[] = (await this.interestService.get()) ?? [];
    this.categoriesServices.getCategories().subscribe((categories) => {
      this.categories = !interests.length
        ? of(categories)
        : of(categories.filter((category) => interests.includes(category.id)));
    });
  }
}
