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
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // make request to API for students
    useEffect(() => {
      fetch("http://localhost:8000/assignments/")
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
    if (students.length === 0) return <>No assignments found!</>;

    const refreshCards = () => {
      console.log("refresh");
      fetch("http://localhost:8000/assignments/")
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
        {students.map((assignment) => (
          <AssignmentCard assignment={assignment} key={assignment.assignment_id} />
        ))}
      </div>

      <button onClick={refreshCards}>Refresh</button>
      </>
    );
  };
  
const AssignmentCard = (props) => {

  // Student fields
  console.log(props.assignment);
  const { assignment_name, assignment_id, assignment_description, assignment_points, classroom } = props.assignment;
  return (
  // Render student fields in HTML
    <div className="mentor-card">
      <h2>{assignment_name} ({assignment_id})</h2>
      <p>
        Description: <strong>{assignment_description}</strong>
      </p>
      <p>
          Points: <strong>{assignment_points}</strong>
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

        axios.get(`http://localhost:8000/assignments/?search=${this.state.searchQuery}`)
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

            {(this.state.results.length > 0 ? (this.state.results.map((assignment) => (
                <AssignmentCard assignment={assignment} key={assignment.assignment_id} />
            ))) : 'No results found!')}
            </div>

        )
    }
}

const TableWrapper = styled.div`
table {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

td th {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2;}

tr:hover {background-color: #ddd;}

th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: white;
  color: black;
}

`

class AdvancedQueryTable extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      results: {}
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e);

    // make a request to the appropriate endpoint
    axios.get(`http://localhost:8000/shivangi/`)
      .then((res) => {
          console.log(res.data)
          this.setState({ results: res.data })
      }).catch((error) => {
          console.log(error)
      });
  }

  render() {

    const names = Object.keys(this.state.results);
    const counts = Object.values(this.state.results);

    return (
      <>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <input type="submit" value="Run Advanced Query" className="btn btn-success btn-block" />
        </div>
      </form>

        <TableWrapper>
          <table>
          <tr>
            <th> Classroom </th>
            <th> Students Per Classroom </th>
          </tr>
          {names.map((name, i) => (
            <tr>
              <td>{name}</td>
              <td>{counts[i]}</td>
            </tr>
          ))
          }
        </table>
      </TableWrapper>
      </>
    )
  }
}

class CreateAssignment extends Component {

    constructor(props) {
        super(props)

        this.onChangeAssignmentId = this.onChangeAssignmentId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePoints = this.onChangePoints.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onChangeTestCases = this.onChangeTestCases.bind(this);
        this.onChangeClassroom = this.onChangeClassroom.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            assignmentId: '',
            name: '',
            description: '',
            points: 0,
            code: '{}',
            testCases: '',
            classroom: 4111
        } // default state
    }

    onChangeAssignmentId(e) {
        this.setState({ assignmentId: e.target.value })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangePoints(e) {
        this.setState({ points: e.target.value })
    }

    onChangeCode(e) {
        this.setState({ code: e.target.value })
    }

    onChangeTestCases(e) {
        this.setState({ testCases: e.target.value })
    }

    onChangeClassroom(e) {
        this.setState({ classroom: e.target.value })
    }


    onSubmit(e) {
        e.preventDefault()

        const isCreate = this.state.assignmentId === '';
        const isDelete = this.state.assignmentId !== '' && (this.state.name === '' && this.state.description === '' && this.state.points === 0);

        const assignmentObject = {
            assignment_id: (isCreate) ? getRandomInt(100000) : this.state.assignmentId,
            assignment_name: this.state.name,
            assignment_description: this.state.description,
            assignment_points: this.state.points,
            assignment_code: this.state.code,
            assignment_test_cases: this.state.testCases,
            classroom: this.state.classroom
        } // modified state

        console.log('request!!')
        console.log(assignmentObject)

        if (isDelete) {
          axios.delete(`http://localhost:8000/assignments/${this.state.assignmentId}/`)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
        }

        else if (isCreate) {
          axios.post('http://localhost:8000/assignments/', assignmentObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      } else {
        axios.put(`http://localhost:8000/assignments/${this.state.assignmentId}/`, assignmentObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      }

        this.setState({
            assignmentId: '',
            name: '',
            description: '',
            points: 0,
            code: '{}',
            testCases: '',
            classroom: 4111
        })
    }


 render() {
        return (
            <FormWrapper>
            <h1>Assignments (Shivangi)</h1>
              <FormsWrapper>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Assignment Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Description</label>
                        <input type="text" value={this.state.description} onChange={this.onChangeDescription} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Points</label>
                        <input type="text" value={this.state.points} onChange={this.onChangePoints} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Test Cases</label>
                        <input type="text" value={this.state.testCases} onChange={this.onChangeTestCases} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Assignment" className="btn btn-success btn-block" />
                    </div>
                </form>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Assignment ID</label>
                        <input type="text" value={this.state.assignmentId} onChange={this.onChangeAssignmentId} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Description</label>
                        <input type="text" value={this.state.description} onChange={this.onChangeDescription} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Points</label>
                        <input type="text" value={this.state.points} onChange={this.onChangePoints} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Assignment Test Cases</label>
                        <input type="text" value={this.state.testCases} onChange={this.onChangeTestCases} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Assignment" className="btn btn-success btn-block" />
                    </div>
                </form>


                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>Assignment ID</label>
                        <input type="text" value={this.state.assignmentId} onChange={this.onChangeAssignmentId} className="form-control" />
                  </div>

                  <div className="form-group">
                      <input type="submit" value="Delete Assignment" className="btn btn-success btn-block" />
                  </div>
                </form>


                </FormsWrapper>

                <FeedWrapper>
                  <Feed />
                </FeedWrapper>

                <SearchBoxWrapper>
                    <SearchBox />
                </SearchBoxWrapper>

                <AdvancedQueryTable />
            </FormWrapper>
        )
    }
}

export default CreateAssignment;