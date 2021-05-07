import React, { useState } from 'react';
import styled from "styled-components";
import AceEditor from 'react-ace';
import axios from 'axios';

import { URL_ROOT } from '../Environment'

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-github";

const AceContainer = styled.div`
    position: absolute;

    left: ${props=>props.left};
    right: 0;
    bottom: 0;
    top: ${props=>props.top};

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
        color: white;
        border: 1px solid green;
    }
`

const formatString = (string) => {
    return string.join("\n")
}

const formatOutput = (data) => {
    const gradePortion = data.points_earned + "/" + data.points_total + "\n"
    const resultsPortion = data.result.join("\n")
    return gradePortion + resultsPortion
}

const CodeSandbox = (props) => {

    const [code, setCode] = useState(props.value);
    const [result, setResult] = useState("");
    const [email, setEmail] = useState("");

    const body = (props.isGradeable) ? {
        "query": code,
        "email": email,
        "assignment_id": props.assignment_id
    } : {
        "query": code
    }

    const url = (props.isGradeable) ? `${URL_ROOT}/grade/` : `${URL_ROOT}/run/`

    const getResults = (e) => {
        // Grab text from the AceEditor
        axios.post(url, body).then((res) => {
            console.log(res.data)
            setResult((props.isGradeable) ? formatOutput(res.data) : formatString(res.data.result))
        }).catch((error) => {
            console.log(error)
        });
    }

    function onChange(newValue){
        setCode(newValue);
    }

    function onChangeEmail(newValue) {
        setEmail(newValue.target.value)
        console.log(email)
    }

    return(
        <AceContainer width={props.width} left={props.left} top={props.top}>
            {props.isGradeable && <label>
                Email:
                <input type="text" onChange={onChangeEmail} />
                </label>
            }
            
            <AceEditor
                mode="sql"
                theme="github"
                name={props.name}
                editorProps={{ $blockScrolling: true }}
                height={props.height}
                width={props.width}
                value={code}
                onChange={onChange}
            />

            <textarea className={'results'} value={result}/>
            
            <button className={'runnable'} onClick={getResults}>
                {props.isGradeable ? 'Grade me!' : 'Run me!'}
            </button>
    </AceContainer>
    )
}

export default CodeSandbox;