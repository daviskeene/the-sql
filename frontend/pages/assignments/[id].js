import Layout from '../../components/Layout'
import styled from 'styled-components'
import { BackgroundParticles } from '../../components/partials/HeroPrimary';
import React, { useEffect, useState } from 'react';
import { URL_ROOT } from '../../Environment';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'

const CodeSandbox = dynamic(import('../../components/CodeSandbox'), {
    ssr: false
});

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

    .assignment-card-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-row: auto;
        grid-gap: 12px;
        padding-top: 4rem;
      }
      
      .assignment-card {
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
    min-height: 12 rem;
    height: auto;
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
    min-height: 28rem;
    height: auto;

    overflow: visible;

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

export default function Assignment(props) {

    const router = useRouter()
    console.log(router.query)
    const { id } = router.query

    if(!id) {
        return <></>;
      }

    const [assignmentInfo, setAssignmentInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // get the assignment id from url string

    useEffect(() => {
        fetch(URL_ROOT + `/assignments/${id}/`)
          .then((res) => res.json())
          // update state with assignments
          .then((json) => {
            setAssignmentInfo(json);
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
    if (assignmentInfo.length === 0) return <>No assignment with this ID could be found!</>;

    console.log(assignmentInfo)
  
    return (
        <Layout pageTitle={"The SQL | assignments | "}>
        <Wrapper>
        <SplashScreen>

            <div className={'content half'}>
                <h1>
                    {assignmentInfo.assignment_name}
                </h1>

                <div>
                    <p>
                        {assignmentInfo.assignment_description}
                    </p>
                </div>
                <a href={`/classrooms/${assignmentInfo.classroom}`}>
                    <button css={`color: black;`}>
                        Back to Classroom
                    </button>
                </a>
            </div>

            </SplashScreen>
            <img src={'../curvedbottom.svg'} />

            <div id={'particle-js'}>
                <BackgroundParticles />
            </div>

            <FeedWrapper className={'content'}>
                <CodeSandbox isGradeable email={""} assignment_id={assignmentInfo.assignment_id} height={'30vh'} width={'50vw'} left={'25%'} top={'10vh'} name={'homepage'} value={'SELECT '} />
            </FeedWrapper>

            <EndWrapper className={'content'}>
                <img src={'../curvedbottom-blue.svg'} />
            </EndWrapper>

        </Wrapper>
        </Layout>
  )
}
