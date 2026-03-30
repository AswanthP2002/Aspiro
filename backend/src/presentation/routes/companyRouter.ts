import express from 'express';
import { container } from 'tsyringe';
import CompanyController from '../controllers/companyController';
import { authorization, centralizedAuthentication } from '../../middlewares/auth';
import { CompanyAPIRoutes } from '../../constants/Apis/company.routes';

function createCompanyRouter() {
  const companyRouter = express.Router();
  const companyController = container.resolve(CompanyController);

  companyRouter.get(
    CompanyAPIRoutes.COMPANY.LOAD,
    companyController.getCompanies.bind(companyController)
  );
  companyRouter.post(
    CompanyAPIRoutes.COMPANY.ADD,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    companyController.addCompany.bind(companyController)
  );
  companyRouter.get(
    CompanyAPIRoutes.COMPANY.COMPANY_SUGGESTION_LIST,
    centralizedAuthentication,
    authorization(['user', 'recruiter']),
    companyController.getCompaniesList.bind(companyController)
  );

  return companyRouter;
}

export default createCompanyRouter;
