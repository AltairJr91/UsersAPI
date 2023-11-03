import e, { Request, Response } from "express";
import { prisma } from "../Database/DataBase";



class Searchmethods {
    public async searchImplement(req: Request, res: Response): Promise<void> {
        try {
            const { searchName, startDate, endDate } = req.body;

            if (searchName) {
                const searchReturn = await prisma.user.findMany({ where: { name: searchName } });
                if (searchReturn.length > 0) {
                    res.status(200).json({ message: "Search returned", searchName: searchReturn });
                    return;
                }
            }
            
            if (startDate && endDate) {
                const searchDate = await prisma.user.findMany({
                    where: {
                        created_at: {
                            lte: endDate,
                            gte: startDate,
                        },
                    },
                });

                if (searchDate.length > 0) {
                    res.status(200).json({ message: "Search date", searchDate: searchDate });
                    return;
                }
            }

            res.status(404).json({ message: "No matching results found" });
        } catch (error) {
            res.status(500).json({ message: "Error", error: error });
        }
    }
}


export default new Searchmethods;