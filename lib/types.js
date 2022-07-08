"use strict";
const connectDb = require("./db")
const { ObjectID } = require("mongodb");

module.exports = {
    Course:{
        people: async ({people}) => {
            let db, peopleData=[], ids=[]
            try{
                db  =await connectDb()
                if(people){
                    ids = people
                      .filter((id)=>id!=null)
                      .map((id)=>(ObjectID(id)))    
                }
                
                if( ids.length!==0 ){
                    peopleData = await db.collection("students").find(
                        {_id:{$in:ids}}
                    ).toArray()
                }
            }catch(error){
                console.log(error);
            }
            return peopleData;
        }
    },
    Person:{
        __resolveType: (person, context, info) => {
            if(person.phone){
                return "Monitor";
            }
            return "Student";
        }
    },
    GlobalSearch: {
        __resolveType: (item, context, info) => {
            if(item.title){
                return "Course"
            }else if(item.phone){
                return "Monitor";
            }else{
                return "Student";
            }
        }
    }
}
