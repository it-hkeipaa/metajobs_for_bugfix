import { messageData } from "../data/user/messageData"


// find the user message controller
export async function findMessageRoom(accessToken: string) {
    try {
      return messageData
    } catch (e) {
      throw e
    }
  }
  