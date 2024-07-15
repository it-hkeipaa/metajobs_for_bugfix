import { bookmarkData } from "../data/bookmark/bookmarkData"

// find all private bookmarks
export async function getBookmarks(accessToken: string) {
    try {
      return bookmarkData
    } catch (e) {
      throw e
    }
  }

export async function createBookmark(reqQuery: any) {
  try {
  
    return true
  } catch (e) {
    throw e
  }
}

export async function checkBookmark(reqQuery: any) {
  try {
    const bookmarkData = {
      isBookmark: false,
    }
    return bookmarkData
  } catch (e) {
    throw e
  }
}

// delete a bookmark handller
export async function deleteBookmark(reqQuery: any) {
  try {
    return true
  } catch (e: any) {
    throw e
  }
}