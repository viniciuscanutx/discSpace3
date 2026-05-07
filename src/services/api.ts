import type { CreateReviewPayload, ApiResponse, ApiReview } from '../types'

const API_URL = import.meta.env.VITE_API_URL

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error',
    }
  }
}

export async function getReviews(): Promise<ApiResponse<ApiReview[]>> {
  return request<ApiReview[]>('/reviews/')
}

export async function getReviewById(id: string): Promise<ApiResponse<ApiReview>> {
  return request<ApiReview>(`/reviews/${id}`)
}

export async function createReview(review: CreateReviewPayload): Promise<ApiResponse<ApiReview>> {
  return request<ApiReview>('/reviews/', {
    method: 'POST',
    body: JSON.stringify(review),
  })
}

export async function deleteReview(id: string): Promise<ApiResponse<void>> {
  return request<void>(`/reviews/${id}`, {
    method: 'DELETE',
  })
}
