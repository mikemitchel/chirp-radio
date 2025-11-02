// CMS API utility functions for fetching members/listeners data
import type { User } from '../types/user'

const CMS_API_URL = import.meta.env.VITE_CMS_API_URL || 'http://localhost:3000/api'

/**
 * Transform CMS user data to frontend format
 * CMS stores favoriteDJs as [{ djId: 'id' }], frontend expects ['id']
 */
function transformCMSUser(cmsUser: any): User {
  return {
    ...cmsUser,
    favoriteDJs: Array.isArray(cmsUser.favoriteDJs)
      ? cmsUser.favoriteDJs.map((fav: any) =>
          typeof fav === 'object' && fav.djId ? fav.djId : fav
        )
      : []
  }
}

/**
 * Fetch all members from CMS
 */
export async function fetchAllMembers(): Promise<User[]> {
  try {
    const response = await fetch(`${CMS_API_URL}/listeners?limit=1000`)
    if (!response.ok) {
      throw new Error(`Failed to fetch members: ${response.statusText}`)
    }
    const data = await response.json()
    return (data.docs || []).map(transformCMSUser)
  } catch (error) {
    console.error('[cmsMembers] Error fetching all members:', error)
    throw error
  }
}

/**
 * Fetch regular DJs from CMS
 */
export async function fetchDJs(): Promise<User[]> {
  try {
    const response = await fetch(
      `${CMS_API_URL}/listeners?where[roles][contains]=Regular DJ`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch DJs: ${response.statusText}`)
    }
    const data = await response.json()
    return (data.docs || []).map(transformCMSUser)
  } catch (error) {
    console.error('[cmsMembers] Error fetching DJs:', error)
    throw error
  }
}

/**
 * Fetch substitute DJs from CMS
 */
export async function fetchSubstituteDJs(): Promise<User[]> {
  try {
    const response = await fetch(
      `${CMS_API_URL}/listeners?where[roles][contains]=Substitute DJ`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch substitute DJs: ${response.statusText}`)
    }
    const data = await response.json()
    return (data.docs || []).map(transformCMSUser)
  } catch (error) {
    console.error('[cmsMembers] Error fetching substitute DJs:', error)
    throw error
  }
}

/**
 * Fetch board members from CMS
 */
export async function fetchBoardMembers(): Promise<User[]> {
  try {
    const response = await fetch(
      `${CMS_API_URL}/listeners?where[roles][contains]=Board Member`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch board members: ${response.statusText}`)
    }
    const data = await response.json()
    return (data.docs || []).map(transformCMSUser)
  } catch (error) {
    console.error('[cmsMembers] Error fetching board members:', error)
    throw error
  }
}

/**
 * Fetch volunteers from CMS
 */
export async function fetchVolunteers(): Promise<User[]> {
  try {
    const response = await fetch(
      `${CMS_API_URL}/listeners?where[roles][contains]=Volunteer`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch volunteers: ${response.statusText}`)
    }
    const data = await response.json()
    return (data.docs || []).map(transformCMSUser)
  } catch (error) {
    console.error('[cmsMembers] Error fetching volunteers:', error)
    throw error
  }
}

/**
 * Fetch a specific member by ID from CMS
 */
export async function fetchMemberById(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${CMS_API_URL}/listeners/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch member: ${response.statusText}`)
    }
    const cmsUser = await response.json()
    return transformCMSUser(cmsUser)
  } catch (error) {
    console.error('[cmsMembers] Error fetching member by ID:', error)
    return null
  }
}

/**
 * Update a member's data in CMS
 */
export async function updateMember(id: string, data: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`${CMS_API_URL}/listeners/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to update member ${id}: ${response.statusText} - ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[cmsMembers] Error updating member:', error)
    throw error
  }
}
