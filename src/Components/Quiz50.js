import React, { useState, useEffect } from "react";
import { Typography, Paper, RadioGroup, Radio, FormControlLabel, Button, AppBar, Toolbar, Badge } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import quizData from "../QuizData/quizData.json";
import "./Quiz.css";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Quiz App</Typography>
      </Toolbar>
    </AppBar>
  );
};

const Quiz50 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState(Array(50).fill(null));
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    const shuffledQuizData = quizData.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuizData.slice(0, 50);
    setQuestions(selectedQuestions);
  }, []);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleShowSolution = () => {
    const newAnswerStatus = [...answerStatus];
    const isCorrect =
      parseInt(selectedAnswer) === questions[currentQuestionIndex].correctAnswer;
    newAnswerStatus[currentQuestionIndex] = isCorrect ? "correct" : "incorrect";
    setAnswerStatus(newAnswerStatus);

    if (isCorrect) {
      setScore(score + 1);
      setRightCount((prevRightCount) => prevRightCount + 1);
    } else {
      setWrongCount((prevWrongCount) => prevWrongCount + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setAnswerStatus(Array(50).fill(null));
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const showSolution = answerStatus[currentQuestionIndex] !== null;

  return (
    <div>
      <Navbar />
      <Paper elevation={3} className="quiz-container">
        <Typography variant="h4">Quiz App</Typography>
        <div className="question-number">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
        {currentQuestion && (
          <div className="question-container">
            <Typography variant="h6">
              Question {currentQuestionIndex + 1}
            </Typography>
            <Typography variant="body1">{currentQuestion.question}</Typography>
            <RadioGroup
              value={selectedAnswer}
              onChange={handleAnswerChange}
              className="RadioGroup"
            >
              {currentQuestion.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio />}
                  label={`${String.fromCharCode(65 + index)}. ${option}`}
                  className={
                    showSolution &&
                    (index === currentQuestion.correctAnswer
                      ? "correct"
                      : index.toString() === selectedAnswer &&
                        index !== currentQuestion.correctAnswer
                      ? "incorrect"
                      : "")
                  }
                  style={{
                    backgroundColor:
                      showSolution &&
                      (index === currentQuestion.correctAnswer
                        ? green[100]
                        : index.toString() === selectedAnswer
                        ? red[100]
                        : ""),
                  }}
                />
              ))}
            </RadioGroup>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleShowSolution}
              disabled={selectedAnswer === "" || showSolution}
            >
              Show Answer
            </Button>
            <div className="navigation-buttons">
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous Question
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNextQuestion}
                disabled={
                  currentQuestionIndex === questions.length - 1 || !selectedAnswer
                }
              >
                Next Question
              </Button>
            </div>
          </div>
        )}
        <div className="statistics">
          <Badge color="success" badgeContent={rightCount} className="badge">
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Right
            </Typography>
          </Badge>
          <span className="divider">|</span>
          <Badge color="error" badgeContent={wrongCount} className="badge">
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              Wrong
            </Typography>
          </Badge>
        </div>
        {showSolution && (
          <div className="solution-description">
            <Typography variant="body2">
              Correct Answer:{" "}
              {String.fromCharCode(65 + currentQuestion.correctAnswer)}
            </Typography>
            <Typography variant="body2">
              {currentQuestion.solutionDescription}
            </Typography>
          </div>
        )}
        {currentQuestionIndex === questions.length && (
          <div className="quiz-completed">
            <Typography variant="h6">Quiz Completed!</Typography>
            <Typography variant="body1">Your score: {score}</Typography>
          </div>
        )}
      </Paper>
      <Link to="/" style={{ textDecoration: "none", marginTop: "20px" }}>
        <Button variant="outlined" color="primary">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Quiz50;
