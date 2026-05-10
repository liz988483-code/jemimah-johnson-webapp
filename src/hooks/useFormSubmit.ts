import { useState } from 'react'

interface FormSubmitOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
  resetOnSuccess?: boolean
}

interface FormSubmitState {
  isSubmitting: boolean
  isSubmitted: boolean
  error: string | null
}

export const useFormSubmit = (options: FormSubmitOptions = {}) => {
  const [state, setState] = useState<FormSubmitState>({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  })

  const submitForm = async (endpoint: string, data: any, resetForm?: () => void) => {
    setState({ isSubmitting: true, isSubmitted: false, error: null })

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      
      setState({ isSubmitting: false, isSubmitted: true, error: null })
      
      if (options.onSuccess) {
        options.onSuccess(result)
      }
      
      if (options.resetOnSuccess && resetForm) {
        resetForm()
      }
      
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setState({ isSubmitting: false, isSubmitted: false, error: errorMessage })
      
      if (options.onError) {
        options.onError(errorMessage)
      }
      
      throw error
    }
  }

  const reset = () => {
    setState({ isSubmitting: false, isSubmitted: false, error: null })
  }

  return {
    ...state,
    submitForm,
    reset,
  }
}
