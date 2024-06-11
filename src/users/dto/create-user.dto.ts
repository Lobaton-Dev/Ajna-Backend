import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsDateString()
  birth_date: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  cpf: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsMobilePhone('pt-BR')
  telephone: string;

  @IsNumberString()
  cep: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
