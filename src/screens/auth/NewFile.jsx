import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const NewFile = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity style={{marginTop:100}} onPress={() => navigation.navigate('FillTheDetails')}>
        <Text>NewFile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewFile;
