import React, { useState } from 'react';
import styled from "styled-components";
import AceEditor from 'react-ace';
import axios from 'axios';
import { signin, signout, useSession } from 'next-auth/client';

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
        height: 12vh;
    }

    button {
        margin-top: 14vh;
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
    const [session, loading] = useSession();

    const body = (props.isGradeable) ? {
        "query": code,
        "email": session ? session.user.email : "",
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

    return(
        <AceContainer width={props.width} left={props.left} top={props.top}>
            
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

            <textarea className={'results'} value={result} readOnly />
            
            <button className={'runnable'} onClick={getResults}>
                {props.isGradeable ? 'Grade me!' : 'Run me!'}
            </button>
    </AceContainer>
    )
}

export default CodeSandbox;