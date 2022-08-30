import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { BooksComponent } from './components/books/books.component';
import { CreatebooksComponent } from './components/createbooks/createbooks.component';
import { BuyComponent } from './components/buy/buy.component';


import { ListBookingsComponent } from './components/list-bookings/list-bookings.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListFeedbacksComponent } from './components/list-feedbacks/list-feedbacks.component';
import { BookingsPerUsersComponent } from './components/bookings-per-users/bookings-per-users.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  /* Initial Component to load */
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  /* Initial Component to load */

  /* Dashboard Components */
    { path: 'dashboard', component: DashboardComponent},
  /* Dashboard Components */  

  /* Books Components */
    { path: 'listBook', component: BooksComponent,canActivate:[AuthGuard] },
  /* Books Components */

  /* Books Components */
    { path: 'listBookings', component: ListBookingsComponent,canActivate:[AuthGuard] },
    { path: 'Bookings/:id', component: BookingsPerUsersComponent,canActivate:[AuthGuard] },
    { path: 'buy/:id', component: BuyComponent,canActivate:[AuthGuard] },
    { path: 'listUsers', component: ListUsersComponent ,canActivate:[AuthGuard]},
    { path: 'createFeedback', component: CreatebooksComponent ,canActivate:[AuthGuard]},
    { path: 'feedbacks', component: ListFeedbacksComponent ,canActivate:[AuthGuard]},
  /* Books Components */



  /* Page Not Found Components */
    { path: '**', component: PagenotfoundComponent ,canActivate:[AuthGuard]},
  /* Page Not Found Components */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
