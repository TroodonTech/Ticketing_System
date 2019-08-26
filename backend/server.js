var express = require('express'),
    path = require('path'),
    http = require('http');
// var config = require('./config');
var mysql = require("mysql");
var url = require('url');
var bodyParser = require('body-parser');
var multer = require('multer')
    , upload = multer();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

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

var pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true,
    connectionLimit: 250,
    queueLimit: 0,
    debug: true
});
function DBPoolConnectionTry2(req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            console.log("Failed! Connection with Database spicnspan via connection pool failed");

        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
        }
    });
}
function DBPoolConnectionTry(req, res, next) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            console.log("Failed! Connection with Database spicnspan via connection pool failed");
            DBPoolConnectionTry2();
        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
        }
    });
}
DBPoolConnectionTry();



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
    var filename1=req.body.filename1;

    connection.query('set @descrip=?;set @priority=?;set @employeeid=?;set @filename1=?;  call usp_submitissue(@descrip,@priority,@employeeid,@filename1)', [ descrip, priority,employeeid,filename1], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[4]));

            res.end(JSON.stringify(rows[4]));
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

    connection.query('set @status=?;set @startdate=?;set @enddate=?;set @newmessage=?;set @employeeid=?;set @issueid=?; call usp_saveissueAction(@status,@startdate,@enddate,@newmessage,@employeeid,@issueid)', [status,startdate,enddate,newmessage,employeeid,issueid], function (err, rows) {
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
    var ptoassigningto = req.body.ptoassigningto;


        connection.query("set @currentdate=?;set @employeekey=?;set @startdate=?;set @enddate=?;set @comments=?; set @ptoassigningto=?; call usp_SavePTORequest(@currentdate,@employeekey,@startdate,@enddate,@comments,@ptoassigningto)", [currentdate, employeekey, startdate, enddate, comments, ptoassigningto], function (err, rows) {
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
    var assigningto = req.body.assigningto;
    var empKey = req.body.EmpKey;

            connection.query("set @currdate=?;set @ptorequestID=?;set @StartDate=?;set @EndDate=?;set @Comments=?;set @assigningto=?;set @empKey=?;call usp_setEditedRequest(@currdate,@ptorequestID,@StartDate,@EndDate,@Comments,@assigningto,@empKey)", [currdate, ptorequestID, StartDate, EndDate, Comments, assigningto, empKey], function (err, rows) {
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

app.get('/getEmployeesName', function (req, res) {

    var employeeid = url.parse(req.url, true).query['employeeid'];

            connection.query('set@employeeid=?; call usp_getEmployeesName(@employeeid)',[employeeid], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {


                    res.end(JSON.stringify(rows[1]));


                }
            });
});

app.options('/getPtoRequestdetailsforManager', supportCrossOriginScript);
app.post('/getPtoRequestdetailsforManager', supportCrossOriginScript, function (req, res) {

    var employeekey = req.body.employeekey;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var ptostatus = req.body.ptoStatus;

        connection.query('set @employeekey=?;set @fromdate=?;set @todate=?;set @ptostatus=?;call usp_getPTORequestdetailsforManager(@employeekey,@fromdate,@todate,@ptostatus)', [employeekey, fromdate, todate, ptostatus], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[4]));
            }
        });

});

app.get('/getRequestDetailsbyID', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var ptorequestDetailskey = url.parse(req.url, true).query['ptorequestDetailskey'];

    connection.query('set @ptorequestDetailskey=?;call usp_getRequestDetailsbyID(@ptorequestDetailskey)', [ptorequestDetailskey], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            res.end(JSON.stringify(rows[1]));
        }
    });
});

