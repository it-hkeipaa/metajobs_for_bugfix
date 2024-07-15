// login user controller
export async function loginUser(reqQuery: any) {
    try {
        const accessToken = '123456789'
        return {accessToken}
    } catch (e) {
      throw e
    }
  }

  // get  user controller
export async function getUser(accessToken: any) {
    try {
        const user ={
              _id: "622b4d0a210fd3b5bb5a315c",
              fullName: { firstName: 'Jane', lastName: 'Deckow' },
              email: 'zelal@ojjomedia.com',
              isConfirmed: true,
              role: { isCandidate: false, isEmployer: false, isAdmin: true },
              resetLink: 'eyJhbGc',
              aboutMe: 'Good at wordpress',
              avatar: 'https://placehold.co/48',
              cloudinary_id: 'nz0d9nkr5jygt7pghwny',
              phoneNumber: '561-987-6235',
              package: "6243eb2ac44015cea5f2d3d8"
            }
      return user
    } catch (e) {
      throw e
    }
  }


  // get user dashboard statistics handler
export async function getDashboardStat(accessToken: string) {
    try {
        return [
          {
            title: 'Total Jobs',
            count: 22,
          },
          {
            title: 'Total Resumes',
            count: 7,
          },
          {
            title: 'Total Employees',
            count: 10,
          },
          {
            title: 'Total Companies',
            count: 8,
          },
        ]
    } catch (e) {
      throw e
    }
  }

  // create user controller
export async function createUser(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

//  Resend confirmation email handler
export async function resendConfirmEmail(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// forget password email Handler
export async function forgetPassword(reqQuery: any) {
  try {
    return true
  } catch (e: any) {
    throw e
  }
}

// forget password reset Handler
export async function forgetPassReset(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// update UserHandler
export async function updateUser(reqQuery: any, imageData: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}

// reset password Handler
export async function updatePassword(reqQuery: any) {
  try {
    return true
  } catch (e) {
    throw e
  }
}
