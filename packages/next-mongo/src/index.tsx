// import findPublicJob from service

import { getCategories } from './service/category.service'

import { createFilter, getFilters } from './controller/admin/filter.controller'
import {
  createCompany,
  deleteCompany,
  findCompanyPrivate,
  getSearchCompany,
  getSingleCompany,
  updateCompany,
  updateCompanyStatus,
} from './controller/company.controller'
import {
  createJob,
  deleteJob,
  getJobs,
  getJobsPrivate,
  getSearchJobs,
  getSingleJob,
  getTotalCount,
  updateJob,
  updateJobStatus,
} from './controller/job.controller'
import {
  createUser,
  forgetPassReset,
  forgetPassword,
  getUser,
  loginUser,
  resendConfirmEmail,
  updatePassword,
  updateUser,
  updateUserPackage,
} from './controller/user.controller'
import { getDashboardStat } from './service/user.service'

import {
  createResume,
  deleteResume,
  getResumePrivate,
  getSearchResume,
  getSingleResume,
  updateResume,
  updateResumeStatus,
} from './controller/resume.controller'

import {
  createEmailSettings,
  getEmailSettings,
  updateEmailSettings,
} from './controller/admin/email.controller'
import {
  checkBookmark,
  createBookmark,
  deleteBookmark,
  getBookmarks,
} from './controller/bookmark.controller'
import {
  createCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
} from './controller/category.controller'
import {
  createJobAlerts,
  deleteJobAlert,
  getJobAlerts,
  getSingleJobAlert,
  updateJobAlert,
  updateJobAlertStatus,
} from './controller/jobAlert.controller'
import {
  createJobApply,
  getJobApplication,
  getUserApplication,
  updateApplyStatus,
} from './controller/jobApply.controller'
import { updateNotification } from './controller/notification.controller'
import {
  createPackage,
  deletePackage,
  getPackages,
  getSinglePackage,
  updatePackage,
} from './controller/package.controller'
import {
  requireCandidate,
  requireEmployer,
  requireUser,
} from './middleware/authenticate'
import {
  userExistValidate,
  userPasswordValidate,
} from './middleware/validateUser'
import {
  createEmail,
  findEmailByEmailType,
  sendContactEmail,
} from './service/admin/email.service'
import {
  createMessageRoom,
  findMessageRoom,
  getMessageRoom,
  updateMessageRoom,
} from './service/message.service'
import { getNotification } from './service/notification.service'
import connectDB from './utils/connect'

import { signJwt, verifyJwt } from './utils/jwt.utils'

import { loginUserService } from './service/user.service'

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
  updateUserPackage,
  requireUser,
  requireCandidate,
  requireEmployer,

  createEmail,
  sendContactEmail,
  findEmailByEmailType,

  getDashboardStat,
  getNotification,
  updateNotification,
  findMessageRoom,
  updateMessageRoom,
  createMessageRoom,
  getMessageRoom,

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
  getSingleCategory,
  updateCategory,
  findCompanyPrivate,

  createPackage,
  getPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,

  getEmailSettings,
  updateEmailSettings,
  createEmailSettings,

  createFilter,
  getFilters,
  userExistValidate,
  userPasswordValidate,

  loginUserService,

  signJwt,
  verifyJwt,
}
