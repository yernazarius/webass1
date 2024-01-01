const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/bmicalculator', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const units = req.body.units;

  if (units === 'imperial') {
    heightInMeters = height * 0.0254; 
    weightInKilos = weight * 0.453592; 
  } else {
    heightInMeters = height;
    weightInKilos = weight;
  }

  const bmi = (weightInKilos / Math.pow(heightInMeters, 2)).toFixed(2);
  let category = '';

  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 18.5 && bmi <= 24.9) category = 'Normal weight';
  else if (bmi >= 25 && bmi <= 29.9) category = 'Overweight';
  else category = 'Obesity';

  res.send(`Your BMI is ${bmi} (${category}).`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});