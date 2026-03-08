import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import IGetCompanyListUsecase from '../../application/interfaces/usecases/IGetCompanyList.usecase';
import { StatusCodes } from '../statusCodes';
import IAddCompanyUsecase from '../../application/interfaces/usecases/recruiter/IAddCompnay.usecase';
import IGetcompaniesBySuggesionUsecase from '../../application/interfaces/usecases/company/IGetCompaniesBySuggession.usecase';

@injectable()
export default class CompanyController {
  constructor(
    @inject('IGetCompanyListUsecase') private _getCompanyList: IGetCompanyListUsecase,
    @inject('IAddCompanyUsecase') private _addCompany: IAddCompanyUsecase,
    @inject('IGetcompaniesBySuggesion') private _getCompaniesList: IGetcompaniesBySuggesionUsecase
  ) {}

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
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: 'Companies fetched succesfully', result });
    } catch (error) {
      next(error)
    }
  }
}
