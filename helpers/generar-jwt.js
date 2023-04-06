const jwt = require('jsonwebtoken');
const { keyJWToken } = require('../data');



const generarJWT = ( aid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { aid };

        jwt.sign( payload, keyJWToken, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}




module.exports = {
    generarJWT
}

