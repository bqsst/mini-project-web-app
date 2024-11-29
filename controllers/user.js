const db = require('../config/db');

exports.login = async (req, res) => {
   const { username, password } = req.body;
   let sql = 'SELECT * FROM users WHERE username = ?';
   db.query(sql, [username], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
         const user = results[0];
         if (password === user.password) {
            req.session.user = user;
            res.redirect('/detail');
         } else {
            res.render('login', { error: 'Incorrect password' });
         }
      } else {
         res.render('login', { error: 'User not found' });
      }
   });
}

exports.logout = async (req, res) => {
   req.session.destroy();
   res.redirect('/');
}