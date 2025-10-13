import { inject, injectable } from 'tsyringe';
import LoadCandidateDTO from '../../DTOs/admin/loadCandidates.dto';
import CandidatePaginatedDTO from '../../DTOs/candidate/candidatePaginated.dto';
import ILoadCandidateUseCase from './interfaces/ILoadCandidate.usecase';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import {
  CandidateJoinDateSortQuery,
  CandidateNameSortQuery,
  FindCandidatesQuery,
} from '../../queries/candidates.query';
import mapToCandidatePaginagedDTO from '../../mappers/candidate/mapToCandidatePaginatedDTO.mapper';

@injectable()
export class LoadCandidatesUseCase implements ILoadCandidateUseCase {
  constructor(
    @inject('ICandidateRepository') private _candidateRepo: ICandidateRepo
  ) {}

  async execute(
    loadCandidateDto: LoadCandidateDTO
  ): Promise<CandidatePaginatedDTO | null> {
    //change the return type to strict later
    const { search, page, limit, sort, filter } = loadCandidateDto;

    const sortOption: CandidateNameSortQuery & CandidateJoinDateSortQuery = {
      createdAt: -1,
      name: 1,
    };

    switch (sort) {
      case 'joined-latest':
        sortOption.createdAt = -1;
        break;
      case 'joined-oldest':
        sortOption.createdAt = 1;
        break;
      case 'name-a-z':
        sortOption.name = 1;
        break;
      case 'name-z-a':
        sortOption.name = -1;
        break;
      default:
        throw new Error('Sameple error simulation'); // default case, already have a default sort
    }

    const query: FindCandidatesQuery = {
      search: search,
      page: page,
      limit: limit,
      filterOptions: filter,
      sortOption: sortOption,
    };

    const result = await this._candidateRepo.findCandidates(query);

    if (result) {
      const candidatePaginatedDto = mapToCandidatePaginagedDTO(result);
      return candidatePaginatedDto;
    }

    return null;
  }
}

// interface findCandidatesQuery {
//     search : string
//     page : number
//     limit : number
//     sortOption : 'joined-latest' | 'joined-oldest' | 'name-a-z' | 'name-z-a'
//     filter : {
//         jobRole : string[],
//         status : string[]
//     }
// }

// async findCandidates(
//     search: string = '',
//     page: number = 1,
//     limit: number = 1,
//     sort: string = 'joined-latest',
//     filter: any
//   ): Promise<CandidatePaginated | null> {
//     const skip = (page - 1) * limit;
//     //const query = search ? { name: { $regex: new RegExp(search, 'i') }, isAdmin:false } : {isAdmin:false}
//     const currentSort = sort;
//     const sortOption: any = {};
//     const matchFilter: any = { 'userDetails.isAdmin': false };
//     const pipeLine: any = [
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'userId',
//           foreignField: '_id',
//           as: 'userDetails',
//         },
//       },
//       { $unwind: '$userDetails' },
//     ];

//     console.log(
//       `Filter content from the client side :: CandidateRepository.ts`,
//       filter
//     );

//     if (search) {
//       matchFilter.name = { $regex: new RegExp(search, 'i') };
//     }

//     if (filter?.jobRole.length > 0) {
//       //console.log('Content exist in the jobRole :: filter');
//       matchFilter.jobTitle = { $in: filter?.jobRole };
//     }

//     if (filter?.status.length > 0) {
//       //console.log('Content exist in the status :: filter');
//       matchFilter.userDetails.isBlocked = { $in: filter?.status };
//     }

//     switch (sort) {
//       case 'joined-latest':
//         sortOption['createdAt'] = -1;
//         break;
//       case 'joined-oldest':
//         sortOption['createdAt'] = 1;
//         break;
//       case 'name-a-z':
//         sortOption['name'] = 1;
//         break;
//       case 'name-z-a':
//         sortOption['name'] = -1;
//         break;
//       default:
//         sortOption['createdAt'] = -1;
//     }

//     //console.log('Match query before applying', matchFilter);
//     const match = { $match: matchFilter };
//     pipeLine.push(match);
//     const candidates = await CandidateDAO.aggregate(pipeLine);
//     // .sort(sortOption)
//     // .skip(skip)
//     // .limit(limit)
//     //.lean();
//     //const testData = await CandidateDAO.find().lean()
//     //console.log('printing testdata for checking data availability', testData.length)
//     const totalDocuments = await CandidateDAO.countDocuments(matchFilter);
//     const totalPages = Math.ceil(totalDocuments / limit);
//     return { candidates, currentPage: page, totalPages, currentSort };
//   }
