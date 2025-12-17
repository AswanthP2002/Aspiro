import { injectable } from "tsyringe";
import Interviews from "../../../domain/entities/user/interview.entity";
import IInterviewRepo from "../../../domain/interfaces/user/IInterviewRepo";
import BaseRepository from "../baseRepository";
import { InterviewDAO } from "../../database/DAOs/user/interview.dao";


@injectable()
export default class InterviewRepository extends BaseRepository<Interviews> implements IInterviewRepo {
    constructor(){
        super(InterviewDAO)
    }
    
}