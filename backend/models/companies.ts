'use strict';
import {
  Model, UUIDV4,Sequelize, IntegerDataType
} from 'sequelize'

interface CompaniesAttributes{
  id:string;
  name:string;
  city:string;
  embs:IntegerDataType;
  edb:string;
  activity:string;
  legal_form:string;
  size:string;
  active:boolean;
  address:string;
  bank:string;
  bank_account_number:string;
}


module.exports = (sequelize:any, DataTypes:any) => {
  class Companies extends Model<CompaniesAttributes> implements CompaniesAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!:string;
     name!:string;
     city!:string;
     embs!:IntegerDataType;
     edb!:string;
     activity!:string;
     legal_form!:string;
     size!:string;
     active!:boolean;
     address!:string;
     bank!:string;
     bank_account_number!:string;
    static associate(models:any) {
      // define association here
    }
  }
  Companies.init({
    id:{
      type:DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
    // allowNull:false,
      primaryKey:true,
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    embs: {
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    edb: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    activity: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    legal_form: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    size: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    address: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    bank: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    bank_account_number: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    active: {
      type:DataTypes.BOOLEAN,
      allowNull:true,
    },
    
  }, {
    sequelize,
    modelName: 'Companies',
    timestamps:false,
  });
  return Companies;
};