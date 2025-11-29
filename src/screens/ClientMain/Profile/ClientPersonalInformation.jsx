/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';
import { AppColors, responsiveWidth } from '../../../utils';
import AppButton from '../../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../redux/constant';

const ClientPersonalInformation = () => {
  const nav = useNavigation();
  const {
    fullName,
    email,
    phoneNumber,
    location,
    city,
    address,
    zipCode,
    state,
    appartment,
    image: savedImage,
  } = useSelector(state => state.persistedData?.user);
  console.log('address', address);
  const data = [
    { id: 1, title: 'Full Name', subTitle: fullName },
    { id: 2, title: 'Email address', subTitle: email },
    { id: 3, title: 'Phone Number', subTitle: phoneNumber },
    {
      id: 4,
      title: 'Address',
      subTitle: address || location?.locationName,
    },
    {
      id: 5,
      title: 'Appartment',
      subTitle: appartment,
    },
    { id: 5, title: 'City', subTitle: city },
    { id: 6, title: 'State', subTitle: state },
    { id: 7, title: 'Zipcode', subTitle: zipCode },
  ];
  console.log('location', location);
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Personal Information'} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          {/* <Image
            source={AppImages.profile}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          /> */}
          <Image
            source={
              savedImage
                ? { uri: `${IMAGE_URL}${savedImage}` }
                : AppImages.profile
            }
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <LineBreak space={1.2} />
          <AppText
            title={fullName}
            textColor={AppColors.BLACK}
            textSize={1.8}
            textFontWeight
          />
          <LineBreak space={2} />
          <AppButton
            title="Edit Profile"
            textColor={AppColors.WHITE}
            btnBackgroundColor={AppColors.ThemeBlue}
            handlePress={() => nav.navigate('PersonalInformation')}
            btnWidth={75}
            textSize={2}
            btnPadding={7}
            textFontWeight={false}
          />
        </View>

        <LineBreak space={2} />

        <View>
          <FlatList
            data={data}
            ItemSeparatorComponent={<LineBreak space={1} />}
            renderItem={({ item }) =>
              item?.subTitle ? (
                <View>
                  <AppText
                    title={item.title}
                    textColor={AppColors.BLACK}
                    textSize={2}
                    textFontWeight
                  />
                  <LineBreak space={1} />
                  <AppText
                    title={item.subTitle}
                    textColor={AppColors.DARKGRAY}
                    textSize={2}
                    textwidth={60}
                  />
                </View>
              ) : null
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default ClientPersonalInformation;
