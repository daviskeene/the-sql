import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Font Awesome styling stuffs
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

// Footer styles wrapper
const FooterWrapper = styled.footer`
    margin-top: .5rem;
    padding: .5rem;
    background-color: rgba(0, 0, 0, 0);
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    
    .icons {
        cursor: default;
        list-style: none;
        padding-left: 0;
    }

    .icons li {
        display: inline-block;
        padding: 0 0.75em 0 0;
    }
`

// Footer
const Footer = () => (
    <FooterWrapper>
        <ul className={"icons"}>
            <li>
                <a href="https://www.facebook.com/illinoislabs">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
            </li>

            <li>
                <a href="https://www.instagram.com/dakeenekid/">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </li>

            <li>
                <a href="https://www.linkedin.com/in/daviskeene/">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </li>

            <li>
                <a href="mailto:dbkeene.tsyc@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </li>
        </ul>

        <p>The SQL Team © 2021</p>
    </FooterWrapper>
);

export default Footer;