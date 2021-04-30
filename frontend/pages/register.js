import React, { useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { BackgroundParticles } from '../components/partials/HeroPrimary';
import axios from 'axios';
import { URL_ROOT } from '../Environment';

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};

const Wrapper = styled.div`
    text-align: center;
    p {
        font-size: 1.25rem;
        font-weight: 500;
    }

    .content {
        z-index: 0;
        position: relative;
    }

    .half {
        width: 50%;
        margin: auto;
    }

    background: ${({theme}) => theme.darkBlue};
    color: white;

    #particle-js {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
`

const SplashScreen = styled.div`
    height: 12rem;
    background: white;
    color: black;
    padding-top: 2rem;


    h1 {
        font-size: 3rem;
        padding-bottom: 3rem;
    }

    img {
        width: 50%;
        height: auto;
    }

`

const TeamSection = styled.div`
    height: 28rem;
    margin-bottom: 6rem;

    h1 {
        font-size: 2.5rem;
    }
    
    .face-grid {
        text-align: center;
        width: 100%;
        margin: auto;
    }
        .face-grid .face {
          display: inline-block;
          margin: 40px; }
          @media only screen and (max-width: 700px) {
            .face-grid .face {
              margin: 10px; } }
          .face-grid .face .circle-crop {
            height: 140px;
            margin-left: auto;
            margin-right: auto;
            overflow: hidden;
            width: 140px; }
          .face-grid .face img {
            width: 100%;
            display: block;
            filter: invert(100%);
        }
          .face-grid .face strong {
            color: white;
            display: block;
            font-size: 14px;
            font-weight: bold;
            margin-top: 12px;
            text-align: center;
            text-transform: uppercase; }
          .face-grid .face span {
            color: white;
            display: block;
            font-size: 14px;
            text-align: center;
            max-width: 16rem; }
`

const ProjectSection = styled.div`
    height: 12rem;
    text-align: center;
    padding-top: 10rem;
    background-color: white;
    color: black;
    overflow: hidden;

    h1 {
        font-size: 2.5rem;
        padding-bottom: 2rem;
    }

    h2 {
        font-size: 2rem;
        padding-bottom: 1rem;
    }

    .grid {
        display: inline-grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row: auto auto;
        grid-column-gap: 4rem;
        grid-row-gap: 4rem;

        .grow { 
            transition: all .15s ease-in-out; 
            }
            
        .grow:hover { 
            transform: scale(1.05); 
        }
    }

    img {
        position: absolute;
        left: 0;
        top: -6rem;
    }

`

const NameFormWrapper = styled.div`
width: 70%;
margin: auto;
input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  input[type=submit]:hover {
    background-color: #45a049;
  }
  
  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
`

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

export function NameForm(props) {
    const { value:firstName, bind:bindFirstName, reset:resetFirstName } = useInput('');
    const { value:lastName, bind:bindLastName, reset:resetLastName } = useInput('');
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const body = {
            "student_id": getRandomInt(100000, 999999),
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "classroom": 4111
        }
        axios.post(URL_ROOT + '/students/', body).then((res) => {
            console.log(res.data)
            alert("Successfully registered person with email " + email)
            window.location.replace('/classrooms/')
        }).catch((error) => {
            console.log(error)
        });
        resetFirstName();
        resetLastName();
        resetEmail();
    }
    return (
        <NameFormWrapper>
        <form onSubmit={handleSubmit}>
            <label>
            First Name:
            <input type="text" {...bindFirstName} />
            </label>

            <label>
            Last Name:
            <input type="text" {...bindLastName} />
            </label>

            <label>
            Email:
            <input type="text" {...bindEmail} />
            </label>

            <input type="submit" value="Submit" />
        </form>
      </NameFormWrapper>
    );
  }

const Page = (props) => {
    return(
        <Layout>
            <Wrapper>
                <SplashScreen>

                <div className={'content half'}>
                    <h1>
                        Register
                    </h1>

                    <div>
                        <p>
                            Register as a student to save your grade on assignments!
                         </p>
                    </div>
                </div>
                
                </SplashScreen>
                <img src={'../curvedbottom.svg'} />

                <div id={'particle-js'}>
                    <BackgroundParticles />
                </div>

                <TeamSection className={'content'}>

                    <h1>Enter your information below.</h1>

                    <NameForm />

                </TeamSection>
            
            <ProjectSection className={'content'}>
                <img src={'../curvedbottom-blue.svg'} />
            </ProjectSection>
            </Wrapper>
        </Layout>
    )
}

export default Page;