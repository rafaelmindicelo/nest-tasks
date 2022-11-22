import { IsDate, IsString } from "class-validator";
export class createTaskDTO {

  @IsString()
  readonly description: string;
  
  createdAt: Date;
}