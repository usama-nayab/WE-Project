const express = require('express');
const router = express.Router();
const session = require('express-session');

// ========== General Controller ==========
const genearl_controller = require('../controllers/general');


// ========== Pages Routes ==========
router.get('/', genearl_controller.home);
router.get('/about', genearl_controller.about);
router.get('/services', genearl_controller.services);
router.get('/contact', genearl_controller.contact);
router.get('/join-us', auth, genearl_controller.join_us);
router.get('/sign-up', genearl_controller.sign_up);

// ========== Join-Us Post Route ==========
router.post('/join-us', genearl_controller.new_scout);

// ========== Contact Post Route ==========
router.post('/contact', genearl_controller.send_mail);


function auth(request, response, next) {
    if (request.session.user && request.session.user!="") {
        next();
    }else{
        response.redirect('/sign-up');
    }
}


module.exports = router;