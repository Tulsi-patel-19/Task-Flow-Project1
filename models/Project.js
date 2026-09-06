import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
         type: String,
        required: true,
        trim : true,
    },

    description :{
         type: String,
        required: true,
        trim : true,
    },

    // ref : user => objectId comes from User model 
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref :"user",
        required : true,
    },

    members:[
        {
       type : mongoose.Schema.Types.ObjectId,
       ref :"user",
    },
],

    deadline:{
        type :Date,
        required : true
    },


},
//  createAt is handle automatically by..
{
    timestamps : true,

}
);

const Project = mongoose.model("Project",projectSchema);

export default Project;