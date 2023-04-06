const passport = require('passport');
const users = require('../models/users');
const session = require('express-session');


// ==================== Google Login Process ====================
exports.google_success = (request, response, next)=> {
    if (!request.user) return response.redirect('/auth/google/fail');

	const data = {
		googleId: request.user._json.sub,
		first_name: request.user._json.given_name,
		last_name: request.user._json.family_name,
		email: request.user._json.email
	}

	users.findOne({googleId: request.user._json.sub}).then(result=> {
		if (result) {
            request.session.user = {id: result._id, name: result.first_name}
			response.redirect('/');
		}else{
			users.create(data).then((results)=> {
                request.session.user = {id: results._id, name: results.first_name}
				response.redirect('/');
			}).catch(error=> {
				console.log(error);
			})
		}
	})
}

exports.google_failed = (request, response, next)=> {
    response.send('Failed');
}












// ==================== Facebook Lofin Process ====================
exports.facebook_success = (request, response, next)=> {
    if (!request.user) return response.redirect('/auth/facebook/fail');

	const data = {
		facebookId: request.user.id,
		first_name: request.user.displayName
	}

	users.findOne({facebookId: request.user.id}).then(result=> {
		if (result) {
            request.session.user = {id: result._id, name: result.first_name}
            response.redirect('/');
		}else{
			users.create(data).then((results)=> {
                request.session.user = {id: results._id, name: results.first_name}
				response.redirect('/');
			}).catch(error=> {
				console.log(error);
			})
		}
	})
}

exports.facebook_failed = (request, response, next)=> {
    response.send('Failed');
}











exports.sign_up = (request, response)=> {
    const { first_name, last_name, email, password, confirm_password } = request.body

    if (!(first_name, last_name, email, password, confirm_password)) {
        return response.render('auth/signup', {title: 'SignUp | Al-Mustufa Scout', error: 'All fields are required'});
    }

    if (password !== confirm_password) {
        return response.render('auth/signup', {title: 'SignUp | Al-Mustufa Scout', error: 'Passwords Does\'nt Matched'});
    }

    users.findOne({email: email}).then(result=> {
		if (result) return response.render('auth/signup', {title: 'SignUp | Al-Mustufa Scout', error: 'This Email Already Registered'});

        const data = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            password: request.body.password
        }    


        users.create(data).then((result)=> {
	    	request.session.user = {id: result._id, name: result.first_name}
            response.redirect('/')
        })
		.catch(error=> {
            console.log(error);
        })
	})
}
