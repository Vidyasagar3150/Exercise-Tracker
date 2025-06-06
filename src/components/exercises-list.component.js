import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> | 
      <Link to={"#"} onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Link>
    </td>
  </tr>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.exerciseList = this.exerciseList.bind(this);

    this.state = {
      exercises: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/exercises/')
      .then(response => {
        this.setState({
          exercises: response.data
        });
      })
      .catch(err => console.log("Error fetching exercises:", err));
  }

  deleteExercise(id) {
    axios.delete('http://localhost:8000/exercises/' + id)
      .then(res => {
        console.log(res.data);
        this.setState({
          exercises: this.state.exercises.filter(el => el._id !== id)
        });
      })
      .catch(err => console.log("Error deleting exercise:", err));
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise 
          key={currentexercise._id}  // Added 'key' prop here
          exercise={currentexercise} 
          deleteExercise={this.deleteExercise} 
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}
