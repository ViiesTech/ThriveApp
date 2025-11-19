import React, { useCallback, useEffect } from 'react';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import SubNotesScreen from '../../components/SubNotes';
import { ShowToast } from '../../utils';
import { useLazyGetTherapistNotesQuery } from '../../redux/services/MainIntegration';
import { useFocusEffect } from '@react-navigation/native';

const InternalNotes = () => {
  const [getTherapistNotes, { isLoading, data, isError }] =
    useLazyGetTherapistNotesQuery();
  const GetTherapistNotesHandler = async () => {
    getTherapistNotes()
      .unwrap()
      .then(res => {
        if (!res?.success) {
          ShowToast(res?.message);
        }
        console.log('ress', res);
      })
      .catch(error => {
        console.log('erorr', error);
        ShowToast(
          error?.response?.data?.message ||
            error?.message ||
            'Some Problem Occured',
        );
      });
  };
  useFocusEffect(
    useCallback(() => {
      GetTherapistNotesHandler();
    }, []),
  );
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Internal Notes'} />
      <SubNotesScreen onRefresh={GetTherapistNotesHandler} data={data?.data} />
    </Container>
  );
};

export default InternalNotes;
