"use strict";
const connectDb = require("./db");
const { ObjectID } = require("mongodb");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topic: "",
    };

    const newCourse = Object.assign(defaults, input);

    let db, course;
    try {
      db = await connectDb();
      course = await db.collection("courses").insertOne(input);
      newCourse._id = course.insertedId;
    } catch (error) {
      console.log(error);
    }
    return newCourse;
  },
  createNote: async (root, { input }) => {
    const newNote = input;

    let db, course;
    try {
      db = await connectDb();
      course = await db.collection("notes").insertOne(input);
      newNote._id = course.insertedId;
    } catch (error) {
      console.log(error);
    }
    return newNote;
  },
  createMatter: async (root, { input }) => {
    const newMatter = input;

    let db, course;
    try {
      db = await connectDb();
      course = await db.collection("matters").insertOne(input);
      newMatter._id = course.insertedId;
    } catch (error) {
      console.log(error);
    }
    return newMatter;
  },
  createStudent: async (root, { input }) => {
      const newStudent = input;
    let db, student;
    try {
      db = await connectDb();
      student = await db.collection("students").insertOne(input);
      newStudent._id = student.insertedId;
    } catch (error) {
      console.log(error);
    }
    return newStudent;
  },
  editCourse: async (root, {id, input}) => {
    let db, course;
    try {
      db = await connectDb();
      await db.collection("courses").updateOne(
          {_id: new ObjectID(id)},
          { $set: input }
      );
      
       
      course = await db.collection("courses").findOne({
          _id: ObjectID(id)
      })
    } catch (error) {
      console.log(error);
    }
    return course;
  },
  deleteCourse: async (root, {id}) => {
    let db, course;
    try {
      db = await connectDb();
      const result = await db.collection("courses").deleteOne(
          {_id: new ObjectID(id)}
      );
      console.log("all was good");
    } catch (error) {
      console.log(error);
    }
    return {_id:id};
  },
  editStudent: async (root, {id, input}) => {
    let db, student;
    try {
      db = await connectDb();
      await db.collection("students").updateOne(
          {_id: new ObjectID(id)},
          { $set: input }
      );
      
       
      student = await db.collection("students").findOne({
          _id: ObjectID(id)
      })
    } catch (error) {
      console.log(error);
    }
    return student;
  },
  addPeople: async (root, {courseID, personID}) => {
      let db, person, course, student
    try{
        db = await connectDb();
        course = await db.collection("courses").findOne({_id:new ObjectID(courseID)});
        student = await db.collection("students").findOne({_id:new ObjectID(personID)});
        
        if(!course || !student){
            throw new Error("the course or person does not exist")
        }
        
        await db.collection("courses").updateOne(
            {_id:ObjectID(courseID)},
            { $addToSet: {people: ObjectID(personID)} }
        )
        
        course = await db.collection("courses").findOne({_id:new ObjectID(courseID)});
    }catch(error){
        console.log(error);
    }
    
    return course
  },
  addNote: async (root, {matterID, noteID}) => {
    let db, matter, note, matters, notes
    try{
        db = await connectDb();
        matters = await db.collection("matters").findOne({_id:new ObjectID(matterID)});
        notes = await db.collection("notes").findOne({_id:new ObjectID(noteID)});
        
        if(!notes || !matters){
            throw new Error("the matter or note does not exist")
        }
        
        await db.collection("matters").updateOne(
            {_id:ObjectID(matterID)},
            { $addToSet: {notes: ObjectID(noteID)} }
        )
        
        matter = await db.collection("matters").findOne({_id:new ObjectID(matterID)});
    }catch(error){
        console.log(error);
    }
    
    return matter
  }
};

// query mutation sample
// mutation{
//   createCourse(input:{
//     title:"uno",
//     description:"dos",
//     topic:"hasta mañana"
//   }){
//     _id
//     title
//     description
//   }
// }


//61a30357f3eded64335bc7b5
//61a326002cf0a4206e778934
