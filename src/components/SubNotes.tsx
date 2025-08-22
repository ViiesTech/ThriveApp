/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from "../utils";
import LineBreak from "./LineBreak";
import AppButton from "./AppButton";
import { useNavigation } from "@react-navigation/native";

type Item = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const initialData: Item[] = [
  {
    id: "1",
    title: "Title Here",
    description:
      "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
    completed: false,
  },
  {
    id: "2",
    title: "Title Here",
    description:
      "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
    completed: false,
  },
  {
    id: "3",
    title: "Title Here",
    description:
      "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
    completed: true,
  },
];

const SubNotesScreen = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const nav = useNavigation();

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View style={{ flexDirection: 'row', gap: 10, width: responsiveWidth(82), marginVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(2) }}>
        <TouchableOpacity>
          <Fontisto name="nav-icon-grid-a" size={responsiveFontSize(2)} color={AppColors.GRAY} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: AppColors.ThemeBlue },
          ]}
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
                item.completed && { textDecorationLine: "line-through" },
              ]}
            >
              {item.title}
            </Text>
          </View>

          <Text
            style={[
              styles.desc,
              item.completed && { textDecorationLine: "line-through" },
            ]}
            numberOfLines={4}
          >
            {item.description}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="close" size={responsiveFontSize(2.5)} color={AppColors.GRAY} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <Text style={styles.sectionTitle}>ACTIVE SUB NOTES</Text>
      <View>
        <FlatList
          data={data.filter((item) => !item.completed)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <LineBreak space={1.5} />

      <View style={{ width: responsiveWidth(92), alignSelf: 'center', height: responsiveHeight(0.2), backgroundColor: AppColors.LIGHTGRAY }} />

      <LineBreak space={1} />

      <Text style={styles.sectionTitle}>COMPLETED SUB NOTES</Text>
      <FlatList
        data={data.filter((item) => item.completed)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <LineBreak space={5} />

      <AppButton
          title="Add New"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate("AddNewNotes")}
          textFontWeight={false}
        />
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
