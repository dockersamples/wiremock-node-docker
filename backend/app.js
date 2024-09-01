const express = require('express');
const app = express();
const weatherRoute = require('./routes/weather');

app.use(express.json());
app.use('/weather', weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

