import React from 'react';
import { View } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import { AppColors, responsiveWidth } from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const AddNewNotes = () => {
  const nav = useNavigation();
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'New Note'} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={'New Note'}
          textColor={AppColors.BLACK}
          textSize={2.2}
          textFontWeight
        />
        <AppTextInput
          borderRadius={5}
          containerBg={AppColors.WHITE}
          inputHeight={66}
          placeholderTextColor={AppColors.GRAY}
          inputWidth={90}
          multiline={true}
          inputContainerPaddingHorizontal={-1}
          inputPlaceHolder={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
          }
          textAlignVertical={'top'}
        />
        <LineBreak space={1} />
        <AppButton
          title="Save Note"
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.ThemeBlue}
          handlePress={() => nav.navigate('InternalNotes')}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default AddNewNotes;
