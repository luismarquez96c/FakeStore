import { Component, OnDestroy, OnInit } from '@angular/core';

import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach( item => item.unsubscribe() );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.storeService.myCart$.subscribe(products => this.counter = products.length)
    );

    this.subscriptions.push(
      this.authService.user$.subscribe( user => this.profile = user)
    );

    this.getAllCategories();
  }

  getAllCategories(){
    this.categoriesService.getAll()
    .subscribe( categories => {
      this.categories = categories;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('john@mail.com', 'changeme')
    .subscribe(user => {
      this.router.navigate(['/profile']);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
