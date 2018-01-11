petController=RouteController.extend({
    template:"petpage",
    waitOn:function(){
        return Meteor.subscribe("petProfile",this.params.petid);
		
    },
    data:function(){
        var petid=Router.current().params.petid;
        return cutethings.findOne({
            "_id":petid
        });
    }
});