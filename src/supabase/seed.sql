-- ============================================================
-- OFFICES SEED DATA
-- ============================================================
INSERT INTO offices (id, name_en, name_bn, parent_office_id, category, responsibilities) VALUES
('bd',           'Bangladesh',                             'বাংলাদেশ',              NULL,           'Executive',     'Sovereign people of the People''s Republic of Bangladesh'),
('cat-exec',     'Executive & Administration',              'শাসন ব্যবস্থা',         'bd',           'Executive',     'The executive branch responsible for administration and governance'),
('cat-const',    'Constitutional & Independent Bodies',     'সাংবিধানিক প্রতিষ্ঠান',   'bd',           'Constitutional', 'Independent constitutional bodies ensuring checks and balances in the state'),
('cat-legis',    'Legislature',                            'আইনসভা',                'bd',           'Legislative',   'The Jatiya Sangsad (National Parliament) of Bangladesh'),
('cat-judiciary','Judiciary',                              'বিচার বিভাগ',            'bd',           'Judiciary',     'The judicial branch ensuring the rule of law and constitutional supremacy'),

('president-office', 'President''s Office',                 'রাষ্ট্রপতির কার্যালয়',    'cat-exec',     'Executive',     'Constitutional head of state; supreme commander of armed forces'),
('pm-office',        'Prime Minister''s Office',            'প্রধানমন্ত্রীর কার্যালয়', 'cat-exec',     'Executive',     'Head of government; leads the cabinet; exercises executive authority'),
('cabinet-division', 'Cabinet Division',                   'মন্ত্রিপরিষদ বিভাগ',      'pm-office',    'Executive',     'Coordinates inter-ministerial affairs; supports cabinet meetings'),
('min-home',         'Ministry of Home Affairs',           'স্বরাষ্ট্র মন্ত্রণালয়',    'pm-office',    'Executive',     'Formulates and implements policies related to internal security, police, law and order'),
('pub-sec-div',      'Public Security Division',           'জননিরাপত্তা বিভাগ',       'min-home',     'Executive',     'Administrative oversight of police, RAB, Ansar, and other law enforcement agencies'),
('bd-police',        'Bangladesh Police',                  'বাংলাদেশ পুলিশ',          'pub-sec-div',  'Executive',     'National law enforcement agency responsible for maintaining public order and safety'),
('police-hq',        'Police Headquarters',                'পুলিশ সদরদপ্তর',          'bd-police',    'Executive',     'Central command and administrative hub of Bangladesh Police'),
('range-dig',        'Range DIG Office',                   'রেঞ্জ ডিআইজি কার্যালয়',   'bd-police',    'Executive',     'Supervises multiple districts within a police range'),
('dist-sp',          'District SP Office',                 'জেলা পুলিশ সুপারের কার্যালয়', 'range-dig', 'Executive',  'Heads district police; maintains law and order at district level'),
('police-station',   'Police Station',                     'পুলিশ স্টেশন / থানা',     'dist-sp',      'Executive',     'Frontline law enforcement unit serving a specific locality'),

('min-religion',     'Ministry of Religious Affairs',      'ধর্ম বিষয়ক মন্ত্রণালয়',  'pm-office',    'Executive',     'Oversees religious institutions, pilgrimage affairs, and interfaith harmony'),
('hajj-office',      'Hajj Office',                         'হজ অফিস',                'min-religion', 'Executive',     'Manages Hajj pilgrimage operations, registration, and coordination with Saudi authorities'),

('election-commission', 'Election Commission',              'নির্বাচন কমিশন',          'cat-const',    'Constitutional','Conducts free and fair national and local elections'),
('cec-office',         'Chief Election Commissioner''s Office', 'প্রধান নির্বাচন কমিশনারের কার্যালয়', 'election-commission', 'Constitutional', 'Heads the Election Commission; oversees electoral processes'),
('psc',                'Public Service Commission',         'পাবলিক সার্ভিস কমিশন',     'cat-const',    'Constitutional','Recruits civil servants through competitive examinations'),
('cag-office',         'Comptroller & Auditor General''s Office', 'মহাহিসাব নিরীক্ষকের কার্যালয়', 'cat-const', 'Constitutional', 'Audits all government accounts and public funds'),
('ombudsman-office',   'Ombudsman''s Office',               'লোকপালের কার্যালয়',       'cat-const',    'Constitutional','Investigates complaints against government maladministration'),

('jatiya-sangsad',     'Jatiya Sangsad',                    'জাতীয় সংসদ',             'cat-legis',    'Legislative',   'The supreme legislative body of Bangladesh'),
('speaker-office',     'Speaker''s Office',                 'স্পীকারের কার্যালয়',      'jatiya-sangsad','Legislative',  'Presides over Jatiya Sangsad sessions; ensures parliamentary discipline'),
('parl-secretariat',   'Parliament Secretariat',            'সংসদ সচিবালয়',           'jatiya-sangsad','Legislative',  'Provides administrative support to Jatiya Sangsad'),

