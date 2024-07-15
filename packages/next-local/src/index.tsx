import { getCategories,createCategory, deleteCategory, } from "./controller/category.controller"
import { getJobs, getSearchJobs,getSingleJob, getTotalCount,getJobsPrivate,createJob,updateJobStatus,updateJob,deleteJob } from "./controller/job.controller"
import { getSearchCompany,getSingleCompany,findCompanyPrivate,createCompany,updateCompanyStatus,updateCompany,deleteCompany, } from "./controller/company.controller"
import { getSearchResume,getSingleResume,getResumePrivate,createResume,updateResumeStatus,updateResume,deleteResume } from "./controller/resume.controller"
import { getFilters,createFilter } from "./controller/filter.controller"
import { sendContactEmail,getEmailSettings,updateEmailSettings } from "./controller/email.controller"
import { loginUser, getUser,getDashboardStat,createUser,resendConfirmEmail,forgetPassword, forgetPassReset, updateUser, updatePassword } from "./controller/user.controller"
import { getNotification,updateNotification } from "./controller/notification.controller"
import { findMessageRoom } from "./controller/message.controller"
import { getBookmarks, createBookmark,checkBookmark,deleteBookmark} from "./controller/bookmark.controller"
import { getUserApplication, createJobApply,getJobApplication,updateApplyStatus,} from "./controller/jobApply.controller"
import { getJobAlerts,getSingleJobAlert,updateJobAlert,updateJobAlertStatus,deleteJobAlert,createJobAlerts, } from "./controller/jobAlert.controller"
import { getPackages, createPackage,getSinglePackage,updatePackage,deletePackage, } from "./controller/package.controller"
import connectDB from './controller/utils.controller'

export const apiProvider = {
  connectDB,
  createJob,
  getJobs,
  getSingleJob,
  getJobsPrivate,
  updateJobStatus,
  getSearchJobs,
  updateJob,
  deleteJob,
  getTotalCount,

  createCompany,
  getSingleCompany,
  getSearchCompany,
  updateCompanyStatus,
  updateCompany,
  deleteCompany,

  createResume,
  getSingleResume,
  getSearchResume,
  getResumePrivate,
  updateResumeStatus,
  updateResume,
  deleteResume,

  createUser,
  getUser,
  loginUser,
  resendConfirmEmail,
  forgetPassword,
  forgetPassReset,
  updateUser,
  updatePassword,

  sendContactEmail,
  getDashboardStat,
  getNotification,
  updateNotification,
  findMessageRoom,

  createBookmark,
  checkBookmark,
  getBookmarks,
  deleteBookmark,

  createJobApply,
  getUserApplication,
  getJobApplication,
  updateApplyStatus,

  getJobAlerts,
  getSingleJobAlert,
  updateJobAlert,
  updateJobAlertStatus,
  deleteJobAlert,
  createJobAlerts,

  createCategory,
  getCategories,
  deleteCategory,
  findCompanyPrivate,

  createPackage,
  getPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,

  getEmailSettings,
  updateEmailSettings,

  createFilter,
  getFilters,
}
