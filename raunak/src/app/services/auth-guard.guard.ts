import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

 
{
  let router = inject(Router);
  console.log(localStorage.getItem('isLoggedIn'))
  var isLoggedIn = localStorage.getItem('isLoggedIn');

  console.log(isLoggedIn,'isLoggedIn');

  if(!isLoggedIn || isLoggedIn === 'false'){
    alert("Please Login First");
    router.navigate(['']);
    localStorage.clear();
    return false;
  }
  else{
    return true;
  }


}

}
