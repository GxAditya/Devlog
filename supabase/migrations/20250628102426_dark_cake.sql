/*
  # Add user authentication to profiles

  1. Schema Changes
    - Add `user_id` column to `profiles` table to link with auth.users
    - Update RLS policies to be user-specific
    - Add constraint to ensure one profile per user

  2. Security
    - Update RLS policies to only allow users to access their own data
    - Remove public access policy
    - Add policies for authenticated users only

  3. Data Migration
    - Existing profiles will need to be handled (they'll become orphaned)
*/

-- Add user_id column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add unique constraint to ensure one profile per user
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'profiles' AND constraint_name = 'profiles_user_id_unique'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);
  END IF;
END $$;

-- Drop the old public access policy
DROP POLICY IF EXISTS "Allow public access to profiles" ON profiles;

-- Create new RLS policies for authenticated users
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);