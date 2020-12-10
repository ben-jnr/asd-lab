import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';


const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));


require('./models/session')(app);
require('./routes/auth')(app);
require('./routes/admin')(app);
require('./routes/industry')(app);



app.listen(5000, function () {
	console.log("App is listening on port 5000!");
});
