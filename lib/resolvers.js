"use strict";

const connectDb = require("./db");
const { ObjectID } = require("mongodb");
const mutations = require("./mutations");
const types = require("./types");
// const courses = [
//     {
//         _id:"anyid",
//         title:"mi title",
//         teacher: "my teacher",
//         description: "description",
//         topic: "develop"
//     },
//     {
//         _id:"anyid2",
//         title:"mi title",
//         teacher: "my teacher",
//         description: "description",
//         topic: "develop"
//     },
//     {
//         _id:"anyid3",
//         title:"mi title",
//         teacher: "my teacher",
//         description: "description",
//         topic: "develop"
//     }
// ]
module.exports = {
    Query:{
        getCourses: async () => {
            let db, courses = []
            try{
                db = await connectDb();
                courses = await db.collection("courses").find().toArray();
            }catch(error){
                console.log(error);
            }
            return courses;
        },
        getNotes: async () => {
            let db, notes = []
            try{
                db = await connectDb();
                notes = await db.collection("notes").find().toArray();
            }catch(error){
                console.log(error);
            }
            return notes;
        },
        getMatters: async () => {
            let db, notes = []
            try{
                db = await connectDb();
                notes = await db.collection("matters").find().toArray();
            }catch(error){
                console.log(error);
            }
            return notes;
        },
        getCourse: async (root, args) => {
            let db, course = {}
            try{
                db = await connectDb();
                course = await db.collection("courses").findOne({_id:new ObjectID(args.id)});
            }catch(error){
                console.log(error);
            }
            return course;
        },
        getStudents: async () => {
            let db, students = []
            try{
                db = await connectDb();
                students = await db.collection("students").find().toArray();
            }catch(error){
                console.log(error);
            }
            return students;
        },
        getStudent: async (root, args) => {
            let db, student = {}
            try{
                db = await connectDb();
                student = await db.collection("students").findOne({_id:new ObjectID(args.id)});
            }catch(error){
                console.log(error);
            }
            return student;
        },
        getMatter: async (root, args) => {
            throw new Error("errorcito")
            let db
            let items
            let courses
            let people
            try{
                db = await connectDb();
                // courses = await db.collection("courses").find({$text:{$search:keyword}}).toArray();
                courses = await db.collection("courses").find({title:keyword}).toArray();
                people = await db.collection("students").find({name:keyword}).toArray();
                items = [...courses, ...people]
            }catch(error){
                console.log(error);
            }
            return items;
        },
        searchItems: async (root, {
            keyword
          }) => {
            let db
            let items
            let courses
            let people
        
            try {
              db = await connectDb()
              courses = await db.collection('courses').find().toArray()
              people = await db.collection('students').find().toArray()
              items = [...courses, ...people]
            } catch (error) {
              errorHandler(error)
            }
        
            return items
          }
    },
    Mutation:mutations,
    ...types
}

//query sample
// {getCourse(id: "61a2fcd1f3eded64335bc7b3") {
//   title
// }}

//query sample get all
// {getCourses{
//   title
// }}


// 61a3c139ff05f4b21e79fa28
// 61a3b8cd1fa566f03a7d6570


// query con alias y fragments

// fragment CourseFields on Course{
//   _id
//   title
//   description
// }
  
// query{
//   AllCourses:getCourses{
//     _id
//     title
//   }
  
  
//   Course1: getCourse(id:"61a30357f3eded64335bc7b6"){
//     _id
//     title
//   }
  
//   Course2: getCourse(id:"61a308ce17ba4e3385ea0c2e"){
//     ...CourseFields
//     people {
//       _id
//       name
//       email
//     }
//   }
// }




// variables muation in que query
// mutation addPersonToCourse1($course: ID!, $person: ID!){
//   addPeople(courseID: $course, personID: $person){
//     _id
//     title
//   }
// }

// Query body
// {
//   "course":"",
//   "person": ""
// }


// 61a30357f3eded64335bc7b6
// 61a326179913be4df2421fd0


// graphql body
// query getCourse ($course: ID!){
//   getCourse(id:$course){
//     _id
//   }
// }



// graphql params
// {
//   "course": "61a30357f3eded64335bc7b6"
// }





// query
// mutation createNewCourse($createInput: CourseInput!){
//   createCourse(input:$createInput){
    
//   }
// }



// params
// {
//   "createInput": {
//     "title": "mi tittle",
//     "teacher": "francisco",
//     "description": "example 5",
//     "topic": "devlop"
//   }
// }





// mutation createNewCourse($createInput: CourseInput!){
//   createCourse(input:$createInput){
//     _id
//   }
// }


// {
//   "createInput": {
//     "title": "mi tittle",
//     "teacher": "francisco",
//     "description": "example 5",
//     "topic": "devlop",
//     "level":"asfdasdf"
//   }
// }




// query con interfaces
// query{
//   getStudents{
//     _id
//     name
//     email
//     ... on Monitor{
//       phone
//     }
//   }
// }





// query getPeople($monitor:Boolean!, $noName:Boolean!){
//   getStudents{
//     _id
//     email
//     ... on Student @skip(if: $noName){
//       name
//     }
//     ... on Monitor @include(if: $monitor){
//       phone
//     }
//   }
// }

//params
// {
//   "monitor": true,
//   "noName": true
// }




// query{
//   searchItems(keyword:"jose"){
//     __typename
//     ... on Course{
//       title
//       description
//     }
    
//     ... on Monitor{
//       name
//       phone
//     }
    
//     ... on Student{
//       name
//       email
//     }
//   }
// }