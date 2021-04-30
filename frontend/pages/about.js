import React from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { BackgroundParticles } from '../components/partials/HeroPrimary';

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

const Page = (props) => {
    return(
        <Layout>
            <Wrapper>
                <SplashScreen>

                <div className={'content half'}>
                    <h1>
                        About
                    </h1>

                    <div>
                        <p>
                        Welcome to TheSQL!

                        Our mission is to introduce an improved and cooler platform for conducting the CS 411 Database Systems course. 
                        The SQL is a database-web application that will work towards providing a convenient and. A better functional interface for students and teachers alike. It is a unified platform for SQL learning with all sections, assignments, and grades at one place. It also provides a unique playground to test out SQL queries for fun and practice. An auto-grader for the assignments is built into the platform. New students, teachers, classrooms, and assignments can be added to the database through form submissions as well. TheSQL is the hip new platform for CS 411.
                         </p>
                    </div>
                </div>
                
                </SplashScreen>
                <img src={'../curvedbottom.svg'} />

                <div id={'particle-js'}>
                    <BackgroundParticles />
                </div>

                <TeamSection className={'content'}>

                    <h1>Features of The SQL</h1>
                    <p css={'width: 50%; margin: auto; font-size: 1.25rem; font-weight: 500;'}>
                        This webpage is more than just a teaching tool.
                    </p>

                    <article className={"face-grid"}>
                        <div className={"face"}>
                            <div className={"circle-crop"}><img src="../checkmark.png"/></div>
                            <strong>Autograder for Fast Grading</strong>
                            <span>We have our own grader of SQL queries that will give you fractional points based on your query performance.</span>
                        </div><div className="face">
                            <div className="circle-crop"><img src="../sandbox.png"/></div>
                            <strong>SQL Sandbox</strong>
                            <span>Real SQL sandbox environments allow you to test your queries fast and learn faster. Play around with the one on the homepage!</span>
                        </div><div className="face">
                            <div className="circle-crop"><img src="../classroom.png"/></div>
                            <strong>Open Classrooms</strong>
                            <span>Learning SQL should be for all people. This is why we are allowing anyone to attempt SQL problems, grades only being saved for students.</span>
                        </div>
                    </article>
                </TeamSection>
            
            <ProjectSection className={'content'}>
                <img src={'../curvedbottom-blue.svg'} />
            </ProjectSection>
            </Wrapper>
        </Layout>
    )
}

export default Page;