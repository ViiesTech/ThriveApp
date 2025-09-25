import React from 'react';
import { View, Text } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppColors, responsiveWidth } from '../../../utils';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import AppTextInput from '../../../components/AppTextInput';

const LocationInformation = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Location Information'} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View>
          <AppText
            title={'Full name of contact person'}
            textColor={AppColors.GRAY}
            textSize={1.8}
          />
          <LineBreak space={0.5} />
          <AppTextInput inputPlaceHolder={'Name'} />
        </View>
      </View>
    </Container>
  );
};

export default LocationInformation;
