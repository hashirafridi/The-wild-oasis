
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://tspfzpyvvkecfxdbxxec.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcGZ6cHl2dmtlY2Z4ZGJ4eGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDU2NDcsImV4cCI6MjA2NDcyMTY0N30.Qybo-N53df__Dso2d_F2hGKxHnbyTdIqs1lYPForAso"
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;