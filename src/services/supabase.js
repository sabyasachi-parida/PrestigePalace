
import { createClient } from '@supabase/supabase-js'
 export const supabaseUrl = 'https://buivqdvdxwhrhprkfsrq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1aXZxZHZkeHdocmhwcmtmc3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NDE4MDUsImV4cCI6MjAyMzIxNzgwNX0.Rl9HnJqnKsaGxBeYsMGe2VbidLTybU0Ks4FdYVUg3xU";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;