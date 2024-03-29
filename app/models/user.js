/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    scrypt = require('scrypt'),
    _ = require('underscore'),
    authTypes = ['github', 'twitter', 'facebook', 'google'];


/**
 * User Schema
 */
var UserSchema = new Schema({
    name: String,
    email: String,
    username: {type: String, unique: true},
    provider: String,
    hashed_password: String,
    // facebook: {},
    // twitter: {},
    // github: {},
    calendar: [{
        start: Date,
        end: Date,
        freeTime: Boolean,
        partner: String, // partner's name, optional
        topics: [String],
        isTutor: Boolean // is he a tutor in this session
    }],
    google: {}, // google data
    teach: [{
        category: String,
        verified: Boolean
    }], // categories he teaches
    learn: [String],
    documents: [String], // certificates, that he has specific skill
    hourlyRate: Number, // in euro
    profilePicture: String,
    ratings: [{
        score: {
            type: Number,
            min: 0,
            max: 5
        },
        from: {
            type: String, // username of user who rated
            unique: true
        }
    }]
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

UserSchema.virtual('rating').get(function() {
    var sum = 0,
        i = 0;
    this.ratings.forEach(function(rating) {
        i++;
        sum += rating.score;
    });
    return sum / i;
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate(function(name) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function(username) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'));
    else
        next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
      return scrypt.verifyHashSync(this.hashed_password, plainText);
    },


    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        var maxtime = 0.1;
        return scrypt.passwordHashSync(password, maxtime);
        //return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};

mongoose.model('User', UserSchema);