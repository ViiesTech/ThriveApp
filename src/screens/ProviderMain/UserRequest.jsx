import React, { useState } from 'react'
import { View } from 'react-native'
import Container from '../../components/Container'
import AppointmentsTopTabs from '../../components/AppointmentsTopTabs'
import { openRequest, userRequestTab } from '../../utils'
import LineBreak from '../../components/LineBreak'
import AppointmentsCard from '../../components/AppointmentsCard'

const UserRequest = () => {
    const [selectedTab, setSelectedTab] = useState({ id: 1 });
  
  return (
    <Container>
      <LineBreak space={1} />
      <AppointmentsTopTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        data={userRequestTab}
      />
      <LineBreak space={1} />

      <View>
        <AppointmentsCard data={openRequest} userRequest={'userRequest'} />
      </View>
    </Container>
  )
}

export default UserRequest