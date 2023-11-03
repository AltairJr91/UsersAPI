import { Request, Response } from "express";
import { prisma } from "../Database/DataBase";


class UserController {
    public async storeUser(req: Request, res: Response): Promise<Response> {
        try {
            const { email, name, phone } = req.body;

            const userAlreadyExist = await prisma.user.findFirst({ where: { email } });
            if (userAlreadyExist) {
                return res.status(404).json({ message: "User already exists" });
            }

            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    phone,
                    created_at: new Date(Date.now())
                }
            }
            )
            return res.status(201).json({message:"User created", user});

        } catch (error) {
            return res.status(400).json({ message: "user cannot be created" });
        }
    };


    public async User(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await prisma.user.findFirst({ where: { id } });

            if (!user) {
                return res.status(404).json({ message: "User not exist" });
            }

            return res.status(200).json({message:"Selected user", user});
        } catch (error) {
            return res.status(404).json({ message: "Cannot find user" });
        }

    };

    public async ListUsers(req: Request, res: Response): Promise<Response> {
        try {
            const user = await prisma.user.findMany({
                where: { deleted_at: null },
            });

            if (!user.length) {
                return res.status(404).json({ message: "Nothing found" });
            }

            return res.status(200).json({message:"List of users", user});
        } catch (error) {
            return res.status(500).json({ message: "Internal Error" });
        }


    };

    public async UpdateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const { email, name, phone } = req.body;
            const UpdateUser = await prisma.user.update({
                where: { id: id },
                data: {
                    email,
                    name,
                    phone,
                    updated_at: new Date(Date.now())
                }
            })
            return res.status(200).json({message:"User upadated with success", UpdateUser})
        } catch (error) {
            return res.status(404).json({ message: "Cannot update user" });
        }

    };

    public async DeleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deleteUser = await prisma.user.delete({ where: { id: id } })
            return res.status(200).json({ message: "User deleted", name: deleteUser.name })
        } catch (error) {
            return res.status(404).json({ message: "Cannot delete user" });
        }

    };

    public async DeleteUserFromList(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: {
                    deleted_at: new Date()
                }
            });

            return res.status(200).json({ message: "User marked as deleted", user: updatedUser });

        } catch (error) {

            return res.status(500).json({ message: "An error occurred while trying to mark the user as deleted" });
        }
    };
};

export default new UserController;