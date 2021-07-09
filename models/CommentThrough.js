// const { Model, DataTypes } = require('sequelize');

// const sequelize = require('../config/connection');

// class CommentThrough extends Model {}

// CommentThrough.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         comment_id: {
//             type: DataTypes.INTEGER,
//             references: {
//               model: 'comments',
//               key: 'id'
//             },
//         },
//         blog_id: {
//             type: DataTypes.INTEGER,
//             references: {
//               model: 'blog',
//               key: 'id'
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'commentThrough',
//     }
// );

// module.exports = CommentThrough;