import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createTaskDTO } from './dto/create-task.dto';
import { TaskDTO } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() data: createTaskDTO) {
    return this.taskService.create(data);
  }

  @Get()
  async findAllTasks() {
    return this.taskService.findAllTasks();
  }

  @Get(':id')
  async findTaskById(@Param('id') id: string) {
    return this.taskService.findTaskById(id);
  }
  
  @Patch(':id')
  async updateTaskById(@Param('id') id: string, @Body() data: TaskDTO) {
    return this.taskService.updateTaskById(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTaskById(@Param('id') id: string) {
    return this.taskService.deleteTaskById(id);
  }
}
