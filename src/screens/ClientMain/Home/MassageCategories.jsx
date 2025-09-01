import React from 'react';
import { View, Text, Image } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { AppImages } from '../../../assets/images';
import { AppColors, responsiveWidth } from '../../../utils';
import LineBreak from '../../../components/LineBreak';
import AppText from '../../../components/AppTextComps/AppText';

const MassageCategories = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Couples Massage'} />
      <Image
        source={AppImages.massage}
        style={{ width: responsiveWidth(100) }}
      />

      <LineBreak space={2} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppText
          title={'Description'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={1} />
        <AppText
          title={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
          textColor={AppColors.GRAY}
          textSize={1.6}
          lineHeight={2.5}
        />
        <LineBreak space={2} />
        <AppText
          title={'Service Price'}
          textColor={AppColors.BLACK}
          textSize={2}
          textFontWeight
        />
        <LineBreak space={1} />
        <AppText
          title={'Massage for two in the comfort of your space.'}
          textColor={AppColors.GRAY}
          textSize={1.6}
          lineHeight={2.5}
        />
        <LineBreak space={1} />
        <AppText
          title={'60 Min Each –'}
          textColor={AppColors.GRAY}
          textSize={1.6}
          lineHeight={2.5}
        >
          {' '}
          <AppText
            title={'$300'}
            textColor={AppColors.ThemeBlue}
            textSize={1.6}
            lineHeight={2.5}
            textFontWeight
          />
        </AppText>
        <AppText
          title={'90 Min Each –'}
          textColor={AppColors.GRAY}
          textSize={1.6}
          lineHeight={2.5}
        >
          {' '}
          <AppText
            title={'$340'}
            textColor={AppColors.ThemeBlue}
            textFontWeight
            textSize={1.6}
            lineHeight={2.5}
          />
        </AppText>
        <LineBreak space={1} />
        <AppText
          title={
            '> Option: 1 provider (back-to-back) or 2 (side-by-side) Add note for 2-provider request'
          }
          textColor={AppColors.GRAY}
          textSize={1.6}
          textwidth={80}
          lineHeight={2.5}
        />
      </View>
    </Container>
  );
};

export default MassageCategories;
