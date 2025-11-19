/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from "../utils";
import AppButton from "./AppButton";
import { useNavigation } from "@react-navigation/native";
import LineBreak from "./LineBreak";
import { useDeleteNoteMutation } from "../redux/services/MainIntegration";

type Item = {
  id: string;
  title: string;
  description: string;
  data?: any[];
  completed: boolean;
  onRefresh?: () => void;
  type?: "header"; // for section headers
};

// const initialData: Item[] = [
//   { id: "header-active", title: "ACTIVE SUB NOTES", description: "", completed: false, type: "header" },
//   {
//     id: "1",
//     title: "Title Here",
//     description: "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
//     completed: false,
//   },
//   {
//     id: "2",
//     title: "Another Active",
//     description: "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
//     completed: false,
//   },
//   {
//     id: "3",
//     title: "Another Active",
//     description: "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
//     completed: false,
//   },
// ];

const SubNotesScreen: React.FC<Item> = ({ data, onRefresh }) => {
  const nav = useNavigation();
  const [deleteNote, { isLoading, isError }] = useDeleteNoteMutation();

  const DeleteNoteHandler = async (noteId: string) => {
    await deleteNote({ noteId })
      .unwrap()
      .then(res => {
        console.log('response of register ===>', res);
        ShowToast(res.message);
        if (res.success) {
          if (onRefresh) onRefresh();

          // nav.navigate('EmailVerification', {
          //   data: {
          //     ...res.data,
          //     token: res.accessToken,
          //     type: type,
          //     screenType: 'RegisterUser',
          //   },
          // });
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('Some problem occured');
      });
  }
  const renderItem = ({ item, index }) => {
    // if (item.type === "header") {
    //   return <Text style={styles.sectionTitle}>{item.title}</Text>;
    // }

    return (
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginVertical: responsiveHeight(1),
          paddingHorizontal: responsiveWidth(2),
        }}
      >
        {/* drag handle */}
        {/* <TouchableOpacity onLongPress={drag}> */}
        <TouchableOpacity >
          <Fontisto
            name="nav-icon-grid-a"
            size={responsiveFontSize(2)}
            color={AppColors.GRAY}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: AppColors.ThemeBlue }]}
        >
          <View style={styles.headerRow}>
            <Ionicons
              name="checkmark-circle"
              size={22}
              color="white"
              style={{ marginRight: 8 }}
            />
            <Text
              style={[
                styles.title,
                // item.completed && { textDecorationLine: "line-through" },
              ]}
            >
              {item?.tittleName}
            </Text>
          </View>

          <Text
            style={[
              styles.desc,
              // item.completed && { textDecorationLine: "line-through" },
            ]}
            numberOfLines={4}
          >
            {item?.note}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => DeleteNoteHandler(item?._id)}>
          <Ionicons name="close" size={responsiveFontSize(2.5)} color={AppColors.GRAY} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <FlatList

        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <LineBreak space={4} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppButton
          title="Add New"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={() => nav.navigate("AddNewNotes")}
          textFontWeight={false}
        />
      </View>
    </View>
  );
};

export default SubNotesScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#777",
    marginVertical: 8,
  },
  card: {
    borderRadius: 10,
    padding: 12,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  desc: {
    color: AppColors.LIGHTESTGRAY,
    fontSize: responsiveFontSize(1.8),
    marginTop: 4,
  },
});
