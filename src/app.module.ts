import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './typeorm/entities/Post';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Nguyenvansang1997!@",
      database: "nestjs_mysql_tutorial",
      entities: [User, Profile, Post],
      synchronize: true,
    }),
    UsersModule
  ],
 
})
export class AppModule {}
