import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export function useCheckUserPermissions(userId) {
  const [canCreate, setCanCreate] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setChecking(true);
    setCanCreate(false);

    async function checkPermissions() {
      if (!userId) {
        setChecking(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setCanCreate(userSnap.data().canCreateProjects || false);
        } else {
          setCanCreate(false);
        }
      } catch (error) {
        console.error("Error checking user permissions:", error);
        setCanCreate(false);
      } finally {
        setChecking(false);
      }
    }

    checkPermissions();
  }, [userId]);

  return [canCreate, checking];
}
