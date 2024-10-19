import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where, arrayUnion, arrayRemove, orderBy, limit, startAfter } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '../firebase';

const postsCollection = collection(db, 'posts');

// Helper function to generate a slug from the title
const generateSlug = (title) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  
  return slug.length > 50 ? slug.substring(0, 50) : slug;
};

export const createPost = async (postData) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to create a post');
  }
  
  try {
    const slug = generateSlug(postData.title);
    const docRef = await addDoc(postsCollection, {
      ...postData,
      slug,
      authorId: auth.currentUser.uid,
      createdAt: new Date()
    });
    return { id: docRef.id, slug };
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
    const q = query(postsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting document by slug: ', error);
    throw error;
  }
};

export const updatePost = async (slug, postData) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to update a post');
  }

  try {
    const q = query(postsCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, 'posts', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        ...postData,
        slug: slug // Ensure the slug remains the same
      });
      console.log("Document successfully updated");
    } else {
      throw new Error('No document found with the given slug');
    }
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

export const deletePost = async (id, imageUrl) => {
  if (!auth.currentUser) {
    throw new Error('You must be logged in to delete a post');
  }

  try {
    // Delete the document from Firestore
    await deleteDoc(doc(db, 'posts', id));

    // If there's an image URL, delete the image from Firebase Storage
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error('Error deleting document or image:', error);
    throw error;
  }
};

export const likePost = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayUnion(userId)
  });
};

export const unlikePost = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayRemove(userId)
  });
};

export const addComment = async (projectId, commentData) => {
  try {
    const projectRef = doc(db, 'posts', projectId);
    await updateDoc(projectRef, {
      comments: arrayUnion(commentData)
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const addReplyToComment = async (projectId, parentCommentId, replyData) => {
  const projectRef = doc(db, 'posts', projectId);
  await updateDoc(projectRef, {
    [`comments.${parentCommentId}.replies`]: arrayUnion(replyData)
  });
};

export const likeComment = async (projectId, commentId, userId) => {
  const projectRef = doc(db, 'posts', projectId);
  await updateDoc(projectRef, {
    [`comments.${commentId}.likes`]: arrayUnion(userId)
  });
};

export const unlikeComment = async (projectId, commentId, userId) => {
  const projectRef = doc(db, 'posts', projectId);
  await updateDoc(projectRef, {
    [`comments.${commentId}.likes`]: arrayRemove(userId)
  });
};

export const getComments = async (projectId) => {
  try {
    const projectRef = doc(db, 'posts', projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (projectDoc.exists()) {
      const projectData = projectDoc.data();
      return projectData.comments || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};
