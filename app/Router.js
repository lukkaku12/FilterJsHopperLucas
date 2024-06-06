import { privateLayout } from "./Layouts/PrivateLayout";
import { routes } from "./routes";

export function Router() {
    const path = window.location.pathname;
// i save the API that contains the data of the url
    const publicRouteFound = routes.public.find((route) => route.path === path);
    const privateRouteFound = routes.private.find((route) => route.path === path);
// it will find wether public or private, depending on where the user's path is at.

    if (publicRouteFound) {
        //since it is public, the requirements said to not include a layout, shall be as per your request then!
        publicRouteFound.component();
    } else if (privateRouteFound) {
        //if the private route is found it will show a premade layout, linking with the scenes you will find throughout the project
        if (localStorage.getItem('token')) {
            const {$pageContent, logic} = privateRouteFound.component();
            privateLayout($pageContent, logic)
        }
        
    } else {
        // if not found in any array of the routes, it will show the not-found route.
        navigateTo('/not-found')
    }
};

export function navigateTo(path) {
    //the history API allows us to change from one window into another, after it will check in which route the user is at so it display the components accordingly.
    window.history.pushState({}, '', window.location.origin + path);
    Router()
}