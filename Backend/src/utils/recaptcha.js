import fetch from 'node-fetch'

/**
 * Verify reCAPTCHA token with Google's API
 * @param {string} token - The reCAPTCHA token from the frontend
 * @returns {Promise<boolean>} - True if verification successful, false otherwise
 */
export async function verifyRecaptchaToken(token) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY not found in environment variables')
      return false
    }

    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'
    
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    
    console.log('reCAPTCHA verification response:', data)
    
    return data.success === true
  } catch (error) {
    console.error('Error verifying reCAPTCHA token:', error)
    return false
  }
} 