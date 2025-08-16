import React from 'react';
import { View, Text } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { responsiveWidth } from '../../../utils';
import FAQs from '../../../components/FAQs';
import LineBreak from '../../../components/LineBreak';

const AskQuestions = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Frequently Asked Questions'} />
      <LineBreak space={2} />
      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <FAQs />
      </View>
    </Container>
  );
};

export default AskQuestions;
