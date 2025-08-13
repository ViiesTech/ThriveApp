/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  AppColors,
  categories,
  nearbyItems,
  responsiveFontSize,
  responsiveWidth,
} from '../../../utils';
import AppTextInput from '../../../components/AppTextInput';
import AppText from '../../../components/AppTextComps/AppText';
import LineBreak from '../../../components/LineBreak';
import RecentSearch from '../../../components/RecentSearch';
import Categories from '../../../components/Categories';
import NearbyOffers from '../../../components/NearbyOffers';
import FilterModal from '../../../components/FilterModal';

const Search = () => {
  const refRBSheet = useRef();

  return (
    <Container>
      <AppHeader
        onBackPress={true}
        heading={'Search'}
        rightIcon={
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Ionicons
              name="filter"
              size={responsiveFontSize(2.5)}
              color={AppColors.ThemeBlue}
            />
          </TouchableOpacity>
        }
      />

      <FilterModal refRBSheet={refRBSheet} />

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <AppTextInput
          inputPlaceHolder={'Search salon or service..'}
          logo={
            <Feather
              name="search"
              size={responsiveFontSize(2.5)}
              color={AppColors.ThemeBlue}
            />
          }
        />

        <LineBreak space={2} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AppText
            title={'Recents'}
            textColor={AppColors.LIGHTGRAY}
            textSize={1.8}
          />

          <TouchableOpacity>
            <AppText
              title={'Clear all'}
              textColor={AppColors.ThemeBlue}
              textSize={1.8}
              textFontWeight
            />
          </TouchableOpacity>
        </View>

        <LineBreak space={2} />

        <RecentSearch />

        <LineBreak space={3} />

        <AppText
          title={'Popular Search'}
          textColor={AppColors.BLACK}
          textSize={2.2}
          textFontWeight
        />
        <LineBreak space={2} />

        <View>
          <Categories data={categories} search={'search'} />
        </View>
        <LineBreak space={3} />

        <AppText
          title={'Suggestion for you'}
          textColor={AppColors.BLACK}
          textSize={2.2}
          textFontWeight
        />
      </View>
      <LineBreak space={2} />

      <NearbyOffers data={nearbyItems} showVertical={true} />
      <LineBreak space={4} />
    </Container>
  );
};

export default Search;
