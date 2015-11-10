Meteor.startup(function () {
    //如果数据库中没有数据，则自动添加一下数据
    if (Links.find().count() ===0) {
        var links = [
            {'name': 'google',
                'url': 'http://www.google.com',
               'img':"images/icons8.png",
                'public':"true"
            },
            {   'name': 'baidu',
                'url': 'http://www.baidu.com',
                'img':"images/icons6.png",
                'public':"true"
            }

        ];
        //循环遍历插入数据
        for (var i = 0; i < links.length; i++) {
            Links.insert({name: links[i].name, url: links[i].url, img: links[i].img,public:links[i].public});
        }
    }
});
