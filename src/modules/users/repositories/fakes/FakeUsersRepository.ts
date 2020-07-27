import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.find(user => user.email === email);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });
    this.usersRepository.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.usersRepository.findIndex(
      findUser => findUser.id === user.id,
    );
    this.usersRepository[findIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
