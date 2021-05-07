import React from 'react';
import styled from "styled-components";
import Particles from "react-particles-js";
import { signin, signout, useSession } from 'next-auth/client';

import dynamic from 'next/dynamic'

const CodeSandbox = dynamic(import('../CodeSandbox'), {
  ssr: false
})

const HeroPrimaryWrapper = styled.div`
    height: 54rem;

    background-image: linear-gradient(180deg, ${({theme}) => theme.darkBlue} 0%,${({theme}) => theme.darkBlue} 35%,${({theme}) => theme.darkBlue} 250%);
    background-repeat: no-repeat;
    background-size: 100% 54rem;
    color: white;
`;

export const BackgroundParticles = (props) => {

    return (
        <Particles
            params={{
            particles: {
                number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
                },
                color: {
                value: "#ffffff"
                },
                shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                }
                },
                opacity: {
                value: 0.4,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
                },
                size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
                },
                line_linked: {
                enable_auto: true,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1,
                condensed_mode: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
                },
                move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                onhover: {
                    enable: false
                },
                onclick: {
                    enable: false
                },
                resize: true
                }
            },
            retina_detect: true
            }}
            />
            )
}



const ContentContainer = styled.div`
    position: absolute;
    left: 0;
    right: 50%;
    bottom: 0;
    top: 0;
    text-align: center;
    line-height: 50px;

    h1 {
        font-size: 5rem;
        padding-top: 12rem;
        color: #FFFFFF;
    }
`

const HeroPrimary = (props) => {

    const [session, loading] = useSession();

    return (
        <HeroPrimaryWrapper>
            <BackgroundParticles />
            <ContentContainer>
                <h1>The SQL</h1>
                <p>
                    A new look to the CS 411 course at UIUC.
                </p>
                <button>
                    <a href="/about">
                        About
                    </a>
                </button>
                <button>
                    {!session ? <a href="/api/auth/signin/">Sign In</a> : <a href="/api/auth/signout/">Sign Out</a>}
                </button>
            </ContentContainer>

            <CodeSandbox height={'20vh'} width={'30vw'} left={'50%'} top={'25%'} name={'homepage'} value={'SELECT * FROM Courses;'} />

        </HeroPrimaryWrapper>
    )
};

export default HeroPrimary;