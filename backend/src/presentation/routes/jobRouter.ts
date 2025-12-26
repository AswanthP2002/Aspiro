import express from 'express'
import JobController from '../controllers/jobController'
import GetJobsUseCase from '../../application/usecases/GetJobs.usecase'
import JobRepository from '../../infrastructure/repositories/jobRepository'
import GetJobDetailsUseCase from '../../application/usecases/GetJobDetails.usecase.FIX'
import SearchJobsFromHomeUseCase from '../../application/usecases/SearchJobsFromHome.usecase'

function CreateJobRouter(){
    const jobRouter = express.Router()

    const jobRepo = new JobRepository()

    const getJobsUC = new GetJobsUseCase(jobRepo)
    const getJobDetailsUC = new GetJobDetailsUseCase(jobRepo)
    const searchJobsFromHomeUC = new SearchJobsFromHomeUseCase(jobRepo)

    const jobController = new JobController(
        getJobsUC,
        getJobDetailsUC,
        searchJobsFromHomeUC
    )

    jobRouter.get('/jobs', jobController.loadJobs.bind(jobController))
    jobRouter.get('/jobs/details/:jobId', jobController.loadJobDetails.bind(jobController))
    jobRouter.get('/home/jobs', jobController.searchJobFromHomePage.bind(jobController))

    return jobRouter
}


export default CreateJobRouter