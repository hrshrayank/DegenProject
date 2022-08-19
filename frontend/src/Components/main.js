// Node packages for file system
var fs = require('fs');
var path = require('path');
const csv = require('csv-parser')

const results = [];

function Main(){

    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        fs.writeFileSync("text.json", JSON.stringify(results), 'utf8', 
        function(err){console.log(err);})
        // console.log(results);
      });
      return results
}
Main()

