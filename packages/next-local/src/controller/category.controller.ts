import { categoryData } from "../data/category/categoryData"

export async function getCategories() {
    try {
        return categoryData
    } catch (e) {
        throw e
    }
}

// create category handler
export async function createCategory(reqData: any) {
    try {
      return true
    } catch (e) {
      throw e
    }
  }
  
  // delete category handler
  export async function deleteCategory(reqQuery: any) {
    try {
      return true
    } catch (e) {
      throw e
    }
  }
  