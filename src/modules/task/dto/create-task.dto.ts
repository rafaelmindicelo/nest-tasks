import { IsString } from "class-validator";
export class createTaskDTO {

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
  
}