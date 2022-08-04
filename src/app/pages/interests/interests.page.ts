import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/interfaces/category.interface";
import { InterestService } from "src/app/services/interest.service";
import { Interest } from "../../interfaces/interest.interface";
import { CategoryService } from "../../services/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-interests",
  templateUrl: "./interests.page.html",
  styleUrls: ["./interests.page.scss"],
})
export class InterestsPage implements OnInit {
  public categories: Observable<Category[]>;

  public interests: Interest[] = [];

  constructor(
    private categoryService: CategoryService,
    private interestService: InterestService,
    private route: Router,
  ) {}

  async ngOnInit() {
    const interests: number[] = (await this.interestService.get()) ?? [];

    this.categoryService.getCategories().subscribe((categories) => {
      this.interests = categories.map((category) => ({
        id: category.id,
        label: category.name,
        checked: interests.includes(category.id),
      }));
    });
  }

  async save() {
    const interests = this.interests
      .filter((interest) => interest.checked)
      .map((interest) => interest.id);
    this.interestService.store(interests);
    this.route.navigate(["/"]);
  }
}
