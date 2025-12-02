/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Container from '../../../components/Container';
import AppointmentsTopTabs from '../../../components/AppointmentsTopTabs';
import LineBreak from '../../../components/LineBreak';
import {
  AppColors,
  earlyNotification,
  newNotification,
  inboxTab,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import AppTextInput from '../../../components/AppTextInput';
import Feather from 'react-native-vector-icons/Feather';
import Thread from '../../../components/Thread';
import AppText from '../../../components/AppTextComps/AppText';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Inbox = ({ route }) => {
  const [selectedTab, setSelectedTab] = useState({ id: 1 });
  const nav = useNavigation();
  const isNotification = route?.params?.isNotification;

  const { _id: currentUserId } = useSelector(
    state => state?.persistedData?.user,
  );
  const [selectedChat, setSelectedChat] = useState({ id: 0 });
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore listener for userChats
  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribe = firestore()
      .collection('userChats')
      .doc(currentUserId)
      .onSnapshot(doc => {
        if (!doc.exists) {
          setChats([]);
          setLoading(false);
          return;
        }

        const data = doc.data();
        const chatsArray = Object.entries(data).map(([id, chat]) => ({
          id,
          ...chat,
        }));

        // Sort chats by timestamp descending (latest first)
        chatsArray.sort(
          (a, b) =>
            b.timestamp?.toDate()?.getTime() - a.timestamp?.toDate()?.getTime(),
        );

        setChats(chatsArray);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [currentUserId]);

  // Handle tab switch if coming from notification
  useEffect(() => {
    if (isNotification) {
      setSelectedTab({ id: 2 });
    }
  }, [isNotification]);

  // Format timestamp for display
  const formatTime = timestamp => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : timestamp;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container style={{ marginBottom: responsiveHeight(-6) }}>
      {/* Top Tabs */}
      <AppointmentsTopTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        data={inboxTab}
      />
      <LineBreak space={2} />

      {/* Inbox Tab */}
      {selectedTab.id == 1 && (
        <View>
          <View style={{ marginHorizontal: responsiveWidth(4) }}>
            <AppTextInput
              logo={<Feather name="search" size={22} color="#0ea5e9" />}
              inputPlaceHolder={'Search messages or salon'}
              placeholderTextColor={AppColors.DARKGRAY}
            />
          </View>

          <LineBreak space={2} />

          <FlatList
            data={chats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              console.log('item', item);
              return (
                <Thread
                  name={item.userName}
                  message={item.lastMessage}
                  image={item.userImage}
                  newMessage={item.unreadCount}
                  cardOnPress={() =>
                    nav.navigate('PrivateInbox', {
                      data: {
                        receiverId: item?.userId,
                        receiverName: item?.userName,
                        receiverImage: item?.userImage,
                      },
                    })
                  }
                  onLongPress={() => setSelectedChat({ id: item.id })}
                  selectedChat={selectedChat.id === item.id}
                  time={formatTime(item.timestamp)}
                />
              );
            }}
          />
        </View>
      )}

      {selectedTab.id == 2 && (
        <View style={{ marginHorizontal: responsiveWidth(4) }}>
          <AppText
            title={'New'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />

          <FlatList
            data={newNotification}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingVertical: responsiveHeight(2),
                  borderBottomColor: AppColors.LIGHTGRAY,
                }}
              >
                <View
                  style={{
                    backgroundColor: AppColors.lightestBlue,
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {item.icon}
                </View>
                <AppText
                  title={item.desc}
                  textColor={AppColors.BLACK}
                  textSize={1.7}
                  textwidth={58}
                  lineHeight={2.2}
                />
                <View style={{ alignItems: 'flex-end' }}>
                  <AppText
                    title={item.time}
                    textColor={AppColors.GRAY}
                    textSize={1.5}
                  />
                  <LineBreak space={1} />
                  {item.id == 1 && (
                    <View
                      style={{
                        width: responsiveHeight(1),
                        height: responsiveHeight(1),
                        borderRadius: 100,
                        backgroundColor: AppColors.lightGreen,
                      }}
                    />
                  )}
                </View>
              </View>
            )}
          />

          <LineBreak space={4} />

          <AppText
            title={'Earlier'}
            textColor={AppColors.BLACK}
            textSize={2}
            textFontWeight
          />

          <FlatList
            data={earlyNotification}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  paddingVertical: responsiveHeight(2),
                  borderBottomColor: AppColors.LIGHTGRAY,
                }}
              >
                <View
                  style={{
                    backgroundColor: AppColors.lightestBlue,
                    width: 45,
                    height: 45,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {item.icon}
                </View>
                <AppText
                  title={item.desc}
                  textColor={AppColors.BLACK}
                  textSize={1.7}
                  textwidth={58}
                  lineHeight={2.2}
                />
                <View style={{ alignItems: 'flex-end' }}>
                  <AppText
                    title={item.time}
                    textColor={AppColors.GRAY}
                    textSize={1.5}
                  />
                  <LineBreak space={1} />
                  {item.id == 1 && (
                    <View
                      style={{
                        width: responsiveHeight(1),
                        height: responsiveHeight(1),
                        borderRadius: 100,
                        backgroundColor: AppColors.lightGreen,
                      }}
                    />
                  )}
                </View>
              </View>
            )}
          />
        </View>
      )}

      <LineBreak space={2} />
    </Container>
  );
};

export default Inbox;
