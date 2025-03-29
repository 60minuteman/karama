
const children = [
    { icon: '🍼', age_group: 'Infant', count: '1'},
    { icon: '🧸', age_group: 'Toddler', count: '1'},
    { icon: '✏️', age_group: 'Pre Schooler' },

]

const pets = [
    { label: 'Cat', emoji: '🐱' },
    { label: 'Cow', emoji: '🐮' },
    { label: 'Frog', emoji: '🐸' },
]
const languages = [
    'Hausa',
    'Arabic',
    'Hindi',
]
const interests = [
    { label: 'Dance', icon: '💃' },
    { label: 'DIY', icon: '⭐', },
    { label: 'Drama', icon: '🎭', },
    { label: 'Magic', icon: '✨' },
    { label: 'Piano', icon: '🎹' },
    { label: 'Painting', icon: '🎨' },
    { label: 'Gaming', icon: '🎮' },
    { label: 'Film Making', icon: '🎥' },
    { label: 'Trumpet', icon: '🎺' },
    { label: 'Arts & Crafts', icon: '🎨' },
    { label: 'Photography', icon: '📸' },
    { label: 'Videography', icon: '📹', },
    { label: 'Fashion Design', icon: '💎', },

]
const religion = [
    { label: 'Buddhism', icon: '☸️' },

]
const personality = [
    { label: 'Chill', icon: '🕯️', },
    { label: 'Patient', icon: '😌', },
    { label: 'Wacky', icon: '🤪', },
]
const disability = [
    'Dyslexia',
    'ADHD',
]
const rules = [
    { label: 'No Screens', icon: '📱' },
    { label: 'No Vaping', icon: '💨' },
    { label: 'No Hitting', icon: '👊' },
    { label: 'No Swearing', icon: '🤬' },
    { label: 'No Bullying', icon: '🚫' },
    { label: 'No Nuts', icon: '🥜', },
    { label: 'Montessori' as const, icon: '🌈' },
]
const schedule = [
    'Mon : 7am - 70pm',
    'Tue : 7am - 2pm  ',
    'Wed : 4pm - 8pm ',
    'Thur : 7am - 5pm  ',
    'Fri : 7am - 70pm',
]
const workOptions = [
    { label: 'Full Time', icon: '🕐' },
    { label: 'Long Term', icon: '📋' },
    { label: 'Live In', icon: '💤' },
]
const requirements = [
    { label: 'Can Travel', icon: '✈️' },
    { label: 'Able To Drive', icon: '🚗' },
    { label: 'First Aid', icon: '🏥' },
    { label: 'Can Swim', icon: '🏊' },
    { label: 'COVID Vaccination', icon: '💉' },
]
const childcareResponsibilities = [
    { label: 'Bathing', icon: '🛁' },
    { label: 'Laundry', icon: '🧺' },
    { label: 'Packing Lunch', icon: '🥪' },
    { label: 'Driving', icon: '🚗' },
    { label: 'Cooking', icon: '🍳' },
    { label: 'Play Dates', icon: '🎮' },
    { label: 'Commuting', icon: '🚌' },
    { label: 'Scheduling/ Planning', icon: '📅' },
]
const householdResponsibilities = [
    { id: 'mealPrep', label: 'Meal Prep', icon: '🥘' },
    { id: 'ironing', label: 'Ironing', icon: '👔' },
    { id: 'errands', label: 'Errands', icon: '🏃' },
    { id: 'petCare', label: 'Pet Care', icon: '🐾' },
    { id: 'lightHousekeeping2', label: 'Light Housekeeping', icon: '🧹' },
    { id: 'deepHousekeeping', label: 'Deep Housekeeping', icon: '🧽' },
    { id: 'managingProperties', label: 'Managing Properties', icon: '🏘️' },
]
const benefits = [
    { id: 'yearly_raise' as const, label: 'Yearly Raise', icon: '💸' },
    { id: 'maternity_leave' as const, label: 'Maternity Leave', icon: '👶' },
    { id: 'health_insurance' as const, label: 'Health Insurance', icon: '🏥' },
    { id: 'retirement_account' as const, label: 'Retirement Account', icon: '🤑' },
    { id: 'metro_card' as const, label: 'Monthly Metro Card', icon: '🚇' },
]
export {
    children,
    pets,
    personality,
    disability,
    religion,
    interests,
    languages,
    rules,
    schedule,
    workOptions,
    requirements,
    childcareResponsibilities,
    householdResponsibilities,
    benefits,
}