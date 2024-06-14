const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/quizapp')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const Quiz = mongoose.model('Quiz', QuizSchema);

// Routes
app.get('/api/quizzes', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

app.post('/api/quizzes', async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.json(newQuiz);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
