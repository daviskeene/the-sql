import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormWrapper = styled.div`
  html {
    font-size: 16px;
  }
  
  body {
    font: 100% / 1.414 sans-serif;
  }
  
  form {
    margin-top: 10%;
    margin-right: auto;
    margin-left: auto;
    max-width: 320px;
  }
  
  fieldset {
    padding: 0;
    margin: 0;
    border: 0;
    
    & + & {
      margin-top: 24px;
    }
  }
  
  label {
    margin-bottom: 8px;
    display: block;
    color: #2b2e4a;
  }
  
  input:not([type=checkbox]):not([type=radio]),
  select,
  textarea {
    padding: 16px;
    width: 100%;
    border-top: 0;
    border-right: 0;
    border-bottom: 1px solid #bdc3c7;
    border-left: 0;
    transition: border-bottom-color .15s ease-in;
    
    &:focus {
      outline: 0;
      border-bottom-color: #3fc1c9;
    }
  }
  
  input[type=checkbox],
  input[type=radio] {
    margin-right: 8px;
  }
  
  textarea {
    resize: vertical;
  }
  
  button {
    margin-right: auto;
    margin-left: auto;
    display: block;
    padding: 8px 16px 8px 8px;
    font-size: 16px;
    color: #fff;
    background-color: #3fc1c9;
    border: 0;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color .15s ease-in;
    
    &:focus:active {
      background-color: darken(#3fc1c9, 8%);
    }
    
    &:focus {
      outline: 0;
    }
    
    &:hover {
      background-color: lighten(#3fc1c9, 15%);
    }
  }
  
`

const FormsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const FeedWrapper = styled.div`
  text-align: center;
  margin-top: 5%;
  
`

const Feed = (props) => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // make request to API for students
    useEffect(() => {
      fetch("http://localhost:8000/students/")
        .then((res) => res.json())
        // update state with students
        .then((json) => {
          setStudents(json);
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
    if (students.length === 0) return <>No students found!</>;

    const refreshCards = () => {
      console.log("refresh");
      fetch("http://localhost:8000/students/")
        .then((res) => res.json())
        // update state with students
        .then((json) => {
          setStudents(json);
          setIsLoading(false);
        })
        // log errors to console
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }   
  
    // display results
    return (
    <>
      <div className="mentor-card-wrapper">
        {students.map((student) => (
          <StudentCard student={student} key={student.studentId} />
        ))}
      </div>

      <button onClick={refreshCards}>Refresh</button>
      </>
    );
  };
  
const StudentCard = (props) => {

  // Student fields
  console.log(props.student);
  const { student_id, email, first_name, last_name, classroom} = props.student;
  return (
  // Render student fields in HTML
    <div className="mentor-card">
      <h2>{first_name} {last_name} ({student_id})</h2>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <p>
          Classroom: <strong>{classroom}</strong>
      </p>
    </div>
  );
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class CreateStudent extends Component {

    constructor(props) {
        super(props)

        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onChangestudentEmail = this.onChangestudentEmail.bind(this);
        this.onChangestudentFirstName = this.onChangestudentFirstName.bind(this);
        this.onChangestudentLastName = this.onChangestudentLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            studentId: '',
            studentEmail: '',
            studentFirstName: '',
            studentLastName: ''
        }
    }

    onChangeStudentId(e) {
        this.setState({ studentId: e.target.value })
    }

    onChangestudentEmail(e) {
        this.setState({ studentEmail: e.target.value })
    }

    onChangestudentFirstName(e) {
        this.setState({ studentFirstName: e.target.value })
    }

    onChangestudentLastName(e) {
        this.setState({ studentLastName: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(e);

        const isCreate = this.state.studentId === '';
        const isDelete = this.state.studentId !== '' && this.state.studentEmail === '' && this.state.studentFirstName === '' && this.state.studentLastName === '';

        const studentObject = {
            student_id: (isCreate) ? getRandomInt(100000) : this.state.studentId,
            email: this.state.studentEmail,
            first_name: this.state.studentFirstName,
            last_name: this.state.studentLastName,
            classroom: 77273
        };

        if (isDelete) {
          axios.delete(`http://localhost:8000/students/${this.state.studentId}/`)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
        }

        else if (isCreate) {
          axios.post('http://localhost:8000/students/', studentObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      } else {
        axios.put(`http://localhost:8000/students/${this.state.studentId}/`, studentObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      }

        this.setState({ studentId: '', studentEmail: '', studentFirstName: '' , studentLastName: ''})
    }


 render() {
        return (
            <FormWrapper>
              <FormsWrapper>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Student Email</label>
                        <input type="text" value={this.state.studentEmail} onChange={this.onChangestudentEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Student First Name</label>
                        <input type="text" value={this.state.studentFirstName} onChange={this.onChangestudentFirstName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Student Last Name</label>
                        <input type="text" value={this.state.studentLastName} onChange={this.onChangestudentLastName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Student" className="btn btn-success btn-block" />
                    </div>
                </form>

                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>Student ID</label>
                        <input type="text" value={this.state.studentId} onChange={this.onChangeStudentId} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Student Email</label>
                        <input type="text" value={this.state.studentEmail} onChange={this.onChangestudentEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Student First Name</label>
                        <input type="text" value={this.state.studentFirstName} onChange={this.onChangestudentFirstName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Student Last Name</label>
                        <input type="text" value={this.state.studentLastName} onChange={this.onChangestudentLastName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Student" className="btn btn-success btn-block" />
                    </div>
                </form>


                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>Student ID</label>
                        <input type="text" value={this.state.studentId} onChange={this.onChangeStudentId} className="form-control" />
                  </div>

                  <div className="form-group">
                      <input type="submit" value="Delete Student" className="btn btn-success btn-block" />
                  </div>
                </form>


                </FormsWrapper>

                <FeedWrapper>
                  <Feed />
                </FeedWrapper>
            </FormWrapper>
        )
    }
}

export default CreateStudent;