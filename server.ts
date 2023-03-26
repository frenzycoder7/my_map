import { mongooseConnection } from '@connection';
import { IUser } from '@dataTypes';
import { user_routes } from '@routes';
import express, { Express } from 'express'
import { Server, createServer } from 'node:http';
import { config } from 'dotenv';

config({ path: './.env' });

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
const PORT: any = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE || 'mongodb://localhost:27017/ecommerce';
mongooseConnection(DATABASE);
const app: Express = express();
const server: Server = createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', user_routes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});