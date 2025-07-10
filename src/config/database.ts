import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const useSSL = process.env.DB_SSL === 'true';

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    protocol: 'postgres',
    logging: console.log,
    dialectOptions: useSSL ? {
        ssl: {
            require: true,
            rejectUnauthorized: false, // para certificados self-signed
        },
    },
});

export default sequelize;
