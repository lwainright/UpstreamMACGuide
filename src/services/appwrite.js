// src/services/appwrite.js
// Mirrors Upstream Approach pattern — local Client instance per service
import { Client, Account, Databases, Storage, ID, Query } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export { ID, Query }

// Collection IDs — set these after creating collections in Appwrite
export const DB_ID         = import.meta.env.VITE_APPWRITE_DB_ID
export const COL_JOBSITES  = import.meta.env.VITE_APPWRITE_COL_JOBSITES
export const COL_MATERIALS = import.meta.env.VITE_APPWRITE_COL_MATERIALS
export const COL_NOTES     = import.meta.env.VITE_APPWRITE_COL_NOTES
export const COL_CONTACTS  = import.meta.env.VITE_APPWRITE_COL_CONTACTS
export const BUCKET_PHOTOS = import.meta.env.VITE_APPWRITE_BUCKET_PHOTOS
