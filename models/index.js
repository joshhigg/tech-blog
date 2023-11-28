const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'Cascade'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Post };