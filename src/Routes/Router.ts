import { Router } from 'express';
import UserController from '../Controllers/UserController';
import SearchController from '../Controllers/SearchController';



export const router = Router();
//User Controller routes
router.get('/user',UserController.ListUsers);
router.get('/user/:id',UserController.User );
router.post('/user',UserController.storeUser);
router.put('/user/:id',UserController.UpdateUser);
router.delete('/user/:id',UserController.DeleteUser);
router.patch('/user/:id',UserController.DeleteUserFromList);

//Search controller routes

router.get('/search',SearchController.searchImplement);