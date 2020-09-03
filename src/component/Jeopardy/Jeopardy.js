import React, { Component } from "react";
//import our service
import JeopardyService from "../Jeopardy/JeopardyService";
import jeopardyImg from "../../assets/images/Jeopardy.png";
import "../Jeopardy/jeopardy.css";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {
        id: null,
        answer: "",
        question: "",
        value: null,
        airdate: "",
        created_at: "",
        updated_at: "",
        category_id: null,
        game_id: null,
        invalid_count: null,
        category: {
          id: null,
          title: "",
          created_at: "",
          updated_at: "",
          clues_count: null,
        },
      },
      score: 0,
      submitted: false,
      answerData: {
        answer: "",
      },
    };
  }
  handleChange = (event) => {
    let answerData = this.state.answerData;
    answerData[event.target.name] = event.target.value;
  };

  //keep track of the user's score
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    let score = this.state.score;
    if (this.state.data.answer === event.target.answer.value) {
      score += this.state.data.value;
    } else {
      score -= this.state.data.value;
    }
    this.setState({ score });
    this.getNewQuestion();
    event.target.answer.value = "";
  };

  //get a new random question from the API and add it to the data object in state

  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
      console.log(this.state.data.answer);
    });
  }

  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  //display the results on the screen
  render() {
    return (
      <div className="Container">
        <div>
          <img src={jeopardyImg} alt="Jeopardy Logo" width="300px" />
        </div>
        <div className="Category">
          <strong>Category: </strong> {this.state.data.category.title}
        </div>
        <div id="grid-cell" className="Question">
          <strong>Question: </strong> {this.state.data.question}
        </div>
        <div className="Points">
          <strong>Points: </strong> {this.state.data.value}
        </div>
        <div className="UserScore">
          <strong>User Score: </strong> {this.state.score}
        </div>

        {/* Provide a way for the user to submit an answer to the question */}

        <form onSubmit={this.props.handleSubmit}>
          <div className="answerData">
            <label htmlFor="questionForm">What is ...? Who is ...?</label>
            <input type="text" name="answer" />
          </div>
          <button>Submit Answer</button>
        </form>
      </div>
    );
  }
}

export default Jeopardy;

// If the answer is correct then add the point value of the question to the user's score.
// If the answer is wrong, subtract the point value from the user's score.
// After the user answers a question display another random question from the API.
