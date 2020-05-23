import { uuid } from 'uuidv4';

export interface Iappointment {
  id: string,
  provider: string,
  date: Date
}

class Appoitment {
  id: string;

  provider: string;

  date: Date;

  constructor({ date, provider }: Omit<Iappointment, 'id'>) {
    this.provider = provider;
    this.date = date;
    this.id = uuid();
  }
}
export default Appoitment;
