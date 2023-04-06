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
import { SMTPServer, SMTPServerOptions } from 'smtp-server';
import { readFileSync } from 'node:fs';
config({ path: './.env' });

import SMTPConnection from 'nodemailer/lib/smtp-connection';

const smtpOptions: SMTPServerOptions = {
    secure: false,
    logger: true,
    disabledCommands: ['AUTH'],
    onAuth(auth, session, callback) {

        console.log("===========================AUTH===========================")
        if (auth.username == 'test' && auth.password == 'test') {
            return callback(null, { user: 123 });
        }
        callback(new Error('Authentication failed'));
    },
    onData(stream, session, callback) {
        console.log("===========================DATA===========================")
        simpleParser(stream, (err, parsed) => {
            if (err) {
                console.log(err);
            }
            console.log(parsed);
        });
        callback();
    },
    onMailFrom(address, session, callback) {
        console.log("===========================MAIL===========================")
        console.log(address);
        callback();
    },
    onRcptTo(address, session, callback) {
        console.log("===========================RCPT===========================")
        console.log(address);
        callback();
    },
    onConnect(session, callback) {
        console.log("===========================CONNECT===========================")
        console.log(session);
        callback();
    },
    onClose(session, callback) {
        console.log("===========================CLOSE===========================")
        console.log(session);
    },
};

const mailServer: SMTPServer = new SMTPServer(smtpOptions);
mailServer.listen(25, () => {
    console.log('SMTP server listening on port 25');
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


