const db = require('../config/db');
const upload = require('../config/imageFolder');

exports.showLoginPage = async (req, res) => {
   res.render('login', { error: null })
}

exports.list = async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/')
   }
   let sql = 'SELECT * FROM detail'
   db.query(sql, (err, results) => {
      if (err) throw err
      res.render('main', { detail: results })
   });
};

exports.showAddPage = async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/')
   }
   res.render('add');
}

exports.showEditPage = async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/')
   }
   let sql = 'SELECT * FROM detail WHERE detail_id = ?'
   db.query(sql, [req.params.detail_id], (err, results) => {
      if (err) throw err
      res.render('edit', { detail: results[0] })
   });
}

exports.remove = async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/');
   }

   const detailId = req.params.detail_id;

   if (!detailId) {
      console.error('Error: detail_id is not defined');
      return res.status(400).send('Invalid request: detail_id is missing');
   }

   let sql = 'DELETE FROM detail WHERE detail_id = ?';
   db.query(sql, [detailId], (err, result) => {
      if (err) {
         console.error('Error executing query:', err);
         return res.status(500).send('An error occurred while deleting the record.');
      }
      res.redirect('/detail');
   });
}  

exports.create = async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/')
   }

   upload.single('image')(req, res, (err) => {
      if (err) {
         console.log("File upload error:", err);
      }

      const imagePath = req.file ? '/images/' + req.file.filename : null;

      let newCulture = {
         ...req.body,
         image_path: imagePath
      }

      let sql = 'INSERT INTO detail SET ?'
      db.query(sql, newCulture, (err, result) => {
         if (err) throw err
         res.redirect('/detail');
      });
   })
}

exports.update = async (req, res) => {
   if (!req.session.user) {
      return res.redirect('/');
   }

   upload.single('image')(req, res, (err) => {
      if (err) {
         console.log("File upload error:", err);
      }

      const imagePath = req.file ? '/images/' + req.file.filename : null;

      let updateDetail = {
         ...req.body,
         ...(imagePath && { image_path: imagePath })
      };

      let sql = 'UPDATE detail SET ? WHERE detail_id = ?';
      db.query(sql, [updateDetail, req.params.detail_id], (err, result) => {
         if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('An error occurred while updating the details.');
         }
         res.redirect('/detail');
      });
   });
}