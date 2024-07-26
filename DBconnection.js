// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiqvgqqbgilkijphunot.supabase.co';//process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcXZncXFiZ2lsa2lqcGh1bm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5NzI0NjAsImV4cCI6MjAzNjU0ODQ2MH0.qzP5j-VzLh5rfEig7wnA9ot6t8cFUt9eEDmvgfEHJ3o';//process.env.REACT_APP_SUPABASE_KEY;

console.log(supabaseUrl);
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or API key is missing.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const testConnection = async () => {
    try {
        await supabase.auth.getSession();
        console.log('Connected to Supabase successfully');
    } catch (error) {
        console.error('Error connecting to Supabase:', error.message);
    }
};
