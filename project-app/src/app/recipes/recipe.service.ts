import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://lh3.googleusercontent.com/WePLa6gulCpK4DZzCUmxFL9dscR7VCnuf4LMfgugFH-uh65q9QGvMKXAlPbw1mA0S5Yrc1SeqRrvbEVvlRKRcpwlOuVN_0PwNieBaE0=w600-l68',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burguer',
      'What else do you need to say?',
      'https://www.thesun.co.uk/wp-content/uploads/2017/04/nintchdbpict000317625990.jpg?strip=all&w=444',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngridientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}