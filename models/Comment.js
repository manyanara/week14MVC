const { Model, DataTypes } = require('sequelize');
const sequelize = require('../confit/connection');

class Comment extends Model {}

Comment.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'post',
                key: 'id'
            }
        },
}, {
    sequelize,
    timestamp: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
})