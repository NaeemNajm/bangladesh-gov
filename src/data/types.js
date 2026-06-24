/**
 * @typedef {Object} Office
 * @property {string} id - অনন্য আইডি (যেমন: "hajj-office")
 * @property {string} name_bn - দপ্তরের নাম বাংলায়
 * @property {string} [parent_office_id] - অধীনস্থ দপ্তরের আইডি
 * @property {string} office_type_bn - দপ্তরের ধরণ (যেমন: "মন্ত্রণালয়", "অধিদপ্তর", "সাংবিধানিক প্রতিষ্ঠান")
 * @property {string} jurisdiction_bn - এখতিয়ার (যেমন: "সমগ্র বাংলাদেশ", "বগুড়া জেলা")
 * @property {string} [governing_law_bn] - প্রাসঙ্গিক আইন (যেমন: "হজ ও ওমরাহ ব্যবস্থাপনা আইন, ২০২১")
 * @property {string} target_audience_bn - সেবাগ্রহীতারা (যারা এখান থেকে সেবা নেয়)
 * @property {{website?: string, email?: string, phone?: string}} [contact_info] - যোগাযোগের তথ্য
 * @property {string} description_bn - দপ্তরের বিবরণ ও কার্যাবলী
 */

/**
 * @typedef {Object} Position
 * @property {string} id - অনন্য আইডি (যেমন: "hajj-dir")
 * @property {string} office_id - দপ্তরের আইডি (foreign key)
 * @property {string} designation_bn - পদবি বাংলায়
 * @property {string} pay_grade_bn - বেতন গ্রেড (যেমন: "গ্রেড ৩")
 * @property {string} [parent_position_id] - উর্ধ্বতন পদের আইডি
 * @property {string} [equivalent_rank_bn] - সমমর্যাদা (যেমন: "সেনাবাহিনীর মেজর পদমর্যাদা")
 * @property {string} [official_salutation_bn] - সম্বোধন (যেমন: "বরাবর, জেলা প্রশাসক")
 * @property {string} [appointing_authority_bn] - নিয়োগকারী কর্তৃপক্ষ
 * @property {string} [public_service_usecase_bn] - নাগরিক সেবা (প্রত্যক্ষ সেবা)
 * @property {string} [career_progression_bn] - পদোন্নতি পথ
 * @property {string} responsibilities_bn - দায়িত্ব ও কর্তব্য
 */

export const OfficeTypes = {}
export const PositionTypes = {}
