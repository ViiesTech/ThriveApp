import React from 'react'
import { View } from 'react-native'
import { AppColors } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak';

const AuthHeader = ({ heading, subHeading }: { heading: string, subHeading: string }) => {
    return (
        <View>
            <AppText
                title={heading}
                textColor={AppColors.BLACK}
                textSize={2.5}
                textFontWeight
            />
            <LineBreak space={0.5} />
            <AppText
                title={subHeading}
                textColor={AppColors.DARKGRAY}
                textSize={1.6}
            />
        </View>
    );
};

export default AuthHeader;