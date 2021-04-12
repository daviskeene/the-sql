import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormWrapper = styled.div`
  html {
    font-size: 16px;
  }

  text-align: center;
  
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
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // make request to API for teachers
    useEffect(() => {
      fetch("http://localhost:8000/teachers/")
        .then((res) => res.json())
        // update state with teachers
        .then((json) => {
          setTeachers(json);
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
    if (teachers.length === 0) return <>No teachers found!</>;

    const refreshCards = () => {
      console.log("refresh");
      fetch("http://localhost:8000/teachers/")
        .then((res) => res.json())
        // update state with teachers
        .then((json) => {
          setTeachers(json);
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
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} key={teacher.teacher_id} />
        ))}
      </div>

      <button onClick={refreshCards}>Refresh</button>
      </>
    );
  };
  
const TeacherCard = (props) => {

  // teacher fields
  console.log(props.teacher);
  const { teacher_id, first_name, last_name, email, classroom} = props.teacher;

  return (
  // Render teacher fields in HTML
    <div className="mentor-card">
      <h2>{first_name} {last_name} ({teacher_id})</h2>
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

const SearchBoxWrapper = styled.div`
    text-align: center;
    margin-top: 5%;

`

class SearchBox extends Component {
    constructor(props) {
        super(props)

        this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this);
        this.onChangeResults = this.onChangeResults.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            searchQuery: '',
            results: []
        }
    }

    onChangeSearchQuery(e) {
        this.setState({ searchQuery : e.target.value })
    }

    onChangeResults(e) {
        this.setState({ results : e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(e);

        axios.get(`http://localhost:8000/teachers/?search=${this.state.searchQuery}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ results: res.data })
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.searchQuery} onChange={this.onChangeSearchQuery} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search Query" className="btn btn-success btn-block" />
                    </div>
            </form>

            {(this.state.results.length > 0 ? (this.state.results.map((teacher) => (
                <TeacherCard teacher={teacher} key={teacher.teacher_id} />
            ))) : 'No results found!')}
            </div>

        )
    }
}

class Createteacher extends Component {

    constructor(props) {
        super(props)

        this.onChangeteacherId = this.onChangeteacherId.bind(this);
        this.onChangeteacherFName = this.onChangeteacherFName.bind(this);
        this.onChangeteacherLName = this.onChangeteacherLName.bind(this);
        this.onChangeteacherEmail = this.onChangeteacherEmail.bind(this);
        this.onChangeclassroom = this.onChangeclassroom.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            teacherId: '',
            teacherFName: '',
            teacherLName: '',
            teacherEmail: '',
            classroom: 77273
        }
    }

    onChangeteacherId(e) {
      this.setState({ teacherId: e.target.value })
    }

    onChangeteacherFName(e) {
        this.setState({ teacherFName: e.target.value })
    }

    onChangeteacherLName(e) {
        this.setState({ teacherLName: e.target.value })
    }

    onChangeteacherEmail(e) {
        this.setState({ teacherEmail: e.target.value })
    }

    onChangeclassroom(e) {
        this.setState({ classroom: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(e);

        const isCreate = this.state.teacherId === '';
        const isDelete = this.state.teacherId !== '' && this.state.teacherFName === '' && this.state.teacherLName === '' && this.state.teacherEmail === '';

        const teacherObject = {
            teacher_id: (isCreate) ? getRandomInt(100000) : this.state.teacherId,
            email: this.state.teacherEmail,
            first_name: this.state.teacherFName,
            last_name: this.state.teacherLName,
            classroom: this.state.classroom,
        };

        console.log(teacherObject);

        if (isDelete) {
          axios.delete(`http://localhost:8000/teachers/${this.state.teacherId}/`)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
        }
        else if (isCreate) {
          axios.post('http://localhost:8000/teachers/', teacherObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      } else {
        axios.put(`http://localhost:8000/teachers/${this.state.teacherId}/`, teacherObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      }
      this.setState({ teacherId: '', teacherFName: '', teacherLName: '', teacherDescription: '', classroom: 77273 })
    }


    render() {
        return (
            <FormWrapper>
                <h1>Teachers (Cesar)</h1>
              <FormsWrapper>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Teacher First Name</label>
                        <input type="text" value={this.state.teacherFName} onChange={this.onChangeteacherFName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Teacher Last Name</label>
                        <input type="text" value={this.state.teacherLName} onChange={this.onChangeteacherLName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Teacher Email</label>
                        <input type="text" value={this.state.teacherEmail} onChange={this.onChangeteacherEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Classroom (ID)</label>
                        <input type="text" value={this.state.classroom} onChange={this.onChangeclassroom} className="form-control" />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create teacher" className="btn btn-success btn-block" />
                    </div>
                </form>

                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>Teacher ID</label>
                        <input type="text" value={this.state.teacherId} onChange={this.onChangeteacherId} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Teacher First Name</label>
                        <input type="text" value={this.state.teacherFName} onChange={this.onChangeteacherFName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Teacher Last Name</label>
                        <input type="text" value={this.state.teacherLName} onChange={this.onChangeteacherLName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Teacher Email</label>
                        <input type="text" value={this.state.teacherEmail} onChange={this.onChangeteacherEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update teacher" className="btn btn-success btn-block" />
                    </div>
                </form>


                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>teacher ID</label>
                        <input type="text" value={this.state.teacherId} onChange={this.onChangeteacherId} className="form-control" />
                  </div>

                  <div className="form-group">
                      <input type="submit" value="Delete teacher" className="btn btn-success btn-block" />
                  </div>
                </form>


                </FormsWrapper>

                <FeedWrapper>
                  <Feed />
                </FeedWrapper>

                <SearchBoxWrapper>
                    <SearchBox />
                </SearchBoxWrapper>
            </FormWrapper>
        )
    }
}

export default Createteacher;