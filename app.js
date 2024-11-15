var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var mongoose = require('mongoose');

const conn = require('./config/db');
const Loc = require('./config/locationmodel');



var app = express();

var router = express.Router();


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);


const  getLocation = async (req, res) => {
  console.log('in location controler');
  console.log(req.params.locId);

  await Loc.findById(req.params.locId)
    .then(doc => {
      if (!doc) {
        return res
        .status(404)
        .json({
        "message": "location not found"
        });
      }

     return res
            .status(200)
            .json(doc);
    })
    .catch(err=> {

      return res
              .status(404)
              .json(err);

    });

  }
 
    
  const  delLocation = async (req, res) => {
    console.log('in location controler');
    console.log(req.params.locId);
  
    await Loc.findByIdAndDelete(req.params.locId)
      .then(doc => {
        if (!doc) {
          return res
          .status(404)
          .json({
          "message": "location not found"
          });
        }
  
       return res
              .status(200)
              .json(doc);
      })
      .catch(err=> {
  
        return res
                .status(404)
                .json(err);
  
      });
  
    }
   
  
    const  insertLocation = async (req, res) => {
     await Loc.create(
                      {
                          name     : req.body.name,
                          facilities: req.body.facilities,
                          rating    : req.body.rating
                      })

                      .then(doc => {
                        if (!doc) {
                          return res
                          .status(404)
                          .json({
                          "message": "location not found"
                          });
                        }
                       return res
                              .status(200)
                              .json(doc);
                      })
                      .catch(err=> {
                        return res
                                .status(404)
                                .json(err);
                      });
        }                       



        const  updateLocation = async (req, res) => {

          await Loc.findByIdAndUpdate(
                          req.params.locId,
                          req.body,
                          { new: true, runValidators: true })

                                                
                           .then(doc => {
                             if (!doc) {
                               return res
                               .status(404)
                               .json({
                               "message": "location not found"
                               });
                             }
                            return res
                                   .status(200)
                                   .json(doc);
                           })
                           .catch(err=> {
                             return res
                                     .status(404)
                                     .json(err);
                           });
             }                              

 
        

router
  .route('/locations/:locId')
	.get(getLocation)
  .delete(delLocation)
  .put(updateLocation);

router
  .route('/locations')
  .post(insertLocation);



 app.use('/',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
