import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {Model} from 'mongoose';
import {User} from '../types/user';
import {InjectModel} from '@nestjs/mongoose';
import {RegisterDTO, LoginDTO} from '../auth/auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(
     @InjectModel('User')
     private userModel: Model<User>
    ) {

    }

  async create(userDTO: RegisterDTO) {
    const {username} = userDTO;
    const user = await this.userModel.findOne({username});

    if(user) {
      throw new HttpException('User already exists',
        HttpStatus.BAD_REQUEST)
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.senitizeUser(createdUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    const {username, password} = userDTO;
    const user = await this.userModel.findOne({username});

    if(!user) {
      throw new HttpException('Invalid credentials',
        HttpStatus.UNAUTHORIZED);
    }
    if(await bcrypt.compare(password, user.password)) {
      return this.senitizeUser(user)
    } else {
      throw new HttpException('Invalid credentials',
        HttpStatus.UNAUTHORIZED);
    }
  }


  private senitizeUser(user: User) {
    // return user.depopulate('password');
  }
}
