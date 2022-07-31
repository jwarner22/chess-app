import React, { useRef } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { ContactForm } from '../../Pages/Contact/Contact';
import { FormInput, FormLabel } from '../Login/LoginElements';
import { SubjectText } from '../../Pages/Contact/ContactElements';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ory3cvh', 'template_l9yyzyj', form.current, '2Amtb5lc1sBU-W3G3')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <ContactForm ref={form} onSubmit={sendEmail}>
      <FormLabel>Name</FormLabel>
      <FormInput type="text" name="user_name" />
      <FormLabel>Email</FormLabel>
      <FormInput type="email" name="user_email" />
      <FormLabel>Message</FormLabel>
      <SubjectText name="message" />
      <FormSubmit primary type="submit" value="Send" />
    </ContactForm>
  );
};

export default ContactUs;

export const FormSubmit = styled.input`
  background: ${props => props.primary ? "#1161d4" : '#EFEFFD'};
  border-radius: 35px;
  color: ${props => props.primary ? '#fff' : '#161D4E'};
  outline: none;
  border: none;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
`