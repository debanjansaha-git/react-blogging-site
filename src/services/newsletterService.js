import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const subscribersCollection = collection(db, 'newsletter_subscribers');

export const addSubscriber = async (email) => {
  try {
    await addDoc(subscribersCollection, {
      email,
      subscribedAt: new Date()
    });
  } catch (error) {
    console.error('Error adding subscriber: ', error);
    throw error;
  }
};
