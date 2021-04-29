import React, { useState } from 'react'
import styled from 'styled-components'
import AceEditor from 'react-ace'
import { Ace } from 'ace-builds'


const AceContainer = styled.div`
    position: absolute;

    left: 50%;
    right: 0;
    bottom: 0;
    top: 25%;

    textarea {
        position: absolute;
        left: 0;
        background-color: black;
        color: white;
        width: ${props=>props.width};
        height: 10vh;
    }

    button {
        margin-top: 12vh;
        position: absolute;
        left: -2rem;
        width: ${props => props.width};
        border-radius: 12px;
    }

    .runnable {
        color: green;
        border: 1px solid green;
    }
`

const CodeSandbox = (props) => {

    const [code, setCode] = useState(props.value ? props.value : "");

    return(
        <AceContainer width={props.width}>
            <h2>
                Try it out!
            </h2>
            <AceEditor
                mode="sql"
                theme="github"
                name={props.name}
                editorProps={{ $blockScrolling: true }}
                height={props.height}
                width={props.width}
                value={"SELECT * FROM Courses;"}
            />
            <textarea className={'results'} />
            <button className={'runnable'}>
                Run me!
            </button>
    </AceContainer>
    )
}

export default CodeSandbox;