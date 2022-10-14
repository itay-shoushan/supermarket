import { Router } from "@angular/router";

export function unAuthError(route: Router){
    alert("unauthorized, please sign in");
    localStorage.clear();
    route.navigate(["home"]);
}