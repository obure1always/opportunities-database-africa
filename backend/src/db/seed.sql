-- Insert sample scholarships
INSERT INTO public.scholarships (title, description, organization, amount, deadline, requirements)
VALUES 
(
    'African Leadership Academy Scholarship',
    'Full scholarship for outstanding African students to attend the African Leadership Academy.',
    'African Leadership Academy',
    50000.00,
    '2024-12-31',
    'Must be between 16-19 years old, demonstrate leadership potential, and have excellent academic records.'
),
(
    'Mastercard Foundation Scholars Program',
    'Comprehensive scholarship program for African students to pursue undergraduate studies.',
    'Mastercard Foundation',
    75000.00,
    '2024-10-15',
    'Must be from Sub-Saharan Africa, demonstrate academic excellence and leadership potential.'
),
(
    'African Union Kwame Nkrumah Scientific Awards',
    'Award for outstanding African scientists and researchers.',
    'African Union',
    100000.00,
    '2024-09-30',
    'Must be an African scientist with significant contributions to scientific research.'
);

-- Note: We cannot insert users or applications directly due to password hashing and authentication requirements
-- Users will be created through the registration endpoint
-- Applications will be created when users apply through the API 