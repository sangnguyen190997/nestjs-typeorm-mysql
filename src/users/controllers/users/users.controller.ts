import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUSerProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    getUser(){
        return this.userService.findUsers()
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Put(":id")
    async updateUserById(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ){
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(":id")
    async deleteUserById(
        @Param("id", ParseIntPipe) id: number,

    ){
         await this.userService.deleteUser(id);
    }

    @Post(":id/profiles")
    createUserProfile(@Body() @Param("id", ParseIntPipe) id: number, @Body() createUserProfileDto: CreateUserProfileDto){
        return this.userService.createUserProfile(id, createUserProfileDto);
    }

    @Post(":id/posts")
    createUserPost(@Param("id", ParseIntPipe) id: number, @Body() createUserPostDto : CreateUserPostDto){
        return this.userService.createUserPost(id, createUserPostDto)
    }

}
