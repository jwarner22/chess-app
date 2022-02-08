import React from 'react';
import BackButton from '../../../BackButton';
import SuggestionForm from '../../../UI_Kit/FeatureSuggestion/SuggestionForm';
import { PageContainer } from '../../../UI_Kit/Page';

const FeatureSuggestion = () => {
  return (<PageContainer> 
            <BackButton />
            <SuggestionForm />    
        </PageContainer>);
};

export default FeatureSuggestion;
