/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList, {
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import Ionicons from 'react-native-vector-icons/Ionicons';

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

  const renderItem = ({ item, drag, isActive }: any) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.card,
            { backgroundColor: item.completed ? "#0097A7" : "#00BCD4" },
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
            <TouchableOpacity style={{ marginLeft: "auto" }}>
            </TouchableOpacity>
          </View>
              <Ionicons name="close" size={20} color="white" />
          <Text
            style={[
              styles.desc,
              item.completed && { textDecorationLine: "line-through" },
            ]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <Text style={styles.sectionTitle}>ACTIVE SUB NOTES</Text>
      <DraggableFlatList
        data={data.filter((item) => !item.completed)}
        onDragEnd={({ data: newData }) => {
          // keep order for only active items
          const completed = data.filter((i) => i.completed);
          setData([...newData, ...completed]);
        }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Text style={styles.sectionTitle}>COMPLETED SUB NOTES</Text>
      <DraggableFlatList
        data={data.filter((item) => item.completed)}
        onDragEnd={({ data: newData }) => {
          // reorder only completed items
          const active = data.filter((i) => !i.completed);
          setData([...active, ...newData]);
        }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

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
    marginVertical: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  desc: {
    color: "white",
    fontSize: 13,
    marginTop: 4,
  },
});
