-- ===========================================================
-- Migration: Add max WPM limit and math checks to prevent bots
-- Run this in your Supabase SQL Editor
-- ===========================================================

-- 1. Delete any existing fake/bot scores that are 200 or above, or mathematically impossible
DELETE FROM public.test_results 
WHERE wpm >= 200 
   OR accuracy > 100 
   OR accuracy < 0
   OR correct_chars > total_chars;

-- 2. Update the constraint so the database physically rejects anything >= 200
ALTER TABLE public.test_results
  DROP CONSTRAINT IF EXISTS test_results_wpm_check,
  ADD CONSTRAINT test_results_wpm_check CHECK (wpm >= 0 AND wpm < 200);

-- 3. Add advanced math & logic constraints
ALTER TABLE public.test_results
  DROP CONSTRAINT IF EXISTS test_results_accuracy_check,
  ADD CONSTRAINT test_results_accuracy_check CHECK (accuracy >= 0 AND accuracy <= 100);

ALTER TABLE public.test_results
  DROP CONSTRAINT IF EXISTS test_results_chars_check,
  ADD CONSTRAINT test_results_chars_check CHECK (correct_chars <= total_chars AND correct_chars >= 0 AND total_chars >= 0);
