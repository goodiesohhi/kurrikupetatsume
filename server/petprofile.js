Meteor.publish("petProfile",function(petid){
    // simulate network latency by sleeping 2s
    Meteor._sleepForMs(2000);
    // try to find the user by username
    var pet=cutethings.findOne({
        "_id":petid
    });
    // if we can't find it, mark the subscription as ready and quit
    if(!pet){
        this.ready();
        return;
    }
    
   
        return cutethings.find(pet._id);
    
});