import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
   constructor(@InjectRepository(User) private userReposity: Repository<User>,
            @InjectRepository(Profile) private profileReposity: Repository<Profile>,
            @InjectRepository(Post) private postReposity: Repository<Post>

   ){}
    findUsers(){
        return this.userReposity.find({relations: ["profile","posts"]});
    }
    createUser(userDetails: CreateUserParams){
        const newUser = this.userReposity.create({
            ...userDetails, createAt: new Date(),
        });
        return this.userReposity.save(newUser)
    }
    updateUser(id: number, updateUserDetails: UpdateUserParams){
        return this.userReposity.update({id}, {...updateUserDetails})
    }
    deleteUser(id: number){
        return this.userReposity.delete({id})
    }

    async createUserProfile(id: number, createUserProfileDetails: CreateUserProfileParams){
        const user = await this.userReposity.findOneBy({id});
        if(!user)
            throw new HttpException(
                "User not found. Cannot create profile",
                HttpStatus.BAD_REQUEST
            );
        const newProfile = this.profileReposity.create(createUserProfileDetails)
        const savedProfile = await this.profileReposity.save(newProfile)
        user.profile = savedProfile;
        return this.userReposity.save(user)
    }

    async createUserPost(id: number, createUserPostDetails: CreateUserPostParams){
        const user = await this.userReposity.findOneBy({id});
        if(!user)
            throw new HttpException(
                "User not found. Cannot create profile",
                HttpStatus.BAD_REQUEST
            );
        const newPost = this.postReposity.create({...createUserPostDetails, user})
        return this.postReposity.save(newPost)
    }
}
