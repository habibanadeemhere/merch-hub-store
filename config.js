
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://caecycjsebvqdacztddq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZWN5Y2pzZWJ2cWRhY3p0ZGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjk4MjMsImV4cCI6MjA4MDYwNTgyM30.5N8PD1Mrnuf7dJoAnUZbsFlvLDVM6fjT_TFKFVnzrpM'

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase