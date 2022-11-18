import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskDTO } from './task.dto';

@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) {}

  async create(data: TaskDTO) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        description: data.description
      }
    });

    if(taskExists){
      throw new BadRequestException ('Task already exists')
    }

    data.createdAt = new Date ();

    const task = await this.prisma.task.create({
      data
    })

    return task;
  }

  async findAllTasks(): Promise<TaskDTO[]> {
    return await this.prisma.task.findMany();
  }

  async findTaskById(id: string): Promise<TaskDTO> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: Number(Object.values(id))
      }
    });

    if (!task){
      throw new NotFoundException ('Task does not exist.')
    }

    return task;
  }

  async updateTaskById(id: string, data: TaskDTO): Promise<TaskDTO> {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id: Number(Object.values(id))
      }
    });

    if(!taskExists){
      throw new NotFoundException ('Task does not exist.')
    }

    const updateTask = await this.prisma.task.update({
      where: {
        id: Number(Object.values(id))
      },
      data: {
        description: data.description
      }
    });

    return updateTask
  }

  async deleteTaskById(id: string) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id: Number(Object.values(id))
      }
    });

    if(!taskExists){
      throw new NotFoundException ('Task does not exist.');
    }

    try {
      await this.prisma.task.delete({
        where: {
          id: Number(Object.values(id))
        }
      })
    } catch (error) {
      throw new BadRequestException ('Something got wrong');
    }

    return 
  }
}
