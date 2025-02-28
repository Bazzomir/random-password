import { useState, useEffect } from 'react'

type PasswordOption = {
  label: string
  length: number
  pinOnly?: boolean
}

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeOption, setActiveOption] = useState<number | null>(null)
  const [strengthColor, setStrengthColor] = useState('bg-gray-200')

  const passwordOptions: PasswordOption[] = [
    { label: '4-Digit PIN', length: 4, pinOnly: true },
    { label: '8 Characters', length: 8 },
    { label: '12 Characters', length: 12 },
    { label: '22 Characters', length: 22 }
  ]

  useEffect(() => {
    if (password) {
      if (password.length <= 4) {
        setStrengthColor('bg-red-500')
      } else if (password.length <= 8) {
        setStrengthColor('bg-yellow-500')
      } else if (password.length <= 12) {
        setStrengthColor('bg-green-500')
      } else {
        setStrengthColor('bg-purple-500')
      }
    } else {
      setStrengthColor('bg-gray-200')
    }
  }, [password])

  const generatePassword = (option: PasswordOption, index: number) => {
    let charset = ''
    if (option.pinOnly) {
      charset = '0123456789'
    } else {
      charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    }

    let result = ''
    for (let i = 0; i < option.length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      result += charset[randomIndex]
    }
    setPassword(result)
    setCopied(false)
    setActiveOption(index)
  }

  const copyToClipboard = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  const refreshPassword = () => {
    if (activeOption !== null) {
      generatePassword(passwordOptions[activeOption], activeOption)
    }
  }

  return (
    <div className="flex justify-center items-center p-4 h-90">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>

        {/* Glass card */}
        <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Password Generator
            </h1>
            <p className="text-indigo-200 text-center mt-2">
              Create secure passwords with a single click
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Password display area */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-black rounded-lg p-4 min-h-16 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-mono text-white break-all">
                    {password || 'Your password will appear here'}
                  </span>
                  {password && (
                    <div className="flex items-center mt-2">
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${strengthColor} transition-all duration-500`} style={{ width: `${(password.length / 22) * 100}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>
                {password && (
                  <div className="flex gap-2 ">
                    <button
                      onClick={copyToClipboard}
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors text-white"
                      title="Copy to clipboard"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>

                    {/* Copy notification */}
                    {copied && (
                      <div className="absolute top-0 right-0 left-0 mx-auto w-64 transform -translate-y-full">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-t-lg rounded-r-lg shadow-lg text-center animate-fade-in-down">
                          Password copied! 📋
                        </div>
                      </div>
                    )}

                    <button
                      onClick={refreshPassword}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors text-white"
                      title="Generate new password"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Password options */}
            <div className="grid grid-cols-2 gap-4">
              {passwordOptions.map((option, index) => (
                <button
                  key={option.label}
                  onClick={() => generatePassword(option, index)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${activeOption === index
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator