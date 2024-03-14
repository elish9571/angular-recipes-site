import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent) },
    { path: 'allrecipes', loadComponent: () => import('./all-recipes/all-recipes.component').then(c => c.AllRecipesComponent) },
    { path: 'smallrecipe', loadComponent: () => import('./small-recipe/small-recipe.component').then(c => c.SmallRecipeComponent) },
    { path: 'addrecipes', loadComponent: () => import('./add-recipe/add-recipe.component').then(c => c.AddRecipeComponent) }
];
