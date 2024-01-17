import { Connection } from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Connection | null;
        promise: Promise<typeof import("mongoose")> | null;
      };
    }
  }
}