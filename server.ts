import 'module-alias/register';
import { mongooseConnection } from '@connection';
import { IUser } from '@dataTypes';
import express, { Express } from 'express'
import { Server, createServer } from 'node:http';
import { config } from 'dotenv';
import { user_routes } from '@routes';
import { redisclient } from '@utils';
import morgan from 'morgan';
import { simpleParser } from 'mailparser';
import { SMTPServer } from 'smtp-server';
config({ path: './.env' });

const mailServer: SMTPServer = new SMTPServer({
    disabledCommands: ['AUTH', 'STARTTLS'],
    onMailFrom(address, session, callback) { },
    onData(stream, session, callback) {
        console.log('stream', stream);
        simpleParser(stream, {}, (err, parsed) => {
            console.log(parsed);
        });
        stream.on('end', () => {
            callback();
        });
    },
    onConnect(session, callback) {
        console.log('session', session);
        callback();
    },
    onRcptTo(address, session, callback) {
        console.log('address', address);
        callback();
    },
    onClose(session, callback) {
        console.log('session', session);
        console.log(callback);
    }, 
});

mailServer.listen(25,"127.0.0.1", () => {
    console.log('mail server is running on port 25');
});

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DATABASE: string;
            NODE_ENV: string;
            TEST_DATABASE: string;
            TEST_PORT: number;
            KEY: string;
        }
    }
}

let env: any = process.env.NODE_ENV;

const PORT: any = env == 'development' ? process.env.TEST_PORT : process.env.PORT;
const DATABASE = env == 'development' ? process.env.TEST_DATABASE : process.env.DATABASE;
mongooseConnection(DATABASE);

const app: Express = express();
const server: Server = createServer(app);

redisclient.on('connect', () => {
    console.log('connected with redis-server successfully');
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/user', user_routes);

server.listen(PORT, () => {
    console.log(`Server is up and running in ${env} on port: ${PORT}`)
});


