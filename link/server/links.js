Meteor.publish("links", function () {
    return Links.find({
        $or:[
            {$and:[
                {"public": true},
                {"public": {$exists: true}}
            ]},
            {$and:[
                {owner: this.userId},
                {owner: {$exists: true}}
            ]}
        ]});
});
Meteor.methods({
    addLink: function (link) {
        // Make sure the user is logged in before inserting a link
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');

        }

        Links.insert({
            name: link.name,
            url:link.url,
            img: link.img,
            public:link.public,
            owner:Meteor.userId(),
            username:Meteor.user().username
        });
    },
    setChecked: function (linkId, setChecked) {
        var link = Links.findOne(linkId);
        if (link.private && link.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error("not-authorized");

        }
        Links.update(linkId, { $set: { checked: setChecked} });
    }
});