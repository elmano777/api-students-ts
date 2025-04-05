export class CreateStudentDto {
  firstname: string;
  lastname: string;
  gender: string;
  age?: string;
}

export class UpdateStudentDto {
  firstname?: string;
  lastname?: string;
  gender?: string;
  age?: string;
}

export class FindOneDto {
  id: number;
}
