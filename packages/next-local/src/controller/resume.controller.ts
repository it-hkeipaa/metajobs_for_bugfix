import { singleResumeData } from "../data/resume/singleResumeData"
import { resumeSearchData } from "../data/resume/resumeSearchData"
import { privateResumeData } from "../data/resume/privateResumeData"


// Search and Filter resume handler public
export async function getSearchResume(reqQueries: any) {
    try {
      return resumeSearchData
    } catch (e) {
      throw e
    }
  }

  // single resume public
export async function getSingleResume(resumeId: any) {
    try {
      return singleResumeData
    } catch (e) {
      throw e
    }
  }

  // find all resume handller private
export async function getResumePrivate(accessToken: string) {
  try {
    return privateResumeData
  } catch (e) {
    throw e
  }
}


// create resume controller
export async function createResume(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// resume status update
export async function updateResumeStatus(rewQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

//   // update resume image and file controller
export async function updateResume(reqQuery: any) {
  try {
    return true
  } catch (e: any) {
    throw e
  }
}

// delete resume controller
export async function deleteResume(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}
