const mongoose = require('mongoose');
const connectToCluster = process.env.clusterUrl;

mongoose.connect(
    connectToCluster,
    {useNewUrlParser: true, useUnifinedTopology: true}
).then((res)=>{
    console.log("Connected to DB..");
}).catch((err)=>{
    console.log(err);
})

module.exports = mongoose;

