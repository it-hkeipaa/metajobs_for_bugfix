
import { singleJobALertData } from "../data/jobAlert/singleJobAlertData"
import { jobALertData } from "../data/jobAlert/jobAlertData"

// find job alert of a candidate (private)
export async function getJobAlerts(accessToken: string) {
  try {
    return jobALertData
  } catch (e) {
    throw e
  }
}


//  get job alert by ID
export async function getSingleJobAlert(reqData: any) {
    try {
      return singleJobALertData
    } catch (e) {
      throw e
    }
  }

export async function updateJobAlert(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

export async function updateJobAlertStatus(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

export async function deleteJobAlert(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

export async function createJobAlerts(reqData: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}