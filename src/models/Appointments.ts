import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
export default Appoitment;
