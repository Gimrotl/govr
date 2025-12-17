/*
  # Add Route to rest_stop_type enum

  1. Changes
    - Add 'Route' as a new value to the existing rest_stop_type enum
    - This allows rest stops to be categorized as 'Route' type

  2. Notes
    - This is a non-destructive change
    - Existing records remain unaffected
*/

ALTER TYPE rest_stop_type ADD VALUE 'Route';
