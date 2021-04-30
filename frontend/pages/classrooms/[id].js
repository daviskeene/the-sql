import Layout from '../../components/Layout'
import styled from 'styled-components'
import { BackgroundParticles } from '../../components/partials/HeroPrimary';
import React, { useEffect, useState } from 'react';
import { URL_ROOT } from '../../Environment';
import { useRouter } from 'next/router';


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
    min-height: 28rem;
    height: auto;

    overflow: auto;

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
    const [assignments, setAssignments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // make request to API for assignments
    useEffect(() => {
      fetch(URL_ROOT + `/classroom-assignments/?id=${props.assignment_id}`)
        .then((res) => res.json())
        // update state with assignments
        .then((json) => {
          setAssignments(json['assignments']);
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
    if (assignments.length === 0) return <>No assignments Found!</>;
  
    // display results
    return (
      <div className="assignment-card-wrapper">
        {assignments.map((assignment) => (
          <AssignmentCard assignment={assignment} key={assignment.assignment_id} />
        ))}
      </div>
    );
  };
  
  const AssignmentCard = (props) => {
    const { assignment_id, assignment_name, assignment_description } = props.assignment;
    return (
        <a href={`/assignments/${assignment_id}`}>
        <div className="assignment-card">
            <h2>{assignment_name}</h2>
            <p>
            Description: <strong>{assignment_description}</strong>
            </p>
        </div>
      </a>
    );
  };

export default function Classroom(props) {

    const router = useRouter()
    console.log(router.query)
    const { id } = router.query

    if(!id) {
        return <></>;
      }

    const [classroomInfo, setClassroomInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // get the assignment id from url string

    useEffect(() => {
        fetch(URL_ROOT + `/classrooms/${id}/`)
          .then((res) => res.json())
          // update state with assignments
          .then((json) => {
            setClassroomInfo(json);
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
    if (classroomInfo.length === 0) return <>No assignment with this ID could be found!</>;

    console.log(classroomInfo)
  
    return (
        <Layout pageTitle={"The SQL | assignments | "}>
        <Wrapper>
        <SplashScreen>

            <div className={'content half'}>
                <h1>
                    {classroomInfo.classroom_name}
                </h1>

                <div>
                    <p>
                        {classroomInfo.classroom_description}
                    </p>
                </div>
                <a href="/classrooms/">
                    <button css={`color: black;`}>
                        Back to Classrooms
                    </button>
                </a>
            </div>

            </SplashScreen>
            <img src={'../curvedbottom.svg'} />

            <div id={'particle-js'}>
                <BackgroundParticles />
            </div>

            <FeedWrapper className={'content'}>
                <Feed assignment_id={id} />
            </FeedWrapper>

            <EndWrapper className={'content'}>
                <img src={'../curvedbottom-blue.svg'} />
            </EndWrapper>

        </Wrapper>
        </Layout>
  )
}
