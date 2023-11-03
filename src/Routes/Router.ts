import { Router } from 'express';
import UserController from '../Controllers/UserController';



export const router = Router();

router.get('/user',UserController.ListUsers);
router.get('/user/:id',UserController.User );
router.post('/user',UserController.storeUser);
router.put('/user/:id',UserController.UpdateUser);
router.delete('/user/:id',UserController.DeleteUser);
router.patch('/user/:id',UserController.DeleteUserFromList);
