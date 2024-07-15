import { emailData } from "../data/email/emailData"

export async function sendContactEmail(input: any) {
    try {
      return true
    } catch (e) {
      throw e
    }
  }

  // get a email by emailType
export async function getEmailSettings(reqQuery: any) {
  try {
    return emailData
  } catch (e) {
    throw e
  }
}

// update a email by emailType
export async function updateEmailSettings(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

