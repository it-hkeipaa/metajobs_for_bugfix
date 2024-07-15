import { singleCompanyData } from "../data/company/singleCompanyData"
import { companySearchData } from "../data/company/companySearchData"
import { privateCompanyData } from "../data/company/privateCompanyData"

// Search and Filter company profile handler public
export async function getSearchCompany(reqQueries: any) {
    try {
      return companySearchData
    } catch (e: any) {
      throw e
    }
  }

// get single company handler public
  export async function getSingleCompany(companyID: any) {
    try {
      return singleCompanyData
    } catch (e) {
      throw e
    }
  }

  // find all company profile  private
export async function findCompanyPrivate(accessToken: string) {
  try {
    return privateCompanyData
  } catch (e) {
    throw e
  }
}

// create company profile handller
export async function createCompany(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// company status update
export async function updateCompanyStatus(rewQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// update company profile handler
export async function updateCompany(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// delete company profile
export async function deleteCompany(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}
