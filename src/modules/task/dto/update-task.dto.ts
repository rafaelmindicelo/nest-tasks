import { PartialType } from "@nestjs/mapped-types";
import { Contains, IsOptional } from "class-validator";
import { TaskStatus } from "../Types/task-status";
import { createTaskDTO } from "./create-task.dto";

export class updateTaskDTO extends PartialType(createTaskDTO){
  @IsOptional()
  @Contains(TaskStatus.DONE)
  readonly status?: string
}

// all of the fields from createTaskDTO are optionals, 'cause we're using PartialType