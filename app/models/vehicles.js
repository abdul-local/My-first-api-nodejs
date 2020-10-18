const mongoose=require('mongoose')
const Schema=mongoose.Schema;
// schema vhicle
const VehicleSchema= new Schema({
    make:String,
    model:String,
    color:String
});
//export
module.exports =mongoose.model('Vehicle',VehicleSchema);