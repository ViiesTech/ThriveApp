import React from 'react';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import SubNotesScreen from '../../components/SubNotes';

const InternalNotes = () => {
  return (
    <Container>
      <AppHeader onBackPress={true} heading={'Internal Notes'} />
      <SubNotesScreen />
    </Container>
  );
};

export default InternalNotes;
