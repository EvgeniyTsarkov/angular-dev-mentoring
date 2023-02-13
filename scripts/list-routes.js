const fs = require('fs');
const axios = require('axios');
const endOfLine = require('os').EOL;
const courseDataPath = 'http://localhost:3004/courses';
const routesFile = './routes.txt';

axios.get(courseDataPath).then(res => {
    const routes = [];
    res.data.forEach(courseItem => {
        routes.push('courses/' + courseItem.id);
    });
    fs.writeFileSync(routesFile, routes.join(endOfLine), 'utf8');
}).catch(e => console.log(e));