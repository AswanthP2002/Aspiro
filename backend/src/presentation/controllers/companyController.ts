import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import IGetCompanyListUsecase from '../../application/interfaces/usecases/company/IGetCompanyList.usecase';
import { StatusCodes } from '../statusCodes';
import IAddCompanyUsecase from '../../application/interfaces/usecases/company/IAddCompnay.usecase';
import IGetcompaniesBySuggesionUsecase from '../../application/interfaces/usecases/company/IGetCompaniesBySuggession.usecase';
import ResponseHandler from '../../utilities/response.handler';
import { StatusMessage } from '../../constants/Messages/statusMessages';
import IAdminLoadAllCompaniesDataUsecase from '../../application/interfaces/usecases/company/IAdminLoadCompanies.usecase';
import IAdminEditCompanyUsecase from '../../application/interfaces/usecases/company/IAdminEditCompany.usecase';

@injectable()
export default class CompanyController {
  private _responseHandler: ResponseHandler;
  constructor(
    @inject('IGetCompanyListUsecase') private _getCompanyList: IGetCompanyListUsecase,
    @inject('IAddCompanyUsecase') private _addCompany: IAddCompanyUsecase,
    @inject('IGetcompaniesBySuggesion') private _getCompaniesList: IGetcompaniesBySuggesionUsecase,
    @inject('IAdminLoadAllCompaniesDataUsecase')
    private _adminLoadAllCompaniesData: IAdminLoadAllCompaniesDataUsecase,
    @inject('IAdminEditCompanyUsecase') private _adminEditCompany: IAdminEditCompanyUsecase
  ) {
    this._responseHandler = new ResponseHandler();
  }

  async getCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { industry, location } = req.query;
      const filter = {
        industry: industry as string,
        location: location as string,
      };

      const result = await this._getCompanyList.execute(filter);

      res.status(StatusCodes.OK).json({
        success: true,
        message: 'Companies fetched successfully',
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async addCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addCompany.execute(req.body);
      res
        .status(StatusCodes.CREATED)
        .json({ success: true, message: 'Company added succesfully', result });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getCompaniesList(req: Request, res: Response, next: NextFunction): Promise<void> {
    const search = (req.query.search as string) || '';
    try {
      const result = await this._getCompaniesList.exeucte(search);
      this._responseHandler.success(
        res,
        StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Companies'),
        StatusCodes.OK,
        result
      );
      // res
      //   .status(StatusCodes.OK)
      //   .json({ success: true, message: 'Companies fetched succesfully', result });
    } catch (error) {
      next(error);
    }
  }

  async adminLoadAllCompaniesData(req: Request, res: Response, next: NextFunction): Promise<void> {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string) || 5;
    try {
      const result = await this._adminLoadAllCompaniesData.execute(page, limit);
      this._responseHandler.success(
        res,
        StatusMessage.RESOURCE_MESSAGES.RESOURCE_FETCH('Companies'),
        StatusCodes.OK,
        result
      );
    } catch (error) {
      next(error);
    }
  }

  async adminEditCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    const companyId = req.params.id;
    try {
      const result = await this._adminEditCompany.execute({
        _id: companyId as string,
        ...req.body,
      });
      this._responseHandler.success(
        res,
        StatusMessage.RESOURCE_MESSAGES.RESOURCE_EDIT('Company'),
        StatusCodes.OK,
        result
      );
    } catch (error) {
      next(error);
    }
  }
}
