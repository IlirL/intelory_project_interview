'use strict';
import {
  Model, UUIDV4
} from 'sequelize';


interface UserAttributes{
  id:string;
  name:string;
  email:string;
  password:string;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class Users extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!:string;
  name!:string;
  email!:string;
  password!:string;
    static associate(models:any) {
      // define association here
    }
  }
  Users.init({
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      // allowNull:false,
      primaryKey:true,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
      
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Users',
    timestamps:false
  });
  return Users;
};
