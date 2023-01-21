import * as usersControllers from './users.controllers'
import * as companiesControllers from './companies.controllers'

// console.log(usersControllers)
// export default {...usersControllers, ...companiesControllers}

export const authenticate =  usersControllers.authenticate;
export const register =  usersControllers.register;
export const columns =   companiesControllers.columns;
export const companies = companiesControllers.companies