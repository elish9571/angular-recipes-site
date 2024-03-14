import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://localhost:7070/api/Recipe';
  constructor(private http: HttpClient) { };

  getRecipeByName(name: string): Observable<Recipe> {
    console.log(name);
    return this.http.get<Recipe>(`${this.apiUrl}/${name}`)
  }
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}`);
  }
  addRecipe(recipe: Recipe): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(this.apiUrl, recipe)
  }
}
