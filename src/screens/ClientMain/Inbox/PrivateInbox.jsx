/* eslint-disable react-native/no-inline-styles */
// ChatScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors, responsiveHeight, responsiveWidth } from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppHeader from '../../../components/AppHeader';
import BackIcon from '../../../components/AppTextComps/BackIcon';
import { AppImages } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';

type MessageType = {
  id: string,
  text?: string,
  image?: string,
  sender: 'me' | 'other',
  time?: string,
  typing?: boolean,
};

const PrivateInbox = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, good morning :)', sender: 'me', time: '11:20 PM' },
    {
      id: '2',
      text: 'Good morning, anything we can help at Plush Beauty Longue Salon?',
      sender: 'other',
      time: '11:20 PM',
    },
    { id: '3', text: 'This look awesome 😍', sender: 'me', time: '11:20 PM' },
    { id: '4', image: 'https://i.ibb.co/x8Qw7dT/hair.jpg', sender: 'me' },
    {
      id: '5',
      text: 'I would like to book an appointment at 2:30 PM today.',
      sender: 'me',
      time: '11:20 PM',
    },
    { id: '6', typing: true, sender: 'other' },
  ]);
  const nav = useNavigation();

  const renderMessage = ({ item }) => {
    if (item.typing) {
      return (
        <View style={[styles.bubble, styles.otherBubble]}>
          <Text style={{ fontSize: 24, color: AppColors.WHITE }}>•••</Text>
        </View>
      );
    }
    return (
      <View
        style={[
          styles.messageRow,
          item.sender === 'me' ? styles.myRow : styles.otherRow,
        ]}
      >
        <View
          style={[
            styles.bubble,
            item.sender === 'me' ? styles.myBubble : styles.otherBubble,
          ]}
        >
          {item.text && (
            <Text style={{ color: item.sender === 'me' ? '#000' : '#fff' }}>
              {item.text}
            </Text>
          )}
          {item.image && (
            <Image source={AppImages.nearby} style={styles.image} />
          )}
        </View>
        {item.time && <Text style={styles.time}>{item.time}</Text>}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{flex: 1,}} behavior='height'>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 25, alignItems: 'center' }}>
            <BackIcon onBackPress={() => nav.goBack()} iconColor={AppColors.ThemeBlue} />
            <Image source={AppImages.follower1} style={styles.avatar} />
          </View>
          <View>
            <Text style={styles.name}>Ronald</Text>
            <Text style={styles.online}>Online</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Icon name="ellipsis-vertical" size={22} color={AppColors.ThemeBlue} />
        </View>

        {/* Messages */}
        <ScrollView>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ padding: 15 }}
          />
          </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput placeholder="Type a message" style={styles.input} />
          <TouchableOpacity style={styles.sendButton}>
            <Icon name="send" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <LineBreak space={4} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PrivateInbox;

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  online: { fontSize: 12, color: 'green' },
  messageRow: { marginBottom: 10 },
  myRow: { alignItems: 'flex-end' },
  otherRow: { alignItems: 'flex-start' },
  bubble: { padding: 10, borderRadius: 15, maxWidth: '75%' },
  myBubble: { backgroundColor: '#E7F3FF', borderTopRightRadius: 0 },
  otherBubble: { backgroundColor: AppColors.ThemeBlue, borderTopLeftRadius: 0 },
  time: { fontSize: 10, color: '#888', marginTop: 3 },
  image: { width: 150, height: 150, borderRadius: 10, marginTop: 5 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    backgroundColor: AppColors.ThemeBlue,
    marginLeft: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
