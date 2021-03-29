import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const StyledContactForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 5%;
    padding-top: 10vh;
`;

const StyledH3 = styled.h3`
    font-weight: 600;
    font-size: 40px; 
    letter-spacing: 2px; 
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 10px; 
`;

const StyledForm =  styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledLabel = styled.label`
    font-weight: 600;
    letter-spacing: 2px; 
    padding: 1rem;
`;

const StyledNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    `;

const StyledEmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


const StyledButton = styled.button`
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.1rem;
    padding: 5px;
    margin: 10px;
    border: 1px solid purple;
    box-shadow: 0px 1px 10px -6px rgba(0,0,0,0.75);
    background-color: pink;
    :hover { 
        cursor: pointer;
    }
`;

const StyledInput = styled.input`
    width: 300px; 
    height: 20px; 
`;

const StyledTextArea = styled.textarea`
    width: 300px;
    height: 150px; 
`;

const EmptyDiv = styled.div`
    height: 78px;
`;

class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            message: '',
            send: false,
            buttonText: 'Send Message'
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    resetForm = () => {
        this.setState({
            name: '',
            message: '',
            email: '',
            buttonText: 'Message Sent!'
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.setState({
            buttonText: '...sending'
        })

        const params = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message }
            console.log(params)    
            axios
                .post('http://localhost:5000/send', params)
                .then(res => {
                    this.setState({ sent: true }, this.resetForm())
                })
                .catch(() => {
                    console.log('Message not sent');
        })
    }

    render() {
        const { name, email, message } = this.state
        return (
            <StyledContactForm>
            <EmptyDiv />
                <StyledH3> get in touch </StyledH3>
                <StyledForm onSubmit={this.submitHandler}>
                    <StyledNameContainer> 
                        <StyledLabel for="name">Your name: </StyledLabel>
                        <StyledInput type="text"
                               name="name"
                               id="name"
                               value={name}
                               onChange={this.changeHandler}></StyledInput>
                    </StyledNameContainer>
                    <StyledEmailContainer>
                    <StyledLabel for="email">Your email address: </StyledLabel>
                        <StyledInput type="text"
                               name="email"
                               id="email"
                               value={email}
                               onChange={this.changeHandler}></StyledInput>
                    </StyledEmailContainer>
                    <StyledMessageContainer>
                    <StyledLabel for="message">Your message: </StyledLabel>
                        <StyledTextArea type="textarea"
                               name="message"
                               id="message"
                               value={message}
                               onChange={this.changeHandler}></StyledTextArea>
                    </StyledMessageContainer>
                <StyledButton type="submit">{this.state.buttonText}</StyledButton>
                </StyledForm>
            </StyledContactForm>
        );
    }
}

export default ContactForm;