import { CommonModule } from '@angular/common';
import { Component, input} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ScrollerModule } from 'primeng/scroller';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ScrollerModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent{
  recipeForm:FormGroup=new FormGroup({
    id:new FormControl(0),
    name:new FormControl("",),
    categoryId:new FormControl(0,[Validators.required]),
    preparationTimeInMinutes:new FormControl(0,),
    difficultyLevel:new FormControl(0,),
    dateAdded:new FormControl( new Date(2000, 0, 1),),
    ingredients:new FormControl([],),
    preparationMethod:new FormControl("",),
    userId:new FormControl(0,),
    image:new FormControl("")
  });
inputValue: any;
items: any;
  constructor(private _recipeService:RecipeService, private route:Router) {
  }
  ingredients: string[] = [""];
  public categories: { id: number, name: string }[] = [
    { id: 1, name: 'Cakes' },
    { id: 2, name: 'Cookies' },
    { id: 3, name: 'First Dishes' },
    { id: 4, name: 'Last Dishes' },
    { id: 5, name: 'Miscellaneous' },
    { id: 6, name: 'Toppings' },
    { id: 7, name: 'Pies' }
  ];
  categoryName!:string
  icon: string = '3';
  userId!: number
  recipe:Recipe={
    id:0,
    name:"",
    categoryId:0,
    preparationTimeInMinutes:0,
    difficultyLevel:0,
    dateAdded: new Date(2000, 0, 1),
    ingredients:[],
    preparationMethod:"",
    userId:0,
    image:""
  }
  onInputChange(i:number,con:string) {
    this.recipe.ingredients[i]=con;
    if(this.recipe.ingredients[i].length==1||i==this.ingredients.length-1)
    this.ingredients.push("")

  }
  onTextAreaChange(con:string){
    this.recipe.preparationMethod=con
    console.log(this.icon)
  }
  saveRecipe(){
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const id = user.id;
      this.recipe.userId=id}
    
  this.recipe.dateAdded=new Date()
  this.recipe.image="../../assets/"+this.icon+".png";
  const category = this.categories.find(category => category.name === this.categoryName);
  if(category){
    this.recipe.categoryId=category.id
  }
  // console.log("form",this.recipeForm.value,this.recipeForm.invalid)
  if(this.recipeForm,this.recipeForm.value,this.recipeForm.invalid){
    Swal.fire("חובה למלא את כל השדות");
    console.log("b")
  }  
  else{
  this._recipeService.addRecipe(this.recipe).subscribe({
      next: (res) => {
        console.log('Response:', res);
        console.log("x")
       Swal.fire({
         title: "Good job!",
         text: "!המתכון נשמר בהצלחה",
         icon: "success",
         customClass: {
           icon: 'custom-icon-color' 
         }
       });
       this.route.navigate(['']);
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
  }
  }
  cancel(){
    this.route.navigate(['/allrecipes']);
  }
}