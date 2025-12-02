// /* eslint-disable react-native/no-inline-styles */
// // ChatScreen.tsx
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
// import LineBreak from '../../../components/LineBreak';
// import AppHeader from '../../../components/AppHeader';
// import BackIcon from '../../../components/AppTextComps/BackIcon';
// import { AppImages } from '../../../assets/images';
// import { useNavigation } from '@react-navigation/native';
// import AppTextInput from '../../../components/AppTextInput';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
// import { IMAGE_URL } from '../../../redux/constant';

// type MessageType = {
//   id: string,
//   text?: string,
//   image?: string,
//   sender: 'me' | 'other',
//   time?: string,
//   typing?: boolean,
// };

// const PrivateInbox = ({ route }) => {
//   // const [messages, setMessages] = useState([
//   //   { id: '1', text: 'Hello, good morning :)', sender: 'me', time: '11:20 PM' },
//   //   {
//   //     id: '2',
//   //     text: 'Good morning, anything we can help at Plush Beauty Longue Salon?',
//   //     sender: 'other',
//   //     time: '11:20 PM',
//   //   },
//   //   { id: '3', text: 'This look awesome 😍', sender: 'me', time: '11:20 PM' },
//   //   { id: '4', image: 'https://i.ibb.co/x8Qw7dT/hair.jpg', sender: 'me' },
//   //   {
//   //     id: '5',
//   //     text: 'I would like to book an appointment at 2:30 PM today.',
//   //     sender: 'me',
//   //     time: '11:20 PM',
//   //   },
//   //   { id: '6', typing: true, sender: 'other' },
//   // ]);
//   const nav = useNavigation();
//   const [messages, setMessages] = useState('');
//   const { type } = useSelector(state => state.persistedData);
//   const {
//     _id: currentUserId,
//     fullName: currentUserName,
//     image: currentUserImage,
//   } = useSelector(state => state?.persistedData?.user);
//   const {
//     _id: receiverId,
//     fullName: receiverName,
//     image: receiverImage,
//   } = route.params.data;
//   const uniqueDocId = [currentUserId, receiverId].sort().join('_');

//   const renderMessage = ({ item }) => {
//     if (item.typing) {
//       return (
//         <View style={[styles.bubble, styles.otherBubble]}>
//           <Text style={{ fontSize: 24, color: AppColors.appGreen }}>•••</Text>
//         </View>
//       );
//     }
//     return (
//       <View
//         style={[
//           styles.messageRow,
//           item.sender === 'me' ? styles.myRow : styles.otherRow,
//         ]}
//       >
//         <View
//           style={[
//             styles.bubble,
//             item.sender === 'me' ? styles.myBubble : styles.otherBubble,
//           ]}
//         >
//           {item.text && (
//             <Text style={{ color: item.sender === 'me' ? '#000' : '#fff' }}>
//               {item.text}
//             </Text>
//           )}
//           {item.image && (
//             <Image source={AppImages.nearby} style={styles.image} />
//           )}
//         </View>
//         {item.time && <Text style={styles.time}>{item.time}</Text>}
//       </View>
//     );
//   };

//   useEffect(() => {
//     if (!currentUserId || !receiverId) return;

//     const messagesRef = firestore()
//       .collection('chats')
//       .doc(uniqueDocId)
//       .collection('messages')
//       .orderBy('createdAt', 'desc');

//     const unsubscribe = messagesRef.onSnapshot(
//       async querySnapshot => {
//         const allMessages = querySnapshot.docs.map(doc => {
//           const data = doc.data();
//           const createdAt = data.createdAt?.toDate() || new Date();
//           const isCurrentUser = data.senderId === currentUserId;

//           return {
//             _id: doc.id,
//             text: data.text,
//             createdAt,
//             user: {
//               _id: data.senderId,
//               name: isCurrentUser ? currentUserName : receiverName,
//               avatar: isCurrentUser
//                 ? currentUserImage
//                   ? `${IMAGE_URL}${currentUserImage}`
//                   : undefined
//                 : receiverImage
//                 ? `${IMAGE_URL}${receiverImage}`
//                 : undefined,
//             },
//             seen: data.seen || false,
//           };
//         });

//         setMessages(allMessages);

//         // Mark messages as seen
//         const batch = firestore().batch();
//         querySnapshot.docs.forEach(doc => {
//           if (!doc.data().seen && doc.data().senderId !== currentUserId) {
//             const messageRef = firestore()
//               .collection('chats')
//               .doc(uniqueDocId)
//               .collection('messages')
//               .doc(doc.id);
//             batch.update(messageRef, { seen: true });
//           }
//         });
//         await batch.commit();
//       },
//       error => console.error('Message listener error:', error),
//     );

//     return () => unsubscribe();
//   }, [currentUserId, receiverId]);

//   // Send message (same as before)
//   const onSend = useCallback(
//     async (newMessages = []) => {
//       const text = newMessages[0].text;

//       const batch = firestore().batch();

//       // 1. Add main message
//       const messageRef = firestore()
//         .collection('chats')
//         .doc(uniqueDocId)
//         .collection('messages')
//         .doc();

//       batch.set(messageRef, {
//         text,
//         senderId: currentUserId,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//         seen: false,
//       });
//       const safeCurrentUserImage = currentUserImage ? currentUserImage : null;
//       const safeReceiverImage = receiverImage ? receiverImage : null;
//       // 2. Update last message metadata
//       const lastMsgData = {
//         userId: receiverId,
//         userName: receiverName,
//         userImage: safeReceiverImage,
//         lastMessage: text,
//         timestamp: firestore.FieldValue.serverTimestamp(),
//         seen: false,
//         unreadCount: firestore.FieldValue.increment(1),
//       };

//       // For current user
//       const currentUserChatRef = firestore()
//         .collection('userChats')
//         .doc(currentUserId);

//       batch.set(
//         currentUserChatRef,
//         {
//           [uniqueDocId]: {
//             ...lastMsgData,
//             seen: true,
//             unreadCount: 0,
//           },
//         },
//         { merge: true },
//       );

//       // For receiver
//       const receiverLastMsgData = {
//         userId: currentUserId,
//         userName: currentUserName,
//         userImage: safeCurrentUserImage,
//         lastMessage: text,
//         timestamp: firestore.FieldValue.serverTimestamp(),
//         seen: false,
//         unreadCount: firestore.FieldValue.increment(1),
//       };

//       const receiverChatRef = firestore()
//         .collection('userChats')
//         .doc(receiverId);

//       batch.set(
//         receiverChatRef,
//         {
//           [uniqueDocId]: receiverLastMsgData,
//         },
//         { merge: true },
//       );

//       await batch.commit();
//     },
//     [currentUserId, receiverId],
//   );

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <View
//               style={{ flexDirection: 'row', gap: 25, alignItems: 'center' }}
//             >
//               <BackIcon
//                 onBackPress={() => nav.goBack()}
//                 iconColor={AppColors.ThemeBlue}
//               />
//               <Image source={AppImages.follower1} style={styles.avatar} />
//             </View>
//             <View>
//               <Text style={styles.name}>Ronald</Text>
//               <Text style={styles.online}>Online</Text>
//             </View>
//             <View style={{ flex: 1 }} />
//             <Icon
//               name="ellipsis-vertical"
//               size={22}
//               color={AppColors.ThemeBlue}
//             />
//           </View>

//           {/* Messages */}
//           <ScrollView>
//             <FlatList
//               data={messages}
//               keyExtractor={item => item.id}
//               renderItem={renderMessage}
//               contentContainerStyle={{ padding: 15 }}
//             />
//           </ScrollView>

//           {type === 'Client' && (
//             <View style={{ paddingHorizontal: responsiveWidth(4) }}>
//               <Text style={[styles.online, { color: AppColors.GRAY }]}>
//                 Chat locked until booking is accepted.
//               </Text>
//             </View>
//           )}

//           {/* Input */}
//           <View style={styles.inputRow}>
//             <TouchableOpacity>
//               <Entypo name="attachment" size={22} color={AppColors.DARKGRAY} />
//             </TouchableOpacity>
//             {/* <TextInput placeholder="Type a message" style={styles.input} /> */}
//             <AppTextInput
//               inputPlaceHolder={'Type a message'}
//               placeholderTextColor={AppColors.DARKGRAY}
//               inputWidth={52}
//               rightIcon={
//                 <TouchableOpacity>
//                   <Entypo
//                     name="emoji-happy"
//                     size={22}
//                     color={AppColors.DARKGRAY}
//                   />
//                 </TouchableOpacity>
//               }
//             />
//             <TouchableOpacity style={styles.sendButton}>
//               <Icon name="send" size={22} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default PrivateInbox;

