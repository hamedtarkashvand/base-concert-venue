import { filenames, getJSONfromFile, writeJSONToFile } from '@/lib/db/db-utils';
import { readFakeData } from '../../fakeData';

export const resetDB = async () => {
  const safeToRest = process.env.NODE_ENV !== process.env.test || process.env.CYPRESS;
  if (!safeToRest) {
    throw new Error(
      'Warning:database rest  unavailable outside test environment'
    );
    return;
  }

  const { fakeBands, fakeReservations, fakeUsers, fakeShows } = await readFakeData();

  await Promise.all([
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.reservations, fakeReservations),
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.users, fakeUsers),
  ]);

};
