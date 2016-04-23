// Module dependencies.
var express = require('express'),
router = express.Router(),
user = require('../apiObjects/user'),
l=require('../config/lib');

var api = {};
// ALL
api.users = function (req, res) {
	var skip=null,limit=10;

	if(req.query.skip!=undefined)
		skip=req.query.skip;

	if(req.query.limit!=undefined)
		limit=req.query.limit;

	user.getAllUsers(skip,limit,function(err,data){
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json({users: data});
		}
	}); 
};

// POST
api.adduser = function (req, res) {
	user.addUser(req.body.user,function	(err,data){
		if(err) res.status(500).json(err);
		else {
			res.status(201).json(data);
		}
	});	
};

// GET
api.user = function (req, res) {
	var id = req.params.id;
	user.getUser(id,function(err,data){
		if (err) {
			res.status(404).json(err);
		} else {
			res.status(200).json({user: data});
		}
	}); 
};

// PUT
api.editUser = function (req, res) {
	var id = req.params.id;

	return user.editUser(id,req.body.user, function (err, data) {
		if (!err) {
			l.p("updated user");
			return res.status(200).json(data);
		} else {
			return res.status(500).json(err);
		}
		return res.status(200).json(data);   
	});

};

// DELETE
api.deleteUser = function (req, res) {
	var id = req.params.id;
	return user.deleteUser(id, function (err, data) {
		if (!err) {
			l.p("removed user");
			return res.status(204).send();
		} else {
			l.p(err);
			return res.status(500).json(err);
		}
	});
};

// DELETE All
api.deleteAllUsers = function (req, res) {
	return user.deleteAllUsers( function (err, data) {
		if (!err) {
			l.p("removed All user");
			return res.status(204).send();
		} else {
			l.p(err);
			return res.status(500).json(err);
		}
	});
};

/*
=====================  ROUTES  =====================
*/


router.post('/user',api.adduser);

router.route('/user/:id')
.get(api.user)
.put(api.editUser)
.delete(api.deleteUser);


router.route('/users')
.get(api.users)
.delete(api.deleteAllUsers);


router.get('/users/test',function(req,res){
	return user.test(function (err, data) {
		res.status(200).json(data);
	});
});

module.exports = router;