('supreme-court',      'Supreme Court of Bangladesh',       'বাংলাদেশ সুপ্রিম কোর্ট',   'cat-judiciary','Judiciary',    'Apex judicial body comprising the Appellate and High Court Divisions'),
('appellate-div',      'Appellate Division',                'আপিল বিভাগ',              'supreme-court','Judiciary',    'Highest appellate court; hears appeals from High Court Division'),
('hc-div',             'High Court Division',               'হাইকোর্ট বিভাগ',           'supreme-court','Judiciary',    'Original and appellate jurisdiction; hears writ petitions and civil/criminal appeals'),
('dist-court',         'District Court',                    'জেলা আদালত',              'cat-judiciary','Judiciary',    'Presides over district civil and criminal cases');

-- ============================================================
-- POSITIONS SEED DATA
-- ============================================================
INSERT INTO positions (id, office_id, designation_en, designation_bn, grade, parent_position_id, recruitment_process, salary_source, responsibilities) VALUES

-- Hajj Office positions
('hajj-dir',          'hajj-office', 'Director',                    'পরিচালক',              'Grade 3',  NULL,               'BCS (Administration) Cadre - Promotion', 'Revenue Budget', 'Overall head of the Hajj Office; oversees all pilgrimage operations and coordination with Saudi authorities'),
('hajj-deputy-dir',   'hajj-office', 'Deputy Director',             'উপ-পরিচালক',           'Grade 5',  'hajj-dir',         'BCS (Administration) Cadre - Promotion', 'Revenue Budget', 'Assists Director; oversees registration and logistics divisions'),
('hajj-assistant-dir','hajj-office', 'Assistant Director',          'সহকারী পরিচালক',       'Grade 7',  'hajj-deputy-dir',  'BCS (Administration) Cadre',             'Revenue Budget', 'Manages daily operations of Hajj registration and pilgrim support'),
('hajj-admin-officer','hajj-office', 'Administrative Officer',      'প্রশাসনিক কর্মকর্তা',    'Grade 9',  'hajj-assistant-dir','BCS (Administration) / Direct Recruitment','Revenue Budget', 'Handles administrative tasks, file management, and coordination'),
('hajj-accountant',   'hajj-office', 'Accountant',                  'হিসাবরক্ষক',            'Grade 11', 'hajj-admin-officer','Direct Recruitment',                    'Revenue Budget', 'Manages financial transactions, pilgrimage fees, and budgetary records'),
('hajj-office-assistant','hajj-office', 'Office Assistant',         'অফিস সহায়ক',           'Grade 14', 'hajj-admin-officer','Direct Recruitment',                    'Revenue Budget', 'Provides clerical support, document filing, and visitor assistance'),
('hajj-steno',        'hajj-office', 'Stenographer',                'স্টেনোগ্রাফার',          'Grade 12', 'hajj-admin-officer','Direct Recruitment',                    'Revenue Budget', 'Handles dictation, transcription, and confidential correspondence'),

-- District SP Office positions
('dist-sp-sup',  'dist-sp', 'Superintendent of Police (SP)', 'পুলিশ সুপার (এসপি)', 'Grade 5', NULL, 'BCS (Police) Cadre - Promotion', 'Revenue Budget', 'Head of district police; maintains law and order in the district'),
('dist-addl-sp', 'dist-sp', 'Additional SP',                'অতিরিক্ত পুলিশ সুপার',  'Grade 6', 'dist-sp-sup', 'BCS (Police) Cadre - Promotion', 'Revenue Budget', 'Assists SP in district police administration and operations'),
('dist-asp',     'dist-sp', 'Assistant Superintendent (ASP)','সহকারী পুলিশ সুপার (এএসপি)', 'Grade 9', 'dist-addl-sp', 'BCS (Police) Cadre - Direct Recruit', 'Revenue Budget', 'Entry-level BCS police officer; serves as circle ASP'),

-- Police Station positions
('oc-ps',        'police-station', 'Officer-in-Charge (OC)',  'ওসি (পরিদর্শক)',    'Grade 10', NULL,         'BCS (Police) Cadre / Promotion from SI', 'Revenue Budget', 'Head of a police station; oversees all police operations at the station'),
('si-ps',        'police-station', 'Sub-Inspector (SI)',      'উপ-পরিদর্শক (এসআই)','Grade 10', 'oc-ps',     'Promotion from ASI / Direct Recruit',     'Revenue Budget', 'Investigates criminal cases; conducts patrol and law enforcement'),
('asi-ps',       'police-station', 'Assistant Sub-Inspector (ASI)', 'সহকারী উপ-পরিদর্শক (এএসআই)','Grade 11', 'si-ps', 'Promotion from Constable',              'Revenue Budget', 'Assists SI in investigation and law enforcement duties'),
('constable-ps', 'police-station', 'Constable',                'কনস্টেবল',          'Grade 17', 'asi-ps',    'Direct Recruitment',                     'Revenue Budget', 'Entry-level police personnel; performs guard duty, patrol, traffic control');
