import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { BackgroundParticles } from '../components/partials/HeroPrimary';
import dynamic from 'next/dynamic'

const CodeSandbox = dynamic(import('../components/CodeSandbox'), {
    ssr: false
});  

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
    height: 18rem;
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
            max-width: 20rem; }
`

const ProjectSection = styled.div`
    height: 36rem;
    text-align: center;
    padding-top: 10rem;
    background-color: #c2b280;
    color: white;
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

const Page = (props) => {
    return(
        <Layout>
            <Wrapper>
                <SplashScreen>

                <div className={'content half'}>
                    <h1>
                        SQL Sandbox
                    </h1>

                    <div>
                        <p>
                            CS 411 is a databse systems class. Therefore, we feel as though it's important for you to be able to experiment with different
                            queries and SQL practices whenever you'd like. Additionally, the output you receieve should be easy to read, fast, and user
                            friendly.
                         </p>
                         <p>
                             The SQL sandbox is geared towards doing just this- allowing you to play around with our own example tables.
                         </p>
                    </div>
                </div>
                
                </SplashScreen>
                <img src={'../curvedbottom.svg'} />

                <div id={'particle-js'}>
                    <BackgroundParticles />
                </div>

                <TeamSection className={'content'}>

                    <h1>SQL Tables For Querying</h1>
                    <p css={'width: 50%; margin: auto; font-size: 1.25rem; font-weight: 500;'}>
                        We have three tables that you can query from in the sandbox: Courses, Enrollments, and Students.
                    </p>

                    <article className={"face-grid"}>
                        <div className={"face"}>
                            <div className={"circle-crop"}><img src="../courses.png"/></div>
                            <u><b><h2>Courses</h2></b></u>
                            <span>
                                <p><b><u>CRN</u></b> - INT</p>
                                <p><b>Title</b> - VARCHAR(255)</p>
                                <p><b>Department</b> - VARCHAR(100)</p>
                                <p><b>Instructor</b> - VARCHAR(255)</p>
                            </span>
                        </div><div className="face">
                            <div className="circle-crop"><img src="../enrollments.png"/></div>
                            <u><b><h2>Enrollments</h2></b></u>
                            <span>
                                <p><b><u>NetId</u></b> - VARCHAR(10)</p>
                                <p><b><u>CRN</u></b> - INT</p>
                                <p><b>Credits</b> - INT</p>
                                <p><b>Score</b> - REAL</p>
                            </span>
                        </div><div className="face">
                            <div className="circle-crop"><img src="../studnets.png"/></div>
                            <u><b><h2>Students</h2></b></u>
                            <span>
                                <p><b><u>NetId</u></b> - VARCHAR(10)</p>
                                <p><b>FirstName</b> - VARCHAR(255)</p>
                                <p><b>LastName</b> - VARCHAR(255)</p>
                                <p><b>Department</b> - VARCHAR(100)</p>
                            </span>
                        </div>
                    </article>
                </TeamSection>
            
            <ProjectSection className={'content'}>
                <img src={'../curvedbottom-blue.svg'} />
                <h1>The Sandbox</h1>
                <CodeSandbox height={'40vh'} width={'60vw'} left={'20%'} top={'10vh'} name={'homepage'} value={'SELECT * FROM Courses;'} />
            </ProjectSection>
            </Wrapper>
        </Layout>
    )
}

export default Page;