app.options('/savePTORequestAction', supportCrossOriginScript);
app.post('/savePTORequestAction', supportCrossOriginScript, function (req, res) {

    var ptorequestDetails = req.body.ptorequestDetails;
    var employeekey = req.body.employeekey;
    var statuscurrentdate = req.body.statuscurrentdate;
    var approvedstartdate = req.body.approvedstartdate;
    var ApprovedEndDate = req.body.ApprovedEndDate;
    var StatusKey = req.body.StatusKey;
    var statuscomments = req.body.statuscomments;


        connection.query("set @ptorequestDetails=?;set @employeekey=?;set @statuscurrentdate=?;set @approvedstartdate=?;set @ApprovedEndDate=?;set @StatusKey=?;set @statuscomments=?; call usp_SavePTORequestAction(@ptorequestDetails,@employeekey,@statuscurrentdate,@approvedstartdate,@ApprovedEndDate,@StatusKey,@statuscomments)", [ptorequestDetails, employeekey, statuscurrentdate, approvedstartdate, ApprovedEndDate, StatusKey, statuscomments], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[7]));
            }
        });

});

app.get('/getRequestDetailsbyID', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var ptorequestDetailskey = url.parse(req.url, true).query['ptorequestDetailskey'];

    connection.query('set @ptorequestDetailskey=?;call usp_getRequestDetailsbyID(@ptorequestDetailskey)', [ptorequestDetailskey], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            res.end(JSON.stringify(rows[1]));
        }
    });
});

app.get('/duplicateAction', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    var issueid = url.parse(req.url, true).query['issueid'];
    var duplicateissueid = url.parse(req.url, true).query['duplicateissueid'];

    connection.query('set @issueid=?;set @duplicateissueid=?;call usp_duplicateAction(@issueid,@duplicateissueid)', [issueid,duplicateissueid], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            res.end(JSON.stringify(rows[2]));
        }
    });
});

app.get('/getIssueNumber', function (req, res) {

    var issueid = url.parse(req.url, true).query['issueid'];
    var employeeid = url.parse(req.url, true).query['employeeid'];
    
    connection.query('set@issueid=?; set @employeeid=?; call usp_getIssueNumbers(@issueid,@employeeid)',[issueid,employeeid], function (err, rows) {
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

app.options('/getAllIssues', supportCrossOriginScript);
app.post('/getAllIssues', supportCrossOriginScript, function (req, res) {

    var employeekey = req.body.employeekey;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var status = req.body.Status;

        connection.query('set @employeekey=?;set @fromdate=?;set @todate=?;set @status=?;call usp_getAllIssues(@employeekey,@fromdate,@todate,@status)', [employeekey, fromdate, todate,status], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[4]));
            }
        });

});

