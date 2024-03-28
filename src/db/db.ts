import Dexie from 'dexie';

export interface Vehicle {
  id?: number;
  name: string;
  color: string;
}

export interface ParkLocation {
  id?: number;
  vehicleId: number;
  date: Date;
  lon: number;
  lat: number;
}

export class PaircelDatabase extends Dexie {
  vehicles!: Dexie.Table<Vehicle>;
  history!: Dexie.Table<ParkLocation>;

  constructor() {
    super('PaircelDatabase');
    this.version(1).stores({
      vehicles: '++id, name, color, history',
      history: '++id, vehicleId, date, lon, lat',
    });
  }
}

export const db = new PaircelDatabase();
