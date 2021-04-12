import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormWrapper = styled.div`
  html {
    font-size: 16px;
  }

  text-align: center;
  content-align: center;
  
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
    const [classrooms, setClassrooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    // make request to API for classrooms
    useEffect(() => {
      fetch("http://localhost:8000/classrooms/")
        .then((res) => res.json())
        // update state with classrooms
        .then((json) => {
          setClassrooms(json);
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
    if (classrooms.length === 0) return <>No classrooms found!</>;

    const refreshCards = () => {
      console.log("refresh");
      fetch("http://localhost:8000/classrooms/")
        .then((res) => res.json())
        // update state with classrooms
        .then((json) => {
          setClassrooms(json);
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
        {classrooms.map((classroom) => (
          <ClassroomCard classroom={classroom} key={classroom.classroom_id} />
        ))}
      </div>

      <button onClick={refreshCards}>Refresh</button>
      </>
    );
  };
  
const ClassroomCard = (props) => {

  // Classroom fields
  console.log(props.classroom);
  const { classroom_id, classroom_name, classroom_description} = props.classroom;

  return (
  // Render classroom fields in HTML
    <div className="mentor-card">
      <h2>{classroom_name} ({classroom_id})</h2>
      <p>
        Description: <strong>{classroom_description}</strong>
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

      axios.get(`http://localhost:8000/classrooms/?search=${this.state.searchQuery}`)
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

          {(this.state.results.length > 0 ? (this.state.results.map((classroom) => (
              <ClassroomCard classroom={classroom} key={classroom.classroom_id} />
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
    axios.get(`http://localhost:8000/davis/`)
      .then((res) => {
          console.log(res.data)
          this.setState({ results: res.data })
      }).catch((error) => {
          console.log(error)
      });
  }

  render() {

    const names = Object.keys(this.state.results);
    const averages = Object.values(this.state.results);

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
            <th> Name </th>
            <th> Average Score on Assignments </th>
          </tr>
          {names.map((name, i) => (
            <tr>
              <td>{name}</td>
              <td>{averages[i]}</td>
            </tr>
          ))
          }
        </table>
      </TableWrapper>
      </>
    )
  }
}


class CreateClassroom extends Component {

    constructor(props) {
        super(props)

        this.onChangeClassroomId = this.onChangeClassroomId.bind(this);
        this.onChangeClassroomName = this.onChangeClassroomName.bind(this);
        this.onChangeClassroomDescription = this.onChangeClassroomDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            classroomId: '',
            classroomName: '',
            classroomDescription: ''
        }
    }

    onChangeClassroomId(e) {
      this.setState({ classroomId: e.target.value })
    }

    onChangeClassroomName(e) {
        this.setState({ classroomName: e.target.value })
    }

    onChangeClassroomDescription(e) {
        this.setState({ classroomDescription: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(e);

        const isCreate = this.state.classroomId === '';
        const isDelete = this.state.classroomId !== '' && this.state.classroomName === '' && this.state.classroomDescription === '';

        const classroomObject = {
            classroom_id: (isCreate) ? getRandomInt(100000) : this.state.classroomId,
            classroom_name: this.state.classroomName,
            classroom_description: this.state.classroomDescription
        };

        if (isDelete) {
          axios.delete(`http://localhost:8000/classrooms/${this.state.classroomId}/`)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
        }
        else if (isCreate) {
          axios.post('http://localhost:8000/classrooms/', classroomObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      } else {
        axios.put(`http://localhost:8000/classrooms/${this.state.classroomId}/`, classroomObject)
          .then((res) => {
              console.log(res.data)
          }).catch((error) => {
              console.log(error)
          });
      }
      this.setState({ classroomId: '', classroomName: '', classroomDescription: '' })
    }


    render() {
        return (
            <FormWrapper>
              <h1>Classrooms (Davis)</h1>
              <FormsWrapper>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Classroom Name</label>
                        <input type="text" value={this.state.classroomName} onChange={this.onChangeClassroomName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Classroom Description</label>
                        <input type="text" value={this.state.classroomDescription} onChange={this.onChangeClassroomDescription} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Classroom" className="btn btn-success btn-block" />
                    </div>
                </form>

                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>Classroom ID</label>
                        <input type="text" value={this.state.classroomId} onChange={this.onChangeClassroomId} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Classroom Name</label>
                        <input type="text" value={this.state.classroomName} onChange={this.onChangeClassroomName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Classroom Description</label>
                        <input type="text" value={this.state.classroomDescription} onChange={this.onChangeClassroomDescription} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Classroom" className="btn btn-success btn-block" />
                    </div>
                </form>


                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                        <label>Classroom ID</label>
                        <input type="text" value={this.state.classroomId} onChange={this.onChangeClassroomId} className="form-control" />
                  </div>

                  <div className="form-group">
                      <input type="submit" value="Delete Classroom" className="btn btn-success btn-block" />
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

export default CreateClassroom;