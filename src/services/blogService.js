import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const postsCollection = collection(db, 'posts');

export const createPost = async (postData) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to create a post');
  }
  
  try {
    const docRef = await addDoc(postsCollection, {
      ...postData,
      authorId: auth.currentUser.uid,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const snapshot = await getDocs(postsCollection);
    const post = snapshot.docs.find(doc => doc.data().slug === slug);
    return post ? { id: post.id, ...post.data() } : null;
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to update a post');
  }

  try {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, postData);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to delete a post');
  }

  try {
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};
