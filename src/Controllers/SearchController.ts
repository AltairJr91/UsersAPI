import e, { Request, Response } from "express";
import { prisma } from "../Database/DataBase";

interface QueryInterface {
    searchName: string,
    sortOrder: string,
    startDate: string,
    endDate: string
};

class Searchmethods {
    public async searchImplement(req: Request, res: Response): Promise<void> {
        try {
            const { searchName, sortOrder, startDate, endDate }: QueryInterface = req.query as unknown as QueryInterface;

            if (searchName) {
                const searchReturn = await prisma.user.findMany({
                    where: {
                        name: {
                            contains: searchName,
                        },
                    },
                });

                if (searchReturn.length > 0) {
                    res.status(200).json({ message: "Search returned", searchName: searchReturn });
                    return;
                }
            }

            if (sortOrder) {

                const dateAggregate: { minDate: number; maxDate: number }[] = await prisma.$queryRaw`
                    SELECT MIN(created_at) as minDate, MAX(created_at) as maxDate FROM User
                `;
                const startDate = new Date(Number(dateAggregate[0].minDate.toString()));
                const endDate = new Date(Number(dateAggregate[0].maxDate.toString()));

                const searchDate = await prisma.user.findMany({
                    where: {
                        created_at: {
                            lte: new Date(endDate),
                            gte: new Date(startDate),
                        },
                    },
                    orderBy: {
                        created_at: sortOrder === 'asc' ? 'asc' : 'desc',
                    },
                });

                if (searchDate.length > 0) {
                    res.status(200).json({ message: "Search date", searchDate: searchDate });
                    return;
                }
            }

            if (startDate && endDate) {
                const searchParams = await prisma.user.findMany({
                    where: {
                        created_at: {
                            lte: new Date(endDate),
                            gte: new Date(startDate),
                        },
                    }})
                    
                    if (searchParams.length > 0) {
                        res.status(200).json({ message: "Search date", searchParams: searchParams });
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