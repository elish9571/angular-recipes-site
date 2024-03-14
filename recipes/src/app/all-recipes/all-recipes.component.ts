import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [CommonModule, SmallRecipeComponent],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent {
  recipes!: Recipe[];
  constructor(private _recipesservice: RecipeService) { }

  ngOnInit() {
    this._recipesservice.getRecipes().subscribe({
      next: (res) => {
        this.recipes = res.slice(0, 12);
      },
      error: (err) => {
        console.log('error: ', err);
      }
    });
  }
}
