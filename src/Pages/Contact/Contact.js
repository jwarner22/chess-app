import { info } from 'logrocket';
import styled from 'styled-components';
import { HeroContent } from '../../components/Home/HeroSection/HeroElements';
import { Column1, Column2, Heading, InfoRow, InfoWrapper, Subtitle, TextWrapper, TopLine } from '../../components/Home/InfoSection/InfoElements';
import { Container, Form, FormContent, FormWrap, FormLabel, FormInput } from '../../components/Login/LoginElements';
import { EmailContactWrapper, EmailIcon, MailToLink, SubjectText } from './ContactElements';
import email from "../../Images/email_1.png";
import ContactUs from '../../components/Forms/SemanticUIForm';


const Contact = () => {
  return (
    <Container className='page'>
      <ContactWrapper>
          <GridColumn>
        <TextWrapper>
          <TopLine>
            Contact Us
          </TopLine>
          <Heading>
            How can we help you?
          </Heading>
          <Subtitle>
            Fill out the form or drop us an email.
          </Subtitle>
        </TextWrapper>
        </GridColumn >
        <GridColumn>
        <FormWrap>
          <ContactFormContent>
            {/* <ContactForm>
              <FormLabel>Name</FormLabel>
              <FormInput type='text' />
              <FormLabel>Email</FormLabel>
              <FormInput type='email' />
              <FormLabel>Subject</FormLabel>
              <FormInput type='text' />
              <FormLabel >Message</FormLabel>
              <SubjectText type='text' />
            </ContactForm> */}

            <ContactUs/>
          </ContactFormContent>
        </FormWrap>
        </GridColumn>
        <MailToLink href='mailto:staffordchessco@gmail.com'>
        <EmailContactWrapper>
          <EmailIcon src={email} />
          staffordchessco@gmail.com
        </EmailContactWrapper>
        </MailToLink> 
      </ContactWrapper>
    </Container>
  )
}

export default Contact

export const ContactForm = styled(Form)`
  position: relative;
  width: 100%;
  max-width: 700px;
`

export const ContactWrapper = styled(InfoWrapper)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding-top: 100px;
`

export const GridColumn = styled.div`
    margin: 15px 0px;
    padding: 0 15px;
    width: 100%;
    text-align: center;
`

export const ContactFormContent = styled(FormContent)`
  width: 100%;
  max-width: 100%;
  `
