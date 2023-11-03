import  express  from "express";
import cors from "cors";
import {router}  from "./Routes/Router";


export class App {
    private express: express.Application;
    private port = 8007;

    constructor(){
        this.express = express();
        this.midllewares();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application{
        return this.express;
    }

    private midllewares(): void{
        this.express.use(express.json())
        this.express.use(cors())
       
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log("server is running at " + this.port);
            
        })
    }

    private routes():void{
        this.express.use(router)
    }
}