import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function cleanupTestUsers() {
  console.log('🧹 Cleaning up test users with invalid email addresses...\n');

  try {
    // Get all users
    console.log('Fetching all users...');
    const { data: allUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      console.error('❌ Error listing users:', listError.message);
      return;
    }

    console.log(`Found ${allUsers.users.length} total users\n`);

    // Invalid email patterns to clean up
    const invalidPatterns = [
      '@epiko.com',           // Fake domain
      'testuser.',            // Old test pattern with Gmail
      '@gmail.com',           // Any Gmail test emails (be careful with this)
    ];

    let deletedCount = 0;
    const usersToDelete = [];

    // Find users with invalid emails
    for (const user of allUsers.users) {
      const email = user.email || '';

      // Check if email matches invalid patterns
      const isInvalid =
        email.includes('@epiko.com') ||
        (email.includes('testuser') && email.includes('@gmail.com')) ||
        email.includes('aitest@');

      if (isInvalid) {
        usersToDelete.push(user);
      }
    }

    if (usersToDelete.length === 0) {
      console.log('✅ No invalid test users found!\n');
      return;
    }

    console.log(`Found ${usersToDelete.length} users with invalid emails:\n`);
    usersToDelete.forEach(user => {
      console.log(`   - ${user.email} (ID: ${user.id.substring(0, 8)}...)`);
    });

    console.log('\nDeleting invalid test users...\n');

    // Delete each invalid user
    for (const user of usersToDelete) {
      try {
        // First delete from profiles table to avoid foreign key constraint issues
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .delete()
          .eq('id', user.id);

        if (profileError) {
          console.log(`⚠️  Warning: Could not delete profile for ${user.email}: ${profileError.message}`);
        }

        // Then delete from auth
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id);

        if (deleteError) {
          console.log(`❌ Failed to delete ${user.email}: ${deleteError.message}`);
        } else {
          console.log(`✅ Deleted: ${user.email}`);
          deletedCount++;
        }
      } catch (err) {
        console.log(`❌ Error deleting ${user.email}: ${err.message}`);
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`✅ Cleanup complete!`);
    console.log(`   Deleted: ${deletedCount} users`);
    console.log(`   Remaining: ${allUsers.users.length - deletedCount} users\n`);

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error(error);
  }
}

cleanupTestUsers();
