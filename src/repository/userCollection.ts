// repository/userCollection.ts
import { db } from '../config/firebaseConfig';

export const updateUser = async (userId: string, data: any) => {
  return await db.collection('USERS').doc(userId).set(data, { merge: true });
};

export const getUser = async (userId: string) => {
  return await db.collection('USERS').doc(userId).get();
};
