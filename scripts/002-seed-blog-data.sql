-- Insert sample hierarchical categories
INSERT INTO blog_categories (name, slug, parent_id, description) VALUES
('EMF', 'emf', NULL, 'Electromagnetic Fields and their effects'),
('Health', 'health', NULL, 'Health optimization and wellness'),
('Technology', 'technology', NULL, 'Technology optimization and reviews');

-- Insert subcategories for EMF
INSERT INTO blog_categories (name, slug, parent_id, description) VALUES
('Electricity', 'electricity', (SELECT id FROM blog_categories WHERE slug = 'emf'), 'Electrical EMF sources and mitigation'),
('RF/Wireless', 'rf-wireless', (SELECT id FROM blog_categories WHERE slug = 'emf'), 'Radio frequency and wireless EMF'),
('Magnetic Fields', 'magnetic-fields', (SELECT id FROM blog_categories WHERE slug = 'emf'), 'Magnetic field sources and effects');

-- Insert sub-subcategories for Electricity
INSERT INTO blog_categories (name, slug, parent_id, description) VALUES
('Home Desk', 'home-desk', (SELECT id FROM blog_categories WHERE slug = 'electricity'), 'Optimizing your home office setup'),
('Bedroom', 'bedroom', (SELECT id FROM blog_categories WHERE slug = 'electricity'), 'Creating a low-EMF bedroom environment'),
('Kitchen', 'kitchen', (SELECT id FROM blog_categories WHERE slug = 'electricity'), 'Kitchen EMF optimization');

-- Insert subcategories for Health
INSERT INTO blog_categories (name, slug, parent_id, description) VALUES
('Sleep', 'sleep', (SELECT id FROM blog_categories WHERE slug = 'health'), 'Sleep optimization strategies'),
('Nutrition', 'nutrition', (SELECT id FROM blog_categories WHERE slug = 'health'), 'Nutritional optimization'),
('Exercise', 'exercise', (SELECT id FROM blog_categories WHERE slug = 'health'), 'Exercise and movement optimization');

-- Insert subcategories for Technology
INSERT INTO blog_categories (name, slug, parent_id, description) VALUES
('EMF Meters', 'emf-meters', (SELECT id FROM blog_categories WHERE slug = 'technology'), 'EMF measurement devices'),
('Shielding', 'shielding', (SELECT id FROM blog_categories WHERE slug = 'technology'), 'EMF shielding products and techniques'),
('Software', 'software', (SELECT id FROM blog_categories WHERE slug = 'technology'), 'Software tools for optimization');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category_id, published, featured, reading_time, tags) VALUES
(
  'Optimizing Your Home Office for Low EMF',
  'optimizing-home-office-low-emf',
  '# Optimizing Your Home Office for Low EMF

In today''s digital world, our home offices have become central to our daily lives. However, they can also be significant sources of electromagnetic field (EMF) exposure. This comprehensive guide will help you create a healthier workspace.

## Understanding EMF Sources in Your Office

Your typical home office contains numerous EMF-emitting devices:
- Computer monitors and laptops
- WiFi routers and modems
- Desk lamps and lighting
- Power strips and electrical wiring
- Mobile phones and tablets

## Practical Optimization Steps

### 1. Distance is Your Friend
The inverse square law applies to EMF exposure - doubling your distance from a source reduces exposure by 75%. Position yourself at least 3 feet from your WiFi router and use an external monitor to increase distance from your laptop.

### 2. Wired Connections
Replace WiFi with ethernet cables where possible. This eliminates a major source of RF radiation while often providing faster, more stable internet.

### 3. Proper Grounding
Ensure your workspace is properly grounded. Use grounded power strips and consider a grounding mat for your desk area.

## Measuring Your Progress

Invest in a quality EMF meter to measure your optimization efforts. The Trifield TF2 is an excellent starting point for beginners.

Remember, optimization is about progress, not perfection. Small changes compound over time.',
  'Learn how to reduce EMF exposure in your home office with practical, science-based strategies that won''t break the bank.',
  (SELECT id FROM blog_categories WHERE slug = 'home-desk'),
  true,
  true,
  8,
  ARRAY['EMF', 'home office', 'optimization', 'health']
),
(
  'The Complete Guide to EMF Meters: Which One Should You Buy?',
  'complete-guide-emf-meters',
  '# The Complete Guide to EMF Meters: Which One Should You Buy?

Choosing the right EMF meter can be overwhelming with so many options available. This guide breaks down the key features and recommendations for different budgets and use cases.

## Types of EMF Meters

### Single-Axis vs. Tri-Axis
- **Single-axis**: Measures EMF in one direction, requires multiple readings
- **Tri-axis**: Measures all three spatial dimensions simultaneously

### Frequency Ranges
Different meters cover different frequency ranges:
- **ELF (Extremely Low Frequency)**: 0-300 Hz (power lines, appliances)
- **RF (Radio Frequency)**: 100 kHz - 8 GHz (WiFi, cell phones, microwaves)
- **Magnetic Fields**: DC and AC magnetic fields

## Top Recommendations

### Budget Option: Trifield TF2 ($169)
Perfect for beginners, measures electric, magnetic, and RF fields in one device.

### Professional: Gigahertz Solutions HF32D ($299)
Advanced RF analyzer with data logging capabilities.

### Comprehensive: Safe Living Technologies SLT Package ($450)
Complete kit for thorough EMF assessment.

## How to Use Your Meter

1. **Baseline measurements**: Record normal levels in different areas
2. **Source identification**: Locate high-EMF areas and devices
3. **Mitigation verification**: Confirm your optimization efforts are working

Remember, knowledge is power. Understanding your EMF environment is the first step toward optimization.',
  'A comprehensive buyer''s guide to EMF meters, from budget options to professional-grade equipment.',
  (SELECT id FROM blog_categories WHERE slug = 'emf-meters'),
  true,
  false,
  12,
  ARRAY['EMF meters', 'measurement', 'buying guide', 'technology']
);
