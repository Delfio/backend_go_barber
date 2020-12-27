/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import UploadConfig from '@config/upload';

import IUserEntity from '@modules/users/entities/IUserEntity';

@Entity('users')
class User implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }
    switch (UploadConfig.driver) {
      case 'azure':
        return `${UploadConfig.config.azure.url}${UploadConfig.config.azure.container}/${this.avatar}`
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      default:
        return null
    }
  }
}
export default User;
