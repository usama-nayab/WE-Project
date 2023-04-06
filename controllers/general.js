const candidates = require('../models/candidates');
const mails = require('../models/mails');
const session = require('express-session');
const nodemailer = require('nodemailer');

// ========== Home ==========
exports.home = (request, response, next)=> {
    response.render('home', { title: 'Al-Mustufa Scout', session: request.session.user, active: 'home' });
}

// ========== About ==========
exports.about = (request, response, next)=> {
    response.render('about', { title: 'About | Al-Mustufa Scout', session: request.session.user, active: 'about' });
}

// ========== Services ==========
exports.services = (request, response, next)=> {
    response.render('services', { title: 'Services | Al-Mustufa Scout', session: request.session.user, active: 'services' });
}

// ========== Contact ==========
exports.contact = (request, response, next)=> {
    response.render('contact', { title: 'Contact | Al-Mustufa Scout', session: request.session.user, active: 'contact' });
}

// ========== Join-Us ==========
exports.join_us = (request, response, next)=> {
    response.render('join-us', {title: 'Join Us | Al-Mustufa Scout', session: request.session.user, active: 'join-us' });
}

// ========== SignUp ==========
exports.sign_up = (request, response, next)=> {
    if (request.session.user && request.session.user!="") return response.redirect('/');
    response.render('auth/signup', {title: 'SignUp | Al-Mustufa Scout', active: 'sign-up'});
}




// ========== Join-Us Logic ==========
exports.new_scout = (request, response)=> {
    const { full_name, father_name, email, phone, address, qualification, age, options} = request.body

    if (!(full_name, father_name, email, phone, address, qualification, age)) {
        return response.render('join-us', {title: 'Join Us | Al-Mustufa Scout', error: 'All fields are required'});
    }

    candidates.create(request.body).then(()=> {
        const whatsapp_url = "https://wa.me/923323946603?text=Assalam u alaikum, My name is "+full_name+" and I want to join Al-Mustufa Scouts. Here's my detail %0a%0a"+"*Name :* "+full_name+"%0a"+"*Father Name :* "+father_name+"%0a"+"*Email :* "+email+"%0a"+"*Phone :* "+phone+"%0a"+"*Address :* "+address+"%0a"+"*Qualification :* "+qualification+"%0a"+"*Age :* "+age+"%0a"+"*Options :* "+((options!=undefined)?options:"N/A");
        response.redirect(whatsapp_url);
    }).catch(error=> {
        console.log(error);
    })
}



// ========== Contact Logic ==========
exports.send_mail = (request, response)=> {
    const { name, email, phone, message } = request.body

    if (!(name, email, phone, message)) {
        return response.render('contact', {title: 'Contact | Al-Mustufa Scout', error: 'All fields are required'});
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'myberry.py@gmail.com',
            pass: 'bcis gplg tuaa johu'
        }
    });
    
    let mailOptions = {
        from: name+' '+email, // sender address
        to: 'myberry.py@gmail.com', // list of receivers
        subject: 'Contact Mail', // Subject line
        text: message
    };    

    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) return console.log(error)

        mails.create(request.body).then(()=> {
            return response.render('contact', {title: 'Contact | Al-Mustufa Scout', success: 'Your message has been sent'});
        }).catch(error=> {
            console.log(error);
        })
    });
}