// const styles = StyleSheet.create({
//   container: { flexGrow: 1, backgroundColor: '#fff' },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // padding: 15,
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(2),
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   name: { fontWeight: 'bold', fontSize: 16 },
//   online: { fontSize: 12, color: AppColors.ThemeBlue },
//   messageRow: { marginBottom: 10 },
//   myRow: { alignItems: 'flex-end' },
//   otherRow: { alignItems: 'flex-start' },
//   bubble: { padding: 10, borderRadius: 15, maxWidth: '75%' },
//   myBubble: { backgroundColor: '#E7F3FF', borderTopRightRadius: 0 },
//   otherBubble: { backgroundColor: AppColors.ThemeBlue, borderTopLeftRadius: 0 },
//   time: { fontSize: 10, color: '#888', marginTop: 3 },
//   image: { width: 150, height: 150, borderRadius: 10, marginTop: 5 },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopWidth: 0.5,
//     gap: responsiveWidth(2),
//     borderColor: '#ccc',
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(2),
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     backgroundColor: '#F0F0F0',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//   },
//   sendButton: {
//     backgroundColor: AppColors.ThemeBlue,
//     marginLeft: 8,
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AppTextInput from '../../../components/AppTextInput';
import BackIcon from '../../../components/AppTextComps/BackIcon';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import { IMAGE_URL } from '../../../redux/constant';
import {
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  increment,
  query,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../../assets/Utils/firebase';
import LineBreak from '../../../components/LineBreak';

const PrivateInbox = ({ route }) => {
  const nav = useNavigation();
  const { type } = useSelector(state => state.persistedData);
  const {
    _id: currentUserId,
    fullName: currentUserName,
    image: currentUserImage,
  } = useSelector(state => state?.persistedData?.user);
  const { receiverId, receiverName, receiverImage } = route.params.data;

  const uniqueDocId = [currentUserId, receiverId].sort().join('_');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);
  const flatListRef = useRef(null);

  // Mark messages as read when chat screen opens
  useEffect(() => {
    if (!currentUserId || !receiverId || hasMarkedAsRead) return;

    const markMessagesAsRead = async () => {
      try {
        // 1. Reset unreadCount to 0 for current user in userChats
        const currentUserChatRef = doc(db, 'userChats', currentUserId);
        const currentUserChatDoc = await getDoc(currentUserChatRef);

        if (currentUserChatDoc.exists()) {
          const userChatsData = currentUserChatDoc.data();
          if (userChatsData[uniqueDocId]) {
            await updateDoc(currentUserChatRef, {
              [`${uniqueDocId}.unreadCount`]: 0,
              [`${uniqueDocId}.seen`]: true,
            });
          }
        }

        // 2. Mark all unread messages as seen in messages collection
        const messagesRef = collection(db, 'chats', uniqueDocId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, async snapshot => {
          const batchUpdates = [];

          snapshot.docs.forEach(docSnap => {
            const data = docSnap.data();
            // Only mark messages sent by the other user as seen
            if (data.senderId !== currentUserId && !data.seen) {
              const messageRef = doc(
                db,
                'chats',
                uniqueDocId,
                'messages',
                docSnap.id,
              );
              batchUpdates.push(updateDoc(messageRef, { seen: true }));
            }
          });

          // Execute all updates
          if (batchUpdates.length > 0) {
            await Promise.all(batchUpdates);
          }

          // Set flag to prevent repeated marking
          setHasMarkedAsRead(true);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };

    markMessagesAsRead();
  }, [currentUserId, receiverId, uniqueDocId, hasMarkedAsRead]);

  // Real-time message listener
  useEffect(() => {
    if (!currentUserId || !receiverId) return;

    const messagesRef = collection(db, 'chats', uniqueDocId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc')); // Changed to 'asc' for correct ordering

    const unsubscribe = onSnapshot(q, snapshot => {
      const allMessages = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          _id: docSnap.id,
          text: data.text || null,
          createdAt: data.createdAt?.toDate() || new Date(),
          sender: data.senderId === currentUserId ? 'me' : 'other',
          seen: data.seen || false,
        };
      });
      setMessages(allMessages);

      // Scroll to bottom when new messages arrive
      if (flatListRef.current && allMessages.length > 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    });

    return () => unsubscribe();
  }, [currentUserId, receiverId]);

  // Send message
  const onSend = async () => {
    if (!inputText.trim()) return;

    const messagesRef = collection(db, 'chats', uniqueDocId, 'messages');

    // 1️⃣ Add message to chats collection
    await addDoc(messagesRef, {
      text: inputText,
      senderId: currentUserId,
      createdAt: serverTimestamp(),
      seen: false,
    });

    // 2️⃣ Update userChats for sender
    await setDoc(
      doc(db, 'userChats', currentUserId),
      {
        [uniqueDocId]: {
          userId: receiverId,
          userName: receiverName,
          userImage: receiverImage || null,
          lastMessage: inputText,
          timestamp: serverTimestamp(),
          seen: true,
          unreadCount: 0,
        },
      },
      { merge: true },
    );

    // 3️⃣ Update userChats for receiver - increment unreadCount
    const receiverChatRef = doc(db, 'userChats', receiverId);
    const receiverChatDoc = await getDoc(receiverChatRef);

    if (receiverChatDoc.exists()) {
      const receiverData = receiverChatDoc.data();
      const currentUnreadCount = receiverData[uniqueDocId]?.unreadCount || 0;

      await setDoc(
        receiverChatRef,
        {
          [uniqueDocId]: {
            userId: currentUserId,
            userName: currentUserName,
            userImage: currentUserImage || null,
            lastMessage: inputText,
            timestamp: serverTimestamp(),
            seen: false,
            unreadCount: currentUnreadCount + 1,
          },
        },
        { merge: true },
      );
    } else {
      await setDoc(
        receiverChatRef,
        {
          [uniqueDocId]: {
            userId: currentUserId,
            userName: currentUserName,
            userImage: currentUserImage || null,
            lastMessage: inputText,
            timestamp: serverTimestamp(),
            seen: false,
            unreadCount: 1,
          },
        },
        { merge: true },
      );
    }

    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={{
        paddingHorizontal: responsiveHeight(2),
      }}
    >
      <View
        style={[
          styles.messageRow,
          item.sender === 'me' ? styles.myRow : styles.otherRow,
        ]}
      >
        {/* Avatar for "other" - always on left side */}
        {item.sender === 'other' && (
          <Image
            source={
              receiverImage
                ? { uri: `${IMAGE_URL}${receiverImage}` }
                : require('../../../assets/images/userDummy.png')
            }
            style={styles.messageAvatar}
          />
        )}

        {/* Message container with bubble and time aligned properly */}
        <View
          style={[
            styles.messageContainer,
            item.sender === 'me' ? styles.myContainer : styles.otherContainer,
          ]}
        >
          {/* Message bubble with proper corner styling */}
          <View
            style={[
              styles.bubble,
              item.sender === 'me' ? styles.myBubble : styles.otherBubble,
            ]}
          >
            {item.text && (
              <Text
                style={item.sender === 'me' ? styles.myText : styles.otherText}
              >
                {item.text}
              </Text>
            )}
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
          </View>

          {/* Time and status row below bubble */}
          <View style={styles.timeStatusRow}>
            <Text style={styles.time}>
              {item.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>

            {/* Seen indicator for my messages */}
            {item.sender === 'me' && (
              <Text style={styles.seenIndicator}>{item.seen ? '✓✓' : '✓'}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
            <BackIcon
              onBackPress={() => nav.goBack()}
              iconColor={AppColors.ThemeBlue}
            />
            <Image
              source={
                receiverImage
                  ? { uri: `${IMAGE_URL}${receiverImage}` }
                  : require('../../../assets/images/userDummy.png')
              }
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.name}>{receiverName}</Text>
            <Text style={styles.online}>Online</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Icon
            name="ellipsis-vertical"
            size={22}
            color={AppColors.ThemeBlue}
          />
        </View>

        {/* Messages */}
        <LineBreak space={3} />
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item._id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messageContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {/* {type === 'Client' && (
          <View style={{ paddingHorizontal: responsiveWidth(4) }}>
            <Text style={[styles.online, { color: AppColors.GRAY }]}>
              Chat locked until booking is accepted.
            </Text>
          </View>
        )} */}

        {/* Input */}
        <View style={styles.inputRow}>
          {/* <TouchableOpacity>
            <Entypo name="attachment" size={22} color={AppColors.DARKGRAY} />
          </TouchableOpacity> */}

          <AppTextInput
            inputPlaceHolder={'Type a message'}
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor={AppColors.DARKGRAY}
            inputWidth={70}
            inputHeight={5.5}
            onSubmitEditing={onSend}
            // rightIcon={
            //   <TouchableOpacity>
            //     <Entypo
            //       name="emoji-happy"
            //       size={22}
            //       color={AppColors.DARKGRAY}
            //     />
            //   </TouchableOpacity>
            // }
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={onSend}
            disabled={!inputText.trim()}
          >
            <Icon name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PrivateInbox;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  myRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContainer: {
    // :responsiveHeight(2)
    flexGrow:1,
    gap:responsiveHeight(1)
  },
  myContainer: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 8,
  },
  otherContainer: {
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    marginBottom: 2,
  },
  myBubble: {
    backgroundColor: '#E1F5FA',
    borderTopRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#459CBD',
    borderTopLeftRadius: 4,
    paddingHorizontal: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  myText: {
    color: '#000000',
    fontSize: 16,
  },
  otherText: {
    color: '#fff',
    fontSize: 16,
  },
  timeStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  time: {
    fontSize: 12,
    color: '#999999',
  },
  seenIndicator: {
    fontSize: 12,
    color: '#60C14C',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 8,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  online: { fontSize: 12, color: AppColors.ThemeBlue },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    gap: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
  },
  sendButton: {
    backgroundColor: AppColors.ThemeBlue,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: AppColors.LIGHTGRAY,
  },
});
