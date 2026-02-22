-- ===========================================================
-- Migration: Add max WPM limit to prevent bot spam
-- Run this in your Supabase SQL Editor
-- ===========================================================

-- 1. Optional: Delete any existing fake/bot scores that are 200 or above
DELETE FROM public.test_results WHERE wpm >= 200;

-- 2. Update the constraint so the database physically rejects anything >= 200
ALTER TABLE public.test_results
  DROP CONSTRAINT IF EXISTS test_results_wpm_check,
  ADD CONSTRAINT test_results_wpm_check CHECK (wpm >= 0 AND wpm < 200);
