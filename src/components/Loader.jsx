import { ActivityIndicator } from 'react-native'
import React from 'react'
import { AppColors } from '../utils'


const Loader = ({size,color,style}) => {
  return (
    <ActivityIndicator size={'large' || size} color={AppColors.WHITE || color} style={[{alignSelf: 'center'},style]} />
  )
}

export default Loader
