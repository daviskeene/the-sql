import Layout from '../../components/Layout'
import styled from 'styled-components'
import { BackgroundParticles } from '../../components/partials/HeroPrimary';
import React, { useEffect, useState } from 'react';
import { URL_ROOT } from '../../Environment';
import { useSession } from 'next-auth/client';


const Wrapper = styled.div`
    text-align: center;
    height: 100%;
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

    .classroom-card-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-row: auto;
        grid-gap: 12px;
        padding-top: 4rem;
      }
      
      .classroom-card {
        padding: 2em;
        box-sizing: border-box;
        background-color: white;
        border: 1px #e3e3e3 solid;
        border-radius: 8px;
        width: 80%;
        margin: auto;
      }
`;

const SplashScreen = styled.div`
    height: 14rem;
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

const FeedWrapper = styled.div`
    height: 28rem;
    margin-bottom: 6rem;
    color: black;

    h1 {
        font-size: 2.5rem;
    }
`

const EndWrapper = styled.div`
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

    img {
        position: absolute;
        left: 0;
        top: -6rem;
    }

`

const Feed = (props) => {
    const [classrooms, setClassrooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // make request to API for classrooms
    useEffect(() => {
      fetch(URL_ROOT + "/classrooms/")
        .then((res) => res.json())
        // update state with classrooms
        .then((json) => {
          setClassrooms(json);
          setIsLoading(false);
        })
        // log errors to console
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }, []);
  
    // loading
    if (isLoading) return <>Loading...</>;
  
    // empty post load
    if (classrooms.length === 0) return <>No classrooms Found!</>;
  
    // display results
    return (
      <div className="classroom-card-wrapper">
        {classrooms.map((classroom) => (
          <ClassroomCard classroom={classroom} key={classroom.classroom_id} />
        ))}
      </div>
    );
  };
  
  const ClassroomCard = (props) => {
    const { classroom_id, classroom_name, classroom_description } = props.classroom;
    return (
        <a href={`/classrooms/${classroom_id}`}>
        <div className="classroom-card">
            <h2>{classroom_name}</h2>
            <p>
            Description: <strong>{classroom_description}</strong>
            </p>
        </div>
      </a>
    );
  };

export default function Classrooms() {

  const [session, loading] = useSession();

  return (
    <Layout pageTitle={"The SQL | Classrooms"}>
      <Wrapper>
      <SplashScreen>

        <div className={'content half'}>
            <h1>
                Classrooms
            </h1>

            <div>
                <p>
                    These are classrooms, which contain SQL assignments. Students may attempt these problems without an account,
                    or they may choose to sign in via Google to save their grades on assignments.
                </p>
            </div>

            <a href={!session ? `/api/auth/signin/` : '/profile/'}>
                    <button css={`color: black;`}>
                        {!session ? 'Sign In' : 'View Profile'}
                    </button>
            </a>
        </div>

        </SplashScreen>
        <img src={'../curvedbottom.svg'} />

        <div id={'particle-js'}>
            <BackgroundParticles />
        </div>

        <FeedWrapper className={'content'}>
            <Feed />
        </FeedWrapper>

        <EndWrapper className={'content'}>
            <img src={'../curvedbottom-blue.svg'} />
        </EndWrapper>

      </Wrapper>
    </Layout>
  )
}
