const { Router } = require('express');
const router = new Router();
const jwt = require('jsonwebtoken');

// 1. När vi loggar in så verifiera inloggningsuppgifter (korrekt användarnamn och lösenord).
// 2. Om korrekta inloggningsuppgifter signera en JWT med användarid och skicka tillbaka till frontend.
// 3. I frontend ta emot token och spara i sessionStorage.
// 4. Vid varje fetch-anrop så hämta token från sessionStorage och skicka med i fetch-anropet.
// 5. På servern verifera att token är korrekt.
// 6. Om token är korrekt så returnera begärd data till frontend.
// 7. Annars om token inte är korrekt så skicka tillbaka ett felmeddelande till frontend.

const { createUser, findUserByUsername, findUserById } = require('../model/user');
const { comparePassword } =  require('../utils/utils');
const { auth } = require('../middleware/auth');

router.post('/signup', (request, response) => {
    const credentials = request.body;

    createUser(credentials);

    response.json({ success: true });
});

router.post('/login', async (request, response) => {
    const { username, password } = request.body;

    const user = await findUserByUsername(username);

    const result = {
        success: false
    }

    if (user) {
        const correctPass = await comparePassword(password, user.password);

        if (correctPass) {
            result.success = true;

            result.token = jwt.sign({ id: user.uuid }, 'a1b1c1', {
                expiresIn: 30 // 10 minuter
            });
        }
    }

    response.json(result);
});

router.get('/account', auth, async (request, response) => {
    const user = await findUserById(request.id);
    response.json({ success: true, email: user.email });
});

module.exports = router;