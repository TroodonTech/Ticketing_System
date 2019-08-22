var express = require('express'),
    path = require('path'),
    http = require('http');
var config = require('./config');
var mysql = require("mysql");
var url = require('url');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var jwtsecret = config.app.jwtsecret;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../dist/mdb-angular-free')));
app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
var config = {};
config.db = {};

config.db.host = "192.168.1.113";
config.db.user = "root";
config.db.password = "root";
config.db.database = "ticketingsystem";

var connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
});

function supportCrossOriginScript(req, res, next) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}

var user_return = '';
var employeeid_return = '';
app.options('/authenticate', supportCrossOriginScript);
app.post('/authenticate', supportCrossOriginScript, function (req, res) {
    var usrnme = req.body.username;
    var pswd = req.body.password;
    console.log("usrnme " + usrnme + " pswd " + pswd);
    connection.query('set @usrnme=?;set @pswd=?; call usp_login(@usrnme,@pswd)', [usrnme, pswd], function (err, employees) {
        if (err) {
            console.log("INSIDE errr() condition in /authenticate " + JSON.stringify(err));
        }
        console.log("entire response  " + JSON.stringify(employees));

        if (!employees[2][0]) {// if returns a void json like '[]'

            console.log('Wrong user or password');

            res.end('Wrong user or password');
            return;
        }
        else {
            user_return = employees[2][0]["username"];
            name_return = employees[2][0]["user"];
            role_return = employees[2][0]["userrolename"];
            employeeid_return = employees[2][0]["employee_id"];

            profile1 = {
                username: user_return,
                name: name_return,
                role: role_return,
                employeeid: employeeid_return,
            };
            var jwttoken = jwt.sign(profile1, jwtsecret, { expiresIn: '4h' });

            res.cookie('refresh-token', jwttoken, 'httpOnly', 'secure')
                .json({ token: jwttoken });
            console.log("jwttoken" + jwttoken);

            console.log("NewItem  is  " + JSON.stringify(employees[2]));
            res.end(JSON.stringify(employees[2]));
        }
        res.end();
    });
});



app.get('/getIssueType', function (req, res) {

    connection.query('call usp_getIssueType()', function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("addnamess  is  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});

app.get('/getpriority', function (req, res) {

    connection.query('call usp_getpriority()', function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("addnamess  is  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});


app.options('/submitIssue', supportCrossOriginScript);
app.post('/submitIssue', supportCrossOriginScript, function (req, res) {
    var issuetype = req.body.issuetype;
    var descrip = req.body.descrip;
    var priority = req.body.priority;

    connection.query('set @issuetype=?;set @descrip=?;set @priority=?;  call usp_submitissue(@issuetype,@descrip,@priority)', [issuetype, descrip, priority], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[3]));

            res.end(JSON.stringify(rows[3]));
        }
        res.end();
    });

});




app.get('/search', function (req, res) {
    var word = url.parse(req.url, true).query['value'];
    connection.query('set @word=?;call usp_find(@word)', [word], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});

app.get('/buyviewapi', function (req, res) {
    // var userid = url.parse(req.url, true).query['USERID'];
    connection.query('call usp_buyview()', function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});

app.get('/incartapi', function (req, res) {
    var proid = url.parse(req.url, true).query['productid'];
    var quan = url.parse(req.url, true).query['Quantity'];
    connection.query('set @proid=?;set @quan=?; call usp_insertintocart(@proid,@quan)', [proid, quan], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});
app.get('/cartviewapi', function (req, res) {
    // var value = url.parse(req.url, true).query['value'];
    connection.query('call usp_cartview()', function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});
app.get('/updateuser', function (req, res) {
    var emailaddress = url.parse(req.url, true).query['emailid'];
    var firstname = url.parse(req.url, true).query['FirstName'];
    var lastname = url.parse(req.url, true).query['LastName'];
    var id = url.parse(req.url, true).query['ID'];
    connection.query('set @emailaddress=?;set @firstname=?;set @lastname=?;set @id=?; call usp_updateuser(@emailaddress,@firstname,@lastname,@id)', [emailaddress, firstname, lastname, id], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[4]));
        }
        res.end();
    });

});
app.get('/purchaseapi', function (req, res) {
    var productid = url.parse(req.url, true).query['proid'];
    var cartid = url.parse(req.url, true).query['cartid'];
    var cartquan = url.parse(req.url, true).query['cartquantity'];
    var amount = url.parse(req.url, true).query['sum'];
    connection.query('set @productid=?;set @cartquan=?;set @amount=?; set @cartid=?; call usp_insertintopurchase(@productid,@cartquan,@amount,@cartid)', [productid, cartquan, amount, cartid], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[3]));

            res.end(JSON.stringify(rows[4]));
        }
        res.end();
    });

});

