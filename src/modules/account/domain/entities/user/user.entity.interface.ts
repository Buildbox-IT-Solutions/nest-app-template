import Id from '~/core/domain/value-objects/id.value-object';

export interface IUserEntityProps {
  id?: Id;
  name: string;
  email: string;
  cpf: string;
  password?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserEntityDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
