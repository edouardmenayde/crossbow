import getWetland from '../../api/utils/getWetland';

getWetland().getMigrator().devMigrations()
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error(error);

    process.exit(1);
  });
