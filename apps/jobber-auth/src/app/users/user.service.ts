import { Injectable } from '@nestjs/common';
import {Prisma} from '@prisma-clients/jobber-auth';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}
    async createUser(input: Prisma.UserCreateManyInput): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...input,
                password: await bcrypt.hash(input.password, 10),
            }
        });
    }

    async getUsers(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }
}
