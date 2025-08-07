/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import SVGXml from './SVGXML';
import AppText from './AppTextComps/AppText';
import {AppColors} from '../utils/index';
import {AppIcons} from '../assets/icons/index';

type Props = {
  heading: any;
  rightIcon: any;
};

const MainHeader = ({heading, rightIcon}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <SVGXml icon={AppIcons.smile} width={30} height={30} />
      </View>
      <AppText
        title={heading}
        textColor={AppColors.BLACK}
        textwidth={40}
        textTransform={'uppercase'}
        textSize={3}
        textFontWeight
        textAlignment={'center'}
      />
      {rightIcon}
    </View>
  );
};

export default MainHeader;
