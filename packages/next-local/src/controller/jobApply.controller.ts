import { jobApplyData } from "../data/jobApply/jobApplyData"

// find all application of a candidate handler
export async function getUserApplication(accessToken: string) {
    try {
      return jobApplyData
    } catch (e) {
      throw e
    }
  }

  // create create job handler
export async function createJobApply(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// find all application of of a Job handller
export async function getJobApplication(reqQuery: any) {
  try {
    const data = {
      applications: [],
      totalApplyCount: 3,
    }
    return data
  } catch (e: any) {
    throw e
  }
}

// update job application status handler
export async function updateApplyStatus(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}


  