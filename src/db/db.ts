import Dexie from 'dexie';

export interface Vehicle {
  id?: number;
  name: string;
  color: string;
}

export interface ParkLocation {
  id?: number;
  vehicleId: number;
  vehicle?: Vehicle;
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

  async getHistoryWithVehicles(vehicleId?: number) {
    let history: ParkLocation[];

    if (vehicleId) {
      // Dexie currently doesn't support ordering and filtering in the backend
      history = await this.history
        .where({ vehicleId })
        .reverse()
        .sortBy('date');
    } else {
      history = await this.history.orderBy('date').reverse().toArray();
    }

    await Promise.all(
      history.map(async (item: ParkLocation) => {
        item.vehicle = await this.vehicles.get(item.vehicleId);
      }),
    );

    return history;
  }
}

export const db = new PaircelDatabase();
