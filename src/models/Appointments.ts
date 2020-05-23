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

  constructor(provider: string, date: Date) {
    this.provider = provider;
    this.date = date;
    this.id = uuid();
  }
}
export default Appoitment;
