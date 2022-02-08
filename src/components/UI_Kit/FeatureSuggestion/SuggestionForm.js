import React from 'react';
import Button from '../Button/Button';
import CategoryTitle from '../CategoryTitle/CategoryTitle';
import { FormLabel, 
    SuggestionFormContainer, 
    SuggestionTextArea } from './SuggestionFormElements';

const SuggestionForm = () => {
  return (<>
            <CategoryTitle>
                Suggest a Feature
            </CategoryTitle>
            <SuggestionFormContainer>
                <FormLabel>
                    Can we do better? Let us know what you'd like to see!
                </FormLabel>
                <SuggestionTextArea placeholder='Your suggestions here...'></SuggestionTextArea>
            <Button primary>Submit</Button>
            </SuggestionFormContainer>
         </>
  )
};

export default SuggestionForm;
