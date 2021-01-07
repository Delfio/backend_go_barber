/* eslint-disable camelcase */
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

import AppointmentEntitye from '@modules/appointments/entities/IAppointmentEntity';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appoitment implements AppointmentEntitye {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @ManyToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Appoitment;
