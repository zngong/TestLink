Links= new Mongo.Collection("links");
Links.allow({
    insert: function (userId, link) {
        return userId && link.owner === userId;
    },
    update: function (userId, link, fields, modifier) {
        return userId && link.owner === userId;
    },
    remove: function (userId, link) {
        return userId && link.owner === userId;
    }
});
