/* eslint-disable camelcase */
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export interface Iappointment {
  id: string,
  provider: string,
  date: Date
}
@Entity('appointments')
class Appoitment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Appoitment;
