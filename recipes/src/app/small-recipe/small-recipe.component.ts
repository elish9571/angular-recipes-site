import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-small-recipe',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    MatCardActions
  ],
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
})
export class SmallRecipeComponent {
  public layout: string = 'list';
  public recipe: Recipe = {
    id: 0,
    name: "",
    categoryId: 0,
    preparationTimeInMinutes: 0,
    difficultyLevel: 0,
    dateAdded: new Date,
    ingredients: [],
    preparationMethod: "",
    userId: 0,
    image: ""
  };
  @Input()
  public recipeName!: string;
isMoreDetails:boolean=false;
  constructor(private _recipeService: RecipeService) { }

  ngOnInit(): void {
    this._recipeService.getRecipeByName(this.recipeName).subscribe({
      next: (res) => {
        this.recipe = res;
        console.log(this.recipe);
      },
      error: (err) => {
        console.log('error: ', err);
      }
    })
  }

  showToMoreDetails()
  {
    if(sessionStorage.getItem("user"))
   {
    this.isMoreDetails=true;
   } 
   else{
    alert("כדי לראות את הפרטים עליך לבצע התחברות לאתר")
   }
  }
}
