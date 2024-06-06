import { Dashboard } from "./Scenes/Dashboard/Dashboard";
import { CreateFlights } from "./Scenes/Dashboard/create/CreateFlights";
import { deleteFlights } from "./Scenes/Dashboard/delete/deleteFlights";
import { EditFlights } from "./Scenes/Dashboard/edit/EditFlights";
import { Login } from "./Scenes/login/login";
import { NotFound } from "./Scenes/notFound/notFound";
import { Register } from "./Scenes/register/register";

export const routes = {
    public:[
        {path: '/login', component: Login},
        {path: '/register', component: Register},
        {path: '/not-found', component: NotFound}

    ],
    private:[
        {path: '/dashboard', component: Dashboard},
        {path: '/dashboard/flights/create', component: CreateFlights},
        {path: '/dashboard/flights/edit', component: EditFlights},
        {path:'/dashboard/flights/delete', component: deleteFlights}
        // {path: '/dashboard/flights/create', component: CreateFlights},



    ]
}