app.get('/removeapi', function (req, res) {
    var cartid = url.parse(req.url, true).query['idcart'];
    connection.query('set @cartid=?; call usp_removecart(@cartid)', [cartid], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});
// app.post('/updateapi', function (req, res) {
//     var editkey = req.body.edkey;
//     var editname = req.body.edname;
//     var editage = req.body.edage;
//     var editaddr = req.body.edaddr;
//     var editphone = req.body.edphone;
//     var editemail = req.body.edemail;
//     //  var Mark = url.parse(req.url, true).query['Mark'];
//     //console.log("/insertItem@prid"+prid+'@bno'+bno+'@edate'+edate+'@qn'+qn+'@price'+price);
//     connection.query('set @editkey=?;set @editname=?; set @editage=?; set @editaddr=?; set @editphone=?; set @editemail=?; call usp_editdetails(@editkey,@editname,@editage,@editaddr,@editphone,@editemail)', [editkey,editname, editage, editaddr, editphone, editemail], function (err, rows) {
//         if (err) {
//             console.log("Problem with MySQL" + err);
//         }
//         else {
//             console.log("NewItem  is  " + JSON.stringify(rows[5]));

//             res.end(JSON.stringify(rows[6]));
//         }
//         res.end();
//     });

// });
app.get('/removeproapi', function (req, res) {
    var prodid = url.parse(req.url, true).query['productid'];
    connection.query('set @prodid=?; call usp_removeproduct(@prodid)', [prodid], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});


//githubproject
app.get('/push', function (req, res) {

    var message = new gcm.Message({
        data: { key1: 'hello' },
        notification: {
            title: 'SPECOZ Offers1',
            body: 'body_data'
        }
    });

    // Set up the sender with you API key, prepare your recipients' registration tokens.
    var sender = new gcm.Sender('AAAAsi_G1xw:APA91bHzbxJ7AN0Wb7eUQLB4lydiO21pVaG4FSfF2WbnLet2PDP1sll8npOLEMnVN2jd2_R-R7kDy9kv6b8DaWAt8v5Xwy95UzI0YFV58DlpjboOb_p2fCYDdCi3oU91zba01zwXlkMj');
    sender.send(message, 'eL5VFGcwZhY:APA91bGw6X-VQ7dl1xvBEQxVm8qaeP8o4DCvzzuATTGYpd1Oq6UCefmYtQjmKQfNZq4Sm2eMgECwpOC8XCPxUBvnR890fWf7EafVSyp6CFyXVtACp6XA8tJyQThCAjas8P5BiVtcPeqp', function (err, response) {
        if (err) {
            console.error("Error:", err);
        }

        else console.log("Response:", response);
        res.send(response);
    });

});

//pushnotification
app.get('/push', function (req, res) {

    var message = new gcm.Message({
        data: { key1: 'hello' },
        notification: {
            title: 'SPECOZ Offers1',
            body: 'body_data'
        }
    });

    // Set up the sender with you API key, prepare your recipients' registration tokens.
    var sender = new gcm.Sender('AAAABwyNNQA:APA91bHnjLAYp_aZjQiu3Sv6gelEdJlyEdkSAsgmq4Ojewo86HRwxmLiDAt69U0QD5UeObRqkOpcvbyxkGZY4Q09iFAK0W9HgBYtmYmizH3cgc6Dq3kpU_F3Ff4giVx0YdCTu2eJu7lq');
    sender.send(message, 'dFYCS-mDsow%3AAPA91bExHIMnvh6QerfLkG8gGCwUDlGq7nqOXI2MJjdrh3T1yVkuu7UJRc3HzaUIaZgwsOLs7bmal-nmelylpc93t3c2q2_hRJuV_C2_7hDY_Pi95sWp7pa98TQEMIdeqVrx-7lVaH1b', function (err, response) {
        if (err) {
            console.error("Error:", err);
        }

        else console.log("Response:", response);
        res.send(response);
    });

});