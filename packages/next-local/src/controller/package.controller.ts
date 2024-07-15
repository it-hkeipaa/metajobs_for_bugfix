import { packageData } from "../data/package/packageData"

// find all packages handler
export async function getPackages() {
    try {
      return packageData
    } catch (e) {
      throw e
    }
  }
  
// create package handler
export async function createPackage(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// get package handler
export async function getSinglePackage(reqQuery: any) {
  try {
    const packageResult = [] as any
    return packageResult
  } catch (e) {
    throw e
  }
}

// update package handler
export async function updatePackage(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// delete package handler
export async function deletePackage(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}
