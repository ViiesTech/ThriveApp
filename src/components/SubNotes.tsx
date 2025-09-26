/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
  AppColors,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "../utils";
import AppButton from "./AppButton";
import { useNavigation } from "@react-navigation/native";
import LineBreak from "./LineBreak";

type Item = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type?: "header"; // for section headers
};

const initialData: Item[] = [
  { id: "header-active", title: "ACTIVE SUB NOTES", description: "", completed: false, type: "header" },
  {
    id: "1",
    title: "Title Here",
    description: "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
    completed: false,
  },
  {
    id: "2",
    title: "Another Active",
    description: "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
    completed: false,
  },
  { id: "header-completed", title: "COMPLETED SUB NOTES", description: "", completed: true, type: "header" },
  {
    id: "3",
    title: "Completed Note",
    description: "Create a mobile app UI Kit that provide a basic notes functionality but with some improvement...",
    completed: true,
  },
];

const SubNotesScreen = () => {
  const [data, setData] = useState<Item[]>(initialData);
  const nav = useNavigation();

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    if (item.type === "header") {
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    }

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
        <TouchableOpacity onLongPress={drag}>
          <Fontisto
            name="nav-icon-grid-a"
            size={responsiveFontSize(2)}
            color={isActive ? AppColors.ThemeBlue : AppColors.GRAY}
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

  const handleDragEnd = ({ data: newData }: { data: Item[] }) => {
    // update completed flag based on section they are under
    let inCompleted = false;
    const updated = newData.map((item) => {
      if (item.type === "header" && item.id === "header-completed") {
        inCompleted = true;
        return item;
      }
      if (item.type === "header" && item.id === "header-active") {
        inCompleted = false;
        return item;
      }
      return { ...item, completed: inCompleted };
    });
    setData(updated);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <DraggableFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={handleDragEnd}
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
