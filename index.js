const express = require("express");

const app = express();
app.post("/user/signup", function (req, res) {
  
  res.jso({
     message: "Signed Up!!";
  })
});

app.post("user/login",function(req,res){
  res.json({
    message: "You are signin!!"
  })
})

app.get("/course",function(req,res){
  res.json({
    message : "Course List"
  })
})

app.get("/course/purchase",function(req,res){
  message: "Course List"
})

app.get("/user/purchasedCourse",function(req,res){
  res.json({
    message: "Your purchased courses"
  })
})
app.listen(3000);
