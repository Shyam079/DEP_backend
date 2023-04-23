const {authJwt} = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = (app) => {
    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/test/all',controller.allAccess);
    app.get('/api/test/news',controller.getNews);
    
    app.get('/api/test/user',
        [authJwt.verifyToken],
        controller.userBoard
    );
    app.get('/api/test/admin',[
        authJwt.verifyToken,
        authJwt.isAdmin
    ],controller.adminBoard
    );

    app.get('/api/test/mod',[
        authJwt.verifyToken,
        authJwt.isModerator
    ],controller.moderatorBoard
    );
    app.put('/api/test/user/:id',[authJwt.verifyToken],controller.updateUser)
    // app.get('/api/test/requestAdmin',[
    //     authJwt.verifyToken
    // ],controller.adminReq);
    
    app.get('/api/test/data',controller.tableData)
    app.post('/api/test/give-rating',controller.reviewUser);
};