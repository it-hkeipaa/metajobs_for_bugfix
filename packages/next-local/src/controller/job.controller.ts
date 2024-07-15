import { singleJobData } from "../data/jobs/singleJobData"
import { jobData } from "../data/jobs/jobsAllData"
import { jobSearchData } from "../data/jobs/jobSearchData"
import { privateJobData } from "../data/jobs/privateJobData"



// find all job public
export async function getJobs() {
    try {
     
      return jobData
    } catch (e) {
      throw e
    }
  }

// Search and Filter  jobs handller
export async function getSearchJobs(query: any) {
    try {
      return jobSearchData
    } catch (e: any) {
      throw e
    }
  }

// get a job handller
export async function getSingleJob(query: any) {
    try {
      return singleJobData
    } catch (e: any) {
      throw e
    }
  }

    // find total job, resume, company
export async function getTotalCount() {
  try {
      const total = {
          totalJobs:23,
          totalCompanies:6,
          totalResumes:3,
        }
    return total
  } catch (e) {
    throw e
  }
}

// find all job handler private
export async function getJobsPrivate(accessToken: string) {
  try {
    return privateJobData
  } catch (e) {
    throw e
  }
}

// create job handller
export async function createJob(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// job status update
export async function updateJobStatus(rewQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// update job handler
export async function updateJob(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// job status update
export async function deleteJob(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}
