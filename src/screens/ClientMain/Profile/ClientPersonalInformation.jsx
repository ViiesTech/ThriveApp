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

const data = [
  { id: 1, title: 'Full Name', subTitle: 'Samantha Wilson' },
  { id: 2, title: 'Email address', subTitle: 'samanthawilson@gmail.com' },
  { id: 3, title: 'Phone Number', subTitle: '+123 456 789' },
  {
    id: 4,
    title: 'Address',
    subTitle:
      '112233 Broadway Los Angeles, California 92000 Unites States of America',
  },
  { id: 5, title: 'City', subTitle: 'Unites States of America' },
  { id: 6, title: 'State', subTitle: 'Arizona' },
  { id: 7, title: 'Zipcode', subTitle: '10001' },
];

const ClientPersonalInformation = () => {
  const nav = useNavigation();
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Personal Information'} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={AppImages.on_boarding1}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <LineBreak space={1.2} />
          <AppText
            title={'Samantha Wilson'}
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
            renderItem={({ item }) => (
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
            )}
          />
        </View>
      </View>
    </Container>
  );
};

export default ClientPersonalInformation;
