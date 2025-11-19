import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, View } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppTextComps/AppText';
import {
  AppColors,
  responsiveHeight,
  responsiveWidth,
  ShowToast,
} from '../../utils';
import LineBreak from '../../components/LineBreak';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { useCreateInternalNotesMutation } from '../../redux/services/MainIntegration';
import { useSelector } from 'react-redux';

const AddNewNotes = () => {
  const nav = useNavigation();
  const [title, setTitle] = useState();
  const [value, setValue] = useState();
  const { _id } = useSelector(state => state?.persistedData?.user);
  const [createInternalNotes, { isLoading, isError }] =
    useCreateInternalNotesMutation();

  const CreateInternalNotesHandler = async () => {
    if (!title) {
      return ShowToast('Plz Add A Title To Proceed');
    } else if (!value) {
      return ShowToast('Notes cant be empty');
    }
    let data = {
      therapistId: _id,
      tittleName: title,
      note: value,
    };
    await createInternalNotes(data)
      .unwrap()
      .then(res => {
        console.log('response of notes ===>', res);
        ShowToast(res.message);
        if (res.success) {
          nav.goBack();
        }
      })
      .catch(error => {
        console.log('error while registering the account ===>', error);
        ShowToast('Some problem occured');
      });
  };

  return (
    <Container>
      <AppHeader onBackPress={true} heading={'New Note'} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        {/* <AppText
          title={'New Note'}
          textColor={AppColors.BLACK}
          textSize={2.2}
          textFontWeight
        /> */}
        <AppTextInput
          borderRadius={5}
          containerBg={AppColors.WHITE}
          onChangeText={val => setTitle(val)}
          placeholderTextColor={AppColors.BLACK}
          inputWidth={90}
          inputHeight={4.5}
          inputContainerPaddingHorizontal={-1}
          placeholderTextfontWeight={900}
          fontSize={2}
          inputPlaceHolder={'New Note'}
        />
        <AppTextInput
          borderRadius={5}
          containerBg={AppColors.WHITE}
          inputHeight={66}
          onChangeText={val => setValue(val)}
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
          title={
            isLoading ? (
              <ActivityIndicator size={'large'} color={AppColors.WHITE} />
            ) : (
              'Save Note'
            )
          }
          textColor={AppColors.WHITE}
          btnBackgroundColor={AppColors.appGreen}
          handlePress={CreateInternalNotesHandler}
          textFontWeight={false}
        />
      </View>
    </Container>
  );
};

export default AddNewNotes;
