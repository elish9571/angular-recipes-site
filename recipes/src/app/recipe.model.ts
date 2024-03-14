export class Recipe {
    id!: number
    name!: string
    categoryId!: number
    preparationTimeInMinutes!: number
    difficultyLevel!: number
    dateAdded!: Date
    ingredients!: string[]
    preparationMethod!: string
    userId!: number
    image!: string;
}

