import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    return this.httpClient.put('https://rorra-udemy-ng-http.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        observe: 'body'
      }
    );
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://rorra-udemy-ng-http.firebaseio.com/recipes.json')
      .pipe(map((recipes) => {
        for (const recipe of recipes) {
          if (recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return (recipes);
      })).subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
