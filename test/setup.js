import getWetland from '../api/utils/getWetland';
import {Store} from 'wetland';
import rimraf from 'rimraf';

const wetland    = getWetland();
const store      = wetland.getStore();
const connection = store.getConnection(Store.ROLE_MASTER);
const database   = connection.client.database();

connection.raw(`DROP DATABASE IF EXISTS ${database};`)
    .then(() => {
        return new Promise((resolve, reject) => {
            rimraf(wetland.getConfig().fetch('dataDirectory'), (error) => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    })
    .then(() => connection.raw(`CREATE DATABASE ${database};`))
    .then(() => wetland.getMigrator().devMigrations())
    .then(() => {
        process.exit(0);
    })
    .catch(error => {
        console.error(error);

        process.exit(1);
    });
