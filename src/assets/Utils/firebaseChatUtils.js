/* eslint-disable no-undef */
// utils/firebaseChatUtils.js
import firestore from '@react-native-firebase/firestore';

export const updateUserInfoInAllChats = async (userId, updatedData) => {
  try {
    const { fullName, image } = updatedData;
    
    if (!fullName && !image) {
      console.log('No chat updates needed');
      return;
    }

    console.log('Updating chats for user:', userId, 'with data:', updatedData);

    // Get all userChats documents
    const userChatsRef = firestore().collection('userChats');
    const querySnapshot = await userChatsRef.get();

    const batch = firestore().batch();
    let updateCount = 0;

    querySnapshot.forEach((doc) => {
      const userChatsData = doc.data();
      const updates = {};

      // Check each chat in the document
      Object.entries(userChatsData).forEach(([chatId, chatData]) => {
        if (chatData.userId === userId) {
          // Prepare updated chat data
          const updatedChatData = { ...chatData };
          
          if (fullName) {
            updatedChatData.userName = fullName;
          }
          
          if (image) {
            updatedChatData.userImage = image;
          }
          
          updates[chatId] = updatedChatData;
          updateCount++;
        }
      });

      // If we have updates for this document, add to batch
      if (Object.keys(updates).length > 0) {
        batch.update(userChatsRef.doc(doc.id), updates);
      }
    });

    // Commit all updates
    if (updateCount > 0) {
      await batch.commit();
      console.log(`Successfully updated ${updateCount} chat references for user ${userId}`);
    } else {
      console.log(`No chat references found to update for user ${userId}`);
    }
    
    return { success: true, updateCount };
  } catch (error) {
    console.error('Error updating user info in chats:', error);
    throw error;
  }
};