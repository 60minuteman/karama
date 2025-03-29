import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';

// Fetch all chat rooms for a user
export const getUserChatRooms = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'rooms'),
      where('members', 'array-contains', userId)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    return [];
  }
};

// Get all messages for a chat room
export const getChatMessages = (
  roomId: string,
  callback: (messages: any[]) => void
) => {
  try {
    const q = query(
      collection(db, `rooms/${roomId}/messages`),
      orderBy('createdAt', 'asc') // Order by oldest to newest
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};

// Create a new chat room
export const createChatRoom = async (name: string, members: string[]) => {
  try {
    const newRoomRef = await addDoc(collection(db, 'rooms'), {
      name,
      members,
      lastMessage: '',
      lastUpdated: Timestamp.now(),
    });

    return newRoomRef.id;
  } catch (error) {
    console.error('Error creating chat room:', error);
    return null;
  }
};

// Get a user's ID by their email
export const getUserIdByEmail = async (email: string) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log('User not found');
      return null;
    }

    return snapshot.docs[0].id; // Return the user's ID
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

export const getOrCreateChatRoom = async (userId1: string, userId2: string) => {
  try {
    const q = query(
      collection(db, 'rooms'),
      where('members', 'array-contains', userId1)
    );
    const snapshot = await getDocs(q);

    // Check if a room already exists
    for (const doc of snapshot.docs) {
      const room = doc.data();
      if (room.members.includes(userId2)) {
        return { id: doc.id, ...room }; // Return existing room data
      }
    }

    // If no room exists, create a new one
    const newRoomRef = await addDoc(collection(db, 'rooms'), {
      members: [userId1, userId2],
      lastMessage: '',
      lastUpdated: serverTimestamp(), // Timestamp for the last update
      createdAt: serverTimestamp(), // Timestamp when room was created
    });

    return {
      id: newRoomRef.id,
      members: [userId1, userId2],
      createdAt: new Date(),
    };
  } catch (error) {
    console.error('Error creating/getting chat room:', error);
    return null;
  }
};

// Listen for New Messages
export const subscribeToMessages = (chatRoomId: string, setMessages: any) => {
  const q = query(
    collection(db, 'chats', chatRoomId, 'messages'),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messages);
  });
};

// Get User By ID
export const getUserDataById = async (userId: string) => {
  if (!userId) return null;

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() }; // Return user data
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const useAuthFirebase = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth State Changed: ', user); // Debugging
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { currentUser, loading };
};

// Send a message with user details
export const sendMessage = async (
  roomId: string,
  senderId: string,
  userName: string,
  avatar: string,
  text: string
) => {
  try {
    console.log('trimmed text before', text.trim());
    if (!roomId || !senderId || !text.trim()) return;
    console.log('trimmed text', text.trim());

    // Reference to the messages subcollection inside the chat room
    const messagesRef = collection(db, 'rooms', roomId, 'messages');

    // Add the new message
    await addDoc(messagesRef, {
      senderId,
      userName,
      avatar,
      text,
      createdAt: serverTimestamp(),
    });

    // Update the last message in the chat room
    const roomRef = doc(db, 'rooms', roomId);
    await updateDoc(roomRef, {
      lastMessage: text,
      lastUpdated: serverTimestamp(),
    });

    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update the user's profile with display name
    await updateProfile(user, {
      displayName: username,
    });

    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      username: username,
      avatar: '',
      createdAt: new Date(),
    });

    return user;
  } catch (error: any) {
    console.error('Signup error:', error?.message || error);
    throw error;
  }
};

const initiateChat = async (otherEmail: string) => {
  const myEmail = auth.currentUser?.email; // Logged-in user

  if (!myEmail) return console.log('User not logged in');

  // Get user IDs
  const myUserId = await getUserIdByEmail(myEmail);
  const otherUserId = await getUserIdByEmail(otherEmail);

  if (!myUserId || !otherUserId) {
    return console.log('User not found');
  }

  // Get or create a chat room
  const roomId = await getOrCreateChatRoom(myUserId, otherUserId);

  if (roomId) {
    console.log('Chat room ID:', roomId);
    // Navigate to the chat screen
    // navigation.navigate("ChatScreen", { roomId });
  }
};

// Call this function when a user selects another user to chat with
export default initiateChat;
