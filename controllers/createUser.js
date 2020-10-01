module.exports = (req, res) => {

    res.render('register', {
        errors: req.flash('registerationErrors'),
        data: req.flash('data')[0]
    });
}