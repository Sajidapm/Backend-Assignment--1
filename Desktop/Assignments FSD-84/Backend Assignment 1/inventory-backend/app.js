const express = require('express');
const inventoryRoutes = require('./routes/inventoryRoutes');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config()
const app = express()
const port = process.env.PORT || 3001

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Inventory Backend API')
})

app.use('/api/inventory', inventoryRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})