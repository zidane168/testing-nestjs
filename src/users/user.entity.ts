import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  // @PrimaryGeneratedColumn('uuid')
  // userID: string;
  @Column()
  userID: string;

  @Column()
  id1: string;

  @Column()
  id2: string;
}
