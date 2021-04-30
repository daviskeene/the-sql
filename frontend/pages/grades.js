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

  .grade-card-wrapper {
      color: black;
  }
`

const FeedWrapper = styled.div`

  text-align: center;
  margin-top: 5%;

`
  
const GradeCard = (props) => {

  // Classroom fields
  console.log(props.ag);
  const { assignment_name, points_earned, points_total} = props.ag;

  return (
  // Render classroom fields in HTML
    <div className="mentor-card">
      <h2>{assignment_name} ({points_earned} / {points_total})</h2>
    </div>
  );
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

export function NameForm(props) {
    const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
    const [assignments, setAssignments] = useState([]);
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const body = {
            "email": email
        }

        axios.post(URL_ROOT + '/assignments-per-student/', body).then((res) => {
            console.log(res.data)
            setAssignments(res.data.result)
        }).catch((error) => {
            console.log(error)
        });
        resetEmail();
    }
    return (
        <NameFormWrapper>
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input type="text" {...bindEmail} />
            </label>

            <input type="submit" value="Submit" />
        </form>

      <div className="grade-card-wrapper">
        {assignments.length > 0 ? assignments.map((ag) => (
          <GradeCard ag={ag} key={ag.assignment_grade_id} />
        )) : "No results! Email invalid, or no email found."}
      </div>
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
                        Grades
                    </h1>

                    <div>
                        <p>
                            Enter your email here to view all your assignment grades.
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