app.get('/deleteIssues', function (req, res) {

    var deleteKey = url.parse(req.url, true).query['deleteKey'];
    
    connection.query('set@deleteKey=?; call usp_deleteIssues(@deleteKey)',[deleteKey], function (err, rows) {
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

app.get('/getIssueDetailsforManager', function (req, res) {

    var issueid = url.parse(req.url, true).query['issueid'];
    
    connection.query('set@issueid=?; call usp_getIssueDetailsforManager(@issueid)',[issueid], function (err, rows) {
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

app.get('/getIssuetype', function (req, res) {

    // var projectid = url.parse(req.url, true).query['projectid'];

    connection.query('call usp_getIssuetype()', function (err, rows) {
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

app.get('/getAllEmployees', function (req, res) {

    
    connection.query('call usp_getAllEmployees()', function (err, rows) {
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

app.options('/issueAssign', supportCrossOriginScript);
app.post('/issueAssign', supportCrossOriginScript, function (req, res) {

    var IssueTypeid = req.body.IssueTypeid;
    var employee = req.body.employee;
    var employeeid = req.body.employeeid;
    var issueid = req.body.issueid;

        connection.query('set @IssueTypeid=?;set @employee=?;set @employeeid=?;set @issueid=?;call usp_issueAssign(@IssueTypeid,@employee,@employeeid,@issueid)', [IssueTypeid, employee, employeeid,issueid], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[4]));
            }
        });

});

app.options('/submitIssuebyManager', supportCrossOriginScript);
app.post('/submitIssuebyManager', supportCrossOriginScript, function (req, res) {
    var issuetype = req.body.issuetype;
    var employee = req.body.employee;
    var Description = req.body.Description;
    var priority = req.body.priority;
    var employeeid = req.body.employeeid;

        connection.query('set @issuetype=?;set @employee=?;set @Description=?;set @priority=?;set @employeeid=?;call usp_submitIssuebyManager(@issuetype,@employee,@Description,@priority,@employeeid)', [issuetype,employee, Description, priority,employeeid], function (err, rows) {
            if (err) {
                console.log("Problem with MySQL" + err);
            }
            else {

                res.end(JSON.stringify(rows[5]));
            }
        });

});

//////////////////////////////code by aswathy ends//////////////////////////////////////////




////////////////////code by raima starts/////////////////////////////////////////////////////

//get user role type manager
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
//get user role type admin
app.get('/getuserroletypeadmin', function (req, res) {

    connection.query('call usp_getuserroletypeadmin()', function (err, rows) {
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
//add employee
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
            console.log("NewItem  is  " + JSON.stringify(rows[7]));

            res.end(JSON.stringify(rows[7]));
        }
        res.end();
    });

});
////add project
app.post('/addproject', supportCrossOriginScript, function (req, res) {
    var ProjectName = req.body.ProjectName;
    var LastName = req.body.LastName;
   

    connection.query('set @ProjectName=?;set @Projectdesc=?; call usp_addproject(@ProjectName,@Projectdesc)', [ProjectName, Projectdesc], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[2]));

            res.end(JSON.stringify(rows[2]));
        }
        res.end();
    });

});
//check username
app.get( '/checkUsername', function (req, res) {
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
                    console.log("checkUsername...from server.." + JSON.stringify(rows[2]));
                    res.end(JSON.stringify(rows[2]));
                }
            });
        }
        connection.release();
    });
});
//set username and password
app.post( '/setUsernamePassword', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var username = req.body.username;
    var password = req.body.password;
    var userroletype_id = req.body.userroletype_id;
    
    pool.getConnection(function (err, connection) {
        if (err) {

            console.log("Failed! Connection with Database spicnspan via connection pool failed");
        }
        else {
            console.log("Success! Connection with Database spicnspan via connection pool succeeded");
            connection.query('set @username=?; set @password=?; set @userroletype_id=?;call usp_setUsernamePassword(@username,@password,@userroletype_id)', [username, password, userroletype_id], function (err, rows) {
                if (err) {
                    console.log("Problem with MySQL" + err);
                }
                else {
                    console.log("setUsernamePassword...from server.." + JSON.stringify(rows[3]));
                    res.end(JSON.stringify(rows[3]));
                }
            });
        }
        connection.release();
    });
});
//sent mail
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

app.post('/sendmail', function (req, res) {
    var options = {
        service: 'Gmail',
        auth: {
            api_key: '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'
        }
    };
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function (error, info) {
        pool.getConnection(function (err, connection) {
            if (err) {

                console.log("Failed! Connection with Database spicnspan via connection pool failed");
            } else {
//           
                console.log("nodemailer...from server..");
//           
            }
            connection.release();
        });
//       
    });
});
/////////////emp details
app.get('/getEmpDetails', function (req, res) {

    connection.query('call usp_getEmpDetails()', function (err, rows) {
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


 
//////////////////////image upload


let imgstorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../dist/imageupload');
    },
    filename: (req, file, cb) => {

        // var idimageupload = url.parse(req.url, true).query['imgkey'];
        
        var filename = file.originalname;

        // console.log(" SSSSSSSSSSSSSSSSSS fid fdesc fname are  " + formtypeId + " " + formDesc + " " + filename + " " + multerUploadPath);



        console.log(file.name);

        cb(null, file.originalname);
    }
});

let imgupload1 = multer({ storage: imgstorage1 });


app.post( '/imgupload', imgupload1.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});
////////////////get project details

app.get('/getProjectDetails', function (req, res) {

    connection.query('call usp_getProjectDetails()', function (err, rows) {
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
//////////////////////////////code by raima ends//////////////////////////////////////////