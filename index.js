require('dotenv').config();
const { PORT } = require('./src/configs');
const app = require('./app')
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
