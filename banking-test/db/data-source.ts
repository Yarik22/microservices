import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {
          type: 'postgres',
          url:process.env.DATABASE_URL,
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '22042004',
          database: 'banking',
          entities: ['dist/**/*.entity.js'],
          synchronize:true,
        //   autoLoadEntities: true,
          // logging: true,
          // logger: "advanced-console",
          migrations: ['dist/db/migrations/*.js'],
};


const dataSource = new DataSource(dataSourceOptions);
export default dataSource;