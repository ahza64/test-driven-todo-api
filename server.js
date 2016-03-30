// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  console.log(req);
  var ask = req.query.q;
  todos.forEach(function(element, index){
    for(var key in element){
      if(element.key.indexOf(ask) || element.key === ask){
        res.json(element);
        console.log(element);

      }
    }
  });
  //burrito = element
  //for(var taco in burrito);
  //burrito.taco

  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});//search

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
  /* This endpoint responds with all of the todos
   */
});//index

app.post('/api/todos', function create(req, res) {
  var newTodos = req.body;
  todos.push(newTodos);
  newTodos._id = todos.length;
  //console.log("this is incr id", todos.length);
  res.json(newTodos);
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
});//create

app.get('/api/todos/:id', function show(req, res) {
  // var t = req.params.id;
  // res.json(todos[t-1]);
  //console.log("this is id", t);
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
   var id = parseInt(req.params.id);
   var theRight;
   for (var i = 0; i < todos.length; i++){
     if(todos[i]._id === id){
       theRight = todos[i];
     }
   }
   res.json(theRight);
});

app.put('/api/todos/:id', function update(req, res) {
  var r = parseInt(req.params.id);
  var newTask = req.body.task;
  var newDesc = req.body.description;

  todos.forEach(function(element){
    if(element._id === r){
      element.task = newTask;
      element.description = newDesc;
      res.json(element);
    }
  });

  // todos[r-1].task = newTask;
  // todos[r-1].description = newDesc;
  // res.json(todos[r-1]);



  //todos[r-1]._id =
  //console.log(req.params.id);
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var s = parseInt(req.params.id);
  console.log(s);
  for (var i = 0; i < todos.length; i++){
    if(todos[i]._id === s){
      todos.splice(i, 1);
    }
  }
  res.json(todos);
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
