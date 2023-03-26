import { connect, connection, set } from "mongoose"

export const mongooseConnection = async (url: string) => {
    try {
        set('strictQuery', true);
        await connect(url,);
        console.log('DATABASE CONNECT TO: ', connection.db.databaseName);
    } catch (error) {
        console.log('DATABASE CONNECTION ERROR: ', error);
    }
}