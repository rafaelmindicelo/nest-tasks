import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskDTO } from './dto/task.dto';
import { updateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) {}

  async create(data: createTaskDTO) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        title: data.title
      }
    });

    if(taskExists){
      throw new BadRequestException ('Task already exists')
    }

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
        id: Number(id)
      }
    });

    if (!task){
      throw new NotFoundException ('Task does not exist.')
    }

    return task;
  }

  async updateTaskById(id: string, data: updateTaskDTO): Promise<TaskDTO> {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id: Number(id)
      }
    });

    if(!taskExists){
      throw new NotFoundException ('Task does not exist.')
    }

    const updateTask = await this.prisma.task.update({
      where: {
        id: Number(id)
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        updatedAt: new Date()
      }
    });

    return updateTask
  }

  async deleteTaskById(id: string) {
    const taskExists = await this.prisma.task.findFirst({
      where: {
        id: Number(id)
      }
    });

    if(!taskExists){
      throw new NotFoundException ('Task does not exist.');
    }

    try {
      await this.prisma.task.delete({
        where: {
          id: Number(id)
        }
      })
    } catch (error) {
      throw new BadRequestException ('Something got wrong');
    }

    return 
  }
}
