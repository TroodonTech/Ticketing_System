var express = require('express'),
    path = require('path'),
    http = require('http');
// var config = require('./config');
var mysql = require("mysql");
var url = require('url');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var jwtsecret = '936ee7cf-b0f6-4140-909b-926694c2ac80';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../dist/mdb-angular-free')));
app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
var config = {};
config.db = {};

// config.db.host = "192.168.1.113";
config.db.host = "localhost";
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


////////////////////code by aswathy starts/////////////////////////////////////////////////////


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

app.get('/getProductNames', function (req, res) {

    connection.query('call usp_getProductNames()', function (err, rows) {
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
    var descrip = req.body.descrip;
    var priority = req.body.priority;
    var employeeid = req.body.employeeid;

    connection.query('set @descrip=?;set @priority=?;set @employeeid=?;  call usp_submitissue(@descrip,@priority,@employeeid)', [ descrip, priority,employeeid], function (err, rows) {
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


app.get('/getHistory', function (req, res) {

    var employeeid = url.parse(req.url, true).query['employeeid'];
    
    connection.query('set @employeeid=?; call usp_getHistory(@employeeid)',[employeeid], function (err, rows) {
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

app.get('/getHistoryDetails', function (req, res) {

    var issueid = url.parse(req.url, true).query['issueid'];
    
    connection.query('set @issueid=?; call usp_getHistoryDetails(@issueid)',[issueid], function (err, rows) {
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

app.get('/getMessages', function (req, res) {

    var issueid = url.parse(req.url, true).query['issueid'];
    
    connection.query('set @issueid=?; call usp_getMessages(@issueid)',[issueid], function (err, rows) {
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

app.options('/saveMessage', supportCrossOriginScript);
app.post('/saveMessage', supportCrossOriginScript, function (req, res) {
    var newmessage = req.body.newmessage;
    var employeeid = req.body.employeeid;
    var issueid = req.body.issueid;

    connection.query('set @newmessage=?;set @employeeid=?;set @issueid=?;  call usp_saveMessage(@newmessage,@employeeid,@issueid)', [newmessage,employeeid,issueid], function (err, rows) {
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

app.get('/getIssuesforEmp', function (req, res) {
    var employeeid = url.parse(req.url, true).query['employeeid'];
    connection.query('set @employeeid=?;call usp_getissuesforemployee(@employeeid)', [employeeid], function (err, rows) {
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


app.get('/getIssueDetailsforEmp', function (req, res) {

    var issueid = url.parse(req.url, true).query['issueid'];
    var assignedby = url.parse(req.url, true).query['assignedby'];
    
    connection.query('set@issueid=?; set @assignedby=?; call usp_getIssueDetailsforEmp(@issueid,@assignedby)',[issueid,assignedby], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("prodnames  is  " + JSON.stringify(rows[2]));

            res.end(JSON.stringify(rows[2]));
        }
        res.end();
    });

});

app.options('/issueAction', supportCrossOriginScript);
app.post('/issueAction', supportCrossOriginScript, function (req, res) {
    var status=req.body.status;
    var startdate=req.body.startdate;
    var enddate=req.body.enddate;
    var newmessage = req.body.newmessage;
    var employeeid = req.body.employeeid;
    var issueid = req.body.issueid;

    connection.query('set @status=?;set @startdate=?;set @enddate=?;set @newmessage=?;set @employeeid=?;set @issueid=?;  call usp_saveissueAction(@status,@startdate,@enddate,@newmessage,@employeeid,@issueid)', [status,startdate,enddate,newmessage,employeeid,issueid], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[6]));

            res.end(JSON.stringify(rows[6]));
        }
        res.end();
    });

});

app.options('/savePTORequest', supportCrossOriginScript);
app.post('/savePTORequest', supportCrossOriginScript, function (req, res) {

    var currentdate = req.body.currentdate;
    var employeekey = req.body.employeekey;
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    var comments = req.body.comments;
    var reason = req.body.ptoreason;


        connection.query("set @currentdate=?;set @employeekey=?;set @startdate=?;set @enddate=?;set @comments=?; set @reason=?; call usp_SavePTORequest(@currentdate,@employeekey,@startdate,@enddate,@comments,@reason)", [currentdate, employeekey, startdate, enddate, comments, reason], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[6]));
            }
        });
});

app.get('/getRequestDetails', function (req, res) {
    var empKey = url.parse(req.url, true).query['employeekey'];

        connection.query('set @empKey=?;call usp_getRequestDetails(@empKey)', [empKey], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[1]));

            }
        });
});

app.get('/getRequestDetailsforEmployee', function (req, res) {

    var ptorequestDetailsKey = url.parse(req.url, true).query['ptorequestID'];

            connection.query('set @ptorequestDetailsKey=?;call usp_getRequestDetailsbyIDforEmployee(@ptorequestDetailsKey)', [ptorequestDetailsKey], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {


                    res.end(JSON.stringify(rows[1]));


                }
            });
});

app.options('/setEditedRequest', supportCrossOriginScript);
app.post('/setEditedRequest', supportCrossOriginScript, function (req, res) {

    var currdate = req.body.currdate;
    var ptorequestID = req.body.ptorequestID;
    var StartDate = req.body.StartDate;
    var EndDate = req.body.EndDate;
    var Comments = req.body.Comments;
    var reason = req.body.Reason;
    var empKey = req.body.EmpKey;

            connection.query("set @currdate=?;set @ptorequestID=?;set @StartDate=?;set @EndDate=?;set @Comments=?;set @reason=?;set @empKey=?;call usp_setEditedRequest(@currdate,@ptorequestID,@StartDate,@EndDate,@Comments,@reason,@empKey)", [currdate, ptorequestID, StartDate, EndDate, Comments, reason, empKey], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {

                    res.end(JSON.stringify(rows[7]));
                }
            });

});
app.get('/deletePTORequest', function (req, res) {

    var deleteRequestKey = url.parse(req.url, true).query['deleteRequestKey'];

            connection.query('set @deleteRequestKey=?;call usp_deletePTORequest(@deleteRequestKey)', [deleteRequestKey], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {


                    res.end(JSON.stringify(rows[1]));


                }
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
//////////////////////////////code by aswathy ends//////////////////////////////////////////




////////////////////code by raima starts/////////////////////////////////////////////////////


app.get('/getuserroletype', function (req, res) {

    connection.query('call usp_getuserroletype()', function (err, rows) {
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
app.post('/addemployee', supportCrossOriginScript, function (req, res) {
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var MiddleName = req.body.MiddleName;
    var Address = req.body.Address;
    var Phone = req.body.Phone;
    var EmailID = req.body.EmailID;
    var UserRoleType=req.body.UserRoleType;

    connection.query('set @FirstName=?;set @LastName=?;set @MiddleName=?;set @Address=?;set @Phone=?;set @EmailID=?;set @UserRoleType=?;call usp_addemployee(@FirstName,@LastName,@MiddleName,@Address,@Phone,@EmailID,@UserRoleType)', [FirstName, LastName, MiddleName,Address,Phone,EmailID,UserRoleType], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[6]));

            res.end(JSON.stringify(rows[3]));
        }
        res.end();
    });

});
app.get(securedpath + '/checkUsername', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var username = url.parse(req.url, true).query['username'];
    var userroletype_id = url.parse(req.url, true).query['userroletype_id'];
    // console.log(username);
    pool.getConnection(function (err, connection) {
        if (err) {

            console.log("Failed! Connection with Database spicnspan via connection pool failed");
        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
            connection.query('set @username=?; set @userroletype_id=?; call usp_checkUsername(@username,@userroletype_id)', [username, userroletype_id], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {
                    console.log("checkUsername...from server.." + JSON.stringify(rows[3]));
                    res.end(JSON.stringify(rows[3]));
                }
            });
        }
        connection.release();
    });
});

//////////////////////////////code by raima ends//////////////////////////////////////////