/* eslint-disable camelcase */
import IUserTokenEntity from '@modules/users/entities/IUserTokenEntity';
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated,
} from 'typeorm';

  @Entity('user_tokens')
class UserToken implements IUserTokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column('varchar')
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
  }
export default UserToken;
