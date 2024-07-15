import { notificationData } from "../data/user/notificationsData"

export async function getNotification(accessToken: string) {
    try {
      return notificationData
    } catch (e) {
      throw e
    }
  }

  // update notification status
export async function updateNotification(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}