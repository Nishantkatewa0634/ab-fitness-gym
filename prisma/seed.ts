import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AB Fitness Gym All-India Franchise database...');

  // Wipe existing seed data for idempotent seeding
  await prisma.workoutExercise.deleteMany({});
  await prisma.workoutLog.deleteMany({});
  await prisma.progressEntry.deleteMany({});
  await prisma.fitnessGoal.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.membership.deleteMany({});
  await prisma.exercise.deleteMany({});
  await prisma.workoutPlan.deleteMany({});
  await prisma.gymLocation.deleteMany({});
  await prisma.plan.deleteMany({});

  // 1. Core Subscription Plans
  const plans = [
    {
      name: 'Silver Franchise Plan',
      slug: 'silver-plan',
      price: 999,
      duration: 1,
      tier: 'SILVER',
      description: 'Ideal for getting started with state-of-the-art home city gym access and digital tracking.',
      features: JSON.stringify([
        'Unlimited access to your home city gym',
        'Standard cardio & resistance floor access',
        'Digital Virtual Gym Card & QR check-in',
        'In-app workout & progress logging',
        'Free locker & shower facilities',
      ]),
      popular: false,
      active: true,
    },
    {
      name: 'Gold All-India Passport',
      slug: 'gold-plan',
      price: 1999,
      duration: 1,
      tier: 'GOLD',
      description: 'Our most popular All-India membership. Workout seamlessly at any of our 25+ clubs across India.',
      features: JSON.stringify([
        'All-India access across 25+ prime gym locations',
        'Unlimited Group Classes (HIIT, Yoga, Zumba, CrossFit)',
        '1 complimentary body composition analysis per month',
        'Guest pass: Bring a friend 2 times every month',
        'Premium access to digital workout splits & guides',
      ]),
      popular: true,
      active: true,
    },
    {
      name: 'Platinum Elite VIP',
      slug: 'platinum-plan',
      price: 3499,
      duration: 1,
      tier: 'PLATINUM',
      description: 'The ultimate VIP fitness experience with dedicated personal training and custom nutrition planning.',
      features: JSON.stringify([
        'VIP All-India access to all 25+ franchise locations',
        '4 Personal Trainer 1-on-1 coaching sessions/month',
        'Customized clinical nutrition & macro meal plan',
        'Priority booking for spa, recovery pod & sauna',
        'Unlimited guest privileges (up to 4 times/month)',
      ]),
      popular: false,
      active: true,
    },
  ];

  for (const p of plans) {
    await prisma.plan.create({ data: p });
  }

  // 2. Create 25+ Indian Gym Locations
  const locationsData = [
    {
      name: 'AB Fitness Prime - Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: '4th Floor, Horizon Tower, Linking Road, Bandra West, Mumbai 400050',
      phone: '+91 98200 11001',
      email: 'mumbai.bandra@abfitness.in',
      lat: 19.0600,
      lng: 72.8335,
      amenities: JSON.stringify(['CrossFit Arena', 'Recovery Pods', 'Organic Juice Bar', 'Valet Parking', 'Olympic Lifting Zone']),
      rating: 4.9,
    },
    {
      name: 'AB Fitness Hub - Connaught Place',
      city: 'Delhi',
      state: 'Delhi NCR',
      address: 'Block M, Outer Circle, Connaught Place, New Delhi 110001',
      phone: '+91 98110 22002',
      email: 'delhi.cp@abfitness.in',
      lat: 28.6315,
      lng: 77.2167,
      amenities: JSON.stringify(['Cardio Amphitheatre', 'Steam & Sauna', 'Functional Turf', 'Smart Lockers']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Tech - Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      address: '100 Feet Road, Near Metro Station, Indiranagar, Bengaluru 560038',
      phone: '+91 98450 33003',
      email: 'bengaluru.indiranagar@abfitness.in',
      lat: 12.9784,
      lng: 77.6408,
      amenities: JSON.stringify(['Biometric Access', 'HIIT Studio', 'Co-Working Lounge', 'High-Speed WiFi', 'Cold Plunge']),
      rating: 4.9,
    },
    {
      name: 'AB Fitness Cyber - Gachibowli',
      city: 'Hyderabad',
      state: 'Telangana',
      address: 'DLF Cyber City Road, Gachibowli, Hyderabad 500032',
      phone: '+91 98490 44004',
      email: 'hyderabad.gachibowli@abfitness.in',
      lat: 17.4401,
      lng: 78.3489,
      amenities: JSON.stringify(['24/7 Access', 'CrossFit', 'Cafe & Protein Bar', 'Cryotherapy']),
      rating: 4.9,
    },
    {
      name: 'AB Fitness Arena - Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      address: 'Lane 6, North Main Road, Koregaon Park, Pune 411001',
      phone: '+91 98220 55005',
      email: 'pune.kp@abfitness.in',
      lat: 18.5362,
      lng: 73.8940,
      amenities: JSON.stringify(['Rooftop Yoga', 'Spin Studio', 'Physiotherapy Center', 'Organic Cafe']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Metro - T. Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      address: 'North Usman Road, T. Nagar, Chennai 600017',
      phone: '+91 98400 66006',
      email: 'chennai.tnagar@abfitness.in',
      lat: 13.0418,
      lng: 80.2341,
      amenities: JSON.stringify(['Air-Conditioned Track', 'Olympic Lifting', 'Zumba Studio', 'Dietary Clinic']),
      rating: 4.7,
    },
    {
      name: 'AB Fitness Elite - SG Highway',
      city: 'Ahmedabad',
      state: 'Gujarat',
      address: 'Mondeal Heights, Sarkhej-Gandhinagar Highway, Ahmedabad 380015',
      phone: '+91 98250 77007',
      email: 'ahmedabad.sghighway@abfitness.in',
      lat: 23.0330,
      lng: 72.5080,
      amenities: JSON.stringify(['Luxury Sauna', 'Women-Only Zone', 'Hammer Strength Equipment', 'Smoothie Lounge']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Plaza - Park Street',
      city: 'Kolkata',
      state: 'West Bengal',
      address: 'Stephen Court Building, 18 Park Street, Kolkata 700071',
      phone: '+91 98300 88008',
      email: 'kolkata.parkstreet@abfitness.in',
      lat: 22.5551,
      lng: 88.3527,
      amenities: JSON.stringify(['Heritage Ambience', 'Steam Rooms', 'Advanced Cardio Floor', 'Personal Training Studios']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Cyber Park - DLF Phase 4',
      city: 'Gurugram',
      state: 'Haryana',
      address: 'Galleria Market Complex, DLF Phase 4, Gurugram 122009',
      phone: '+91 98100 99009',
      email: 'gurugram.dlf4@abfitness.in',
      lat: 28.4682,
      lng: 77.0818,
      amenities: JSON.stringify(['Powerlifting Platforms', 'HIIT Circuit Zone', 'Cryo Recovery', 'Protein Bar']),
      rating: 4.9,
    },
    {
      name: 'AB Fitness Studio - Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      address: 'Atta Market, Opposite DLF Mall of India, Sector 18, Noida 201301',
      phone: '+91 98111 00110',
      email: 'noida.sec18@abfitness.in',
      lat: 28.5678,
      lng: 77.3245,
      amenities: JSON.stringify(['CrossFit Ring', 'Kickboxing Cage', 'Sauna', 'Smart Lockers']),
      rating: 4.7,
    },
    {
      name: 'AB Fitness Royal - C-Scheme',
      city: 'Jaipur',
      state: 'Rajasthan',
      address: 'Ashok Marg, C-Scheme, Jaipur 302001',
      phone: '+91 98290 11211',
      email: 'jaipur.cscheme@abfitness.in',
      lat: 26.9124,
      lng: 75.7873,
      amenities: JSON.stringify(['Rooftop Gym Floor', 'Luxury Spa', 'Cardio Theatre', 'Nutritional Counseling']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Club - Sector 17',
      city: 'Chandigarh',
      state: 'Chandigarh',
      address: 'SCO 45-47, Plaza Market, Sector 17-C, Chandigarh 160017',
      phone: '+91 98140 22322',
      email: 'chandigarh.sec17@abfitness.in',
      lat: 30.7333,
      lng: 76.7794,
      amenities: JSON.stringify(['Olympic Platforms', 'Steam Room', 'Bio-impedance Scanner', 'Valet Parking']),
      rating: 4.9,
    },
    {
      name: 'AB Fitness Lounge - Hazratganj',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      address: 'MG Marg, Near Sahu Cinema, Hazratganj, Lucknow 226001',
      phone: '+91 98390 33433',
      email: 'lucknow.hazratganj@abfitness.in',
      lat: 26.8500,
      lng: 80.9499,
      amenities: JSON.stringify(['Hammer Strength Line', 'Spinning Arena', 'Cafe & Lounge']),
      rating: 4.7,
    },
    {
      name: 'AB Fitness Marine - Marine Drive',
      city: 'Kochi',
      state: 'Kerala',
      address: 'Goshree Bridge Road, Marine Drive, Kochi 682031',
      phone: '+91 98470 44544',
      email: 'kochi.marinedrive@abfitness.in',
      lat: 9.9816,
      lng: 76.2799,
      amenities: JSON.stringify(['Sea-View Cardio', 'Calisthenics Deck', 'Physiotherapy Suite']),
      rating: 4.9,
    },
    {
      name: 'AB Fitness Prime - AB Road',
      city: 'Indore',
      state: 'Madhya Pradesh',
      address: 'Vijay Nagar Square, AB Road, Indore 452010',
      phone: '+91 98260 55655',
      email: 'indore.vijaynagar@abfitness.in',
      lat: 22.7533,
      lng: 75.8937,
      amenities: JSON.stringify(['CrossFit Zone', 'Functional Turf', 'Juice Bar', 'Valet Parking']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Lakeview - MP Nagar',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      address: 'Zone-1, Maharana Pratap Nagar, Bhopal 462011',
      phone: '+91 98270 66766',
      email: 'bhopal.mpnagar@abfitness.in',
      lat: 23.2324,
      lng: 77.4300,
      amenities: JSON.stringify(['Cardio Floor', 'Steam Sauna', 'Yoga Studio']),
      rating: 4.7,
    },
    {
      name: 'AB Fitness Hub - Vesu',
      city: 'Surat',
      state: 'Gujarat',
      address: 'VIP Road, Near Vesu Point, Surat 395007',
      phone: '+91 98251 77877',
      email: 'surat.vesu@abfitness.in',
      lat: 21.1418,
      lng: 72.7709,
      amenities: JSON.stringify(['Women Only Studio', 'CrossFit Arena', 'Organic Smoothie Bar']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Central - Dharampeth',
      city: 'Nagpur',
      state: 'Maharashtra',
      address: 'West High Court Road, Dharampeth, Nagpur 440010',
      phone: '+91 98230 88988',
      email: 'nagpur.dharampeth@abfitness.in',
      lat: 21.1397,
      lng: 79.0620,
      amenities: JSON.stringify(['Olympic Weights', 'HIIT Circuit', 'Dietician Clinic']),
      rating: 4.7,
    },
    {
      name: 'AB Fitness Plaza - Boring Road',
      city: 'Patna',
      state: 'Bihar',
      address: 'Sri Krishna Nagar, Boring Road Chauraha, Patna 800001',
      phone: '+91 98350 99099',
      email: 'patna.boringroad@abfitness.in',
      lat: 25.6110,
      lng: 85.1189,
      amenities: JSON.stringify(['Heavy Weight Floor', 'Steam Room', 'Cardio Theatre']),
      rating: 4.6,
    },
    {
      name: 'AB Fitness Arena - Alkapuri',
      city: 'Vadodara',
      state: 'Gujarat',
      address: 'RC Dutt Road, Alkapuri, Vadodara 390007',
      phone: '+91 98240 10101',
      email: 'vadodara.alkapuri@abfitness.in',
      lat: 22.3106,
      lng: 73.1709,
      amenities: JSON.stringify(['Functional Turf', 'Spin Class Studio', 'Cafe']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Elite - RS Puram',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      address: 'DB Road, RS Puram, Coimbatore 641002',
      phone: '+91 98420 20202',
      email: 'coimbatore.rspuram@abfitness.in',
      lat: 11.0046,
      lng: 76.9485,
      amenities: JSON.stringify(['Biometric Lockers', 'Sauna', 'Personal Coaching Suites']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Coastal - MVP Colony',
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      address: 'Sector 3, MVP Colony, Visakhapatnam 530017',
      phone: '+91 98480 30303',
      email: 'vizag.mvp@abfitness.in',
      lat: 17.7385,
      lng: 83.3330,
      amenities: JSON.stringify(['Sea-breeze Balcony', 'CrossFit Rig', 'Juice Lounge']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Prime - Sarabha Nagar',
      city: 'Ludhiana',
      state: 'Punjab',
      address: 'Kipps Market, Sarabha Nagar, Ludhiana 141001',
      phone: '+91 98150 40404',
      email: 'ludhiana.sarabhanagar@abfitness.in',
      lat: 30.8920,
      lng: 75.8200,
      amenities: JSON.stringify(['Heavy Lifting Platforms', 'Steam & Recovery', 'Organic Cafe']),
      rating: 4.8,
    },
    {
      name: 'AB Fitness Heritage - Sanjay Place',
      city: 'Agra',
      state: 'Uttar Pradesh',
      address: 'Commercial Hub, Sanjay Place, Agra 282002',
      phone: '+91 98370 50505',
      email: 'agra.sanjayplace@abfitness.in',
      lat: 27.2030,
      lng: 78.0050,
      amenities: JSON.stringify(['Modern Cardio Zone', 'Strength Arena', 'Personal Training']),
      rating: 4.7,
    },
    {
      name: 'AB Fitness Hub - Saheed Nagar',
      city: 'Bhubaneswar',
      state: 'Odisha',
      address: 'Janpath Road, Saheed Nagar, Bhubaneswar 751007',
      phone: '+91 98610 60606',
      email: 'bhubaneswar.saheednagar@abfitness.in',
      lat: 20.2961,
      lng: 85.8245,
      amenities: JSON.stringify(['CrossFit Zone', 'Functional Turf', 'Steam Bath']),
      rating: 4.8,
    },
  ];

  for (const loc of locationsData) {
    await prisma.gymLocation.create({ data: loc });
  }

  // 3. Create 20+ Exercises across muscle groups
  const exercisesData = [
    {
      name: 'Barbell Bench Press',
      slug: 'barbell-bench-press',
      muscleGroup: 'Chest',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: 'Lie flat on a bench, grip the barbell slightly wider than shoulder-width. Lower the bar smoothly to your mid-chest, pause briefly, and press explosively upwards while keeping shoulders retracted.',
      tips: JSON.stringify(['Keep elbows tucked at a 45-degree angle', 'Plant feet firmly on the floor', 'Maintain a slight natural arch in lower back']),
    },
    {
      name: 'Incline Dumbbell Press',
      slug: 'incline-dumbbell-press',
      muscleGroup: 'Chest',
      equipment: 'Dumbbell',
      difficulty: 'Intermediate',
      instructions: 'Set bench to a 30-45 degree incline. Press dumbbells overhead with palms facing forward, lowering until dumbbells reach upper chest level before pressing back up.',
      tips: JSON.stringify(['Focus on upper pectoral contraction', 'Do not clank dumbbells at the top', 'Control the descent for 2-3 seconds']),
    },
    {
      name: 'Cable Flyes (Mid Chest)',
      slug: 'cable-flyes-mid-chest',
      muscleGroup: 'Chest',
      equipment: 'Machine',
      difficulty: 'Beginner',
      instructions: 'Set pulleys to shoulder height. Step forward slightly, bring handles together in front of your chest in a hugging motion, squeeze, and return slowly.',
      tips: JSON.stringify(['Maintain a slight bend in your elbows', 'Squeeze pectorals for 1 second at apex', 'Avoid using momentum']),
    },
    {
      name: 'Conventional Barbell Deadlift',
      slug: 'conventional-barbell-deadlift',
      muscleGroup: 'Back',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      instructions: 'Stand with mid-foot under barbell. Grip just outside shins, drop hips, brace core, and drive through the heels until standing fully erect with hips locked out.',
      tips: JSON.stringify(['Keep neutral spine throughout movement', 'Bar path should travel in a straight vertical line', 'Do not hyperextend lower back at top']),
    },
    {
      name: 'Wide-Grip Lat Pulldown',
      slug: 'wide-grip-lat-pulldown',
      muscleGroup: 'Back',
      equipment: 'Machine',
      difficulty: 'Beginner',
      instructions: 'Sit securely under thigh pads. Grip bar wider than shoulders, pull the bar down to upper chest while driving elbows down and back.',
      tips: JSON.stringify(['Lead with your elbows', 'Keep chest proud and slightly arched', 'Avoid leaning far back']),
    },
    {
      name: 'Bent-Over Barbell Row',
      slug: 'bent-over-barbell-row',
      muscleGroup: 'Back',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: 'Hinge at hips to approximately 45 degrees. Pull barbell toward your lower ribcage while squeezing shoulder blades together at the peak contraction.',
      tips: JSON.stringify(['Keep core tight to protect lumbar spine', 'Do not bounce the weight', 'Look slightly ahead on the floor']),
    },
    {
      name: 'Seated Cable Row',
      slug: 'seated-cable-row',
      muscleGroup: 'Back',
      equipment: 'Machine',
      difficulty: 'Beginner',
      instructions: 'Sit with knees slightly bent. Pull V-handle toward your abdomen while keeping torso upright and shoulders pulled back.',
      tips: JSON.stringify(['Stretch lats fully on the return', 'Keep torso stationary', 'Squeeze scapula together']),
    },
    {
      name: 'Overhead Barbell Military Press',
      slug: 'overhead-barbell-military-press',
      muscleGroup: 'Shoulders',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: 'Stand tall holding barbell at collarbone level. Press overhead until arms lock out directly above your ears while bracing glutes and core.',
      tips: JSON.stringify(['Do not lean back excessively', 'Keep wrists straight under the bar', 'Exhale at top of the press']),
    },
    {
      name: 'Dumbbell Lateral Raises',
      slug: 'dumbbell-lateral-raises',
      muscleGroup: 'Shoulders',
      equipment: 'Dumbbell',
      difficulty: 'Beginner',
      instructions: 'Stand holding dumbbells at your sides. Raise arms out to the sides until parallel with the floor, leading slightly with pinkies.',
      tips: JSON.stringify(['Pretend you are pouring pitchers of water at the top', 'Keep slight bend in elbows', 'Avoid shrugging traps']),
    },
    {
      name: 'Face Pulls (Rope Attachment)',
      slug: 'face-pulls-rope',
      muscleGroup: 'Shoulders',
      equipment: 'Machine',
      difficulty: 'Beginner',
      instructions: 'Set cable pulley at face level. Pull rope attachment toward bridge of nose while externally rotating shoulders so hands finish beside ears.',
      tips: JSON.stringify(['Crucial for rotator cuff and rear delt health', 'Pull elbows high and back', 'Hold peak contraction for 1 second']),
    },
    {
      name: 'Barbell Back Squat',
      slug: 'barbell-back-squat',
      muscleGroup: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      instructions: 'Rest barbell across upper traps. Squat down until thighs break parallel with floor, keeping knees tracking over toes and chest up, then drive up.',
      tips: JSON.stringify(['Brace core with 360-degree breath', 'Drive through mid-foot and heels', 'Keep upper back tight']),
    },
    {
      name: 'Romanian Deadlift (RDL)',
      slug: 'romanian-deadlift',
      muscleGroup: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: 'Hold barbell with slight bend in knees. Hinge hips backwards while lowering bar along thighs until you feel a deep hamstring stretch, then drive hips forward.',
      tips: JSON.stringify(['Hinge from hips, do not squat down', 'Keep bar close to legs', 'Maintain flat back']),
    },
    {
      name: 'Leg Press Machine',
      slug: 'leg-press-machine',
      muscleGroup: 'Legs',
      equipment: 'Machine',
      difficulty: 'Beginner',
      instructions: 'Place feet shoulder-width on platform. Lower sled until knees hit 90 degrees, then push sled up smoothly without locking out knees completely.',
      tips: JSON.stringify(['Do not let lower back lift off backrest', 'Keep knees aligned with toes', 'Control the negative']),
    },
    {
      name: 'Walking Dumbbell Lunges',
      slug: 'walking-dumbbell-lunges',
      muscleGroup: 'Legs',
      equipment: 'Dumbbell',
      difficulty: 'Intermediate',
      instructions: 'Step forward and drop back knee just above the floor. Push through front heel to rise and step forward into next lunge.',
      tips: JSON.stringify(['Keep torso upright', 'Do not let front knee collapse inward', 'Take long controlled steps']),
    },
    {
      name: 'EZ-Bar Bicep Curls',
      slug: 'ez-bar-bicep-curls',
      muscleGroup: 'Arms',
      equipment: 'Barbell',
      difficulty: 'Beginner',
      instructions: 'Hold EZ-bar with shoulder-width underhand grip. Curl bar toward chest while keeping elbows pinned to your sides.',
      tips: JSON.stringify(['Avoid swinging body', 'Squeeze biceps hard at top', 'Lower bar slowly over 2 seconds']),
    },
    {
      name: 'Tricep Rope Pushdowns',
      slug: 'tricep-rope-pushdowns',
      muscleGroup: 'Arms',
      equipment: 'Machine',
      difficulty: 'Beginner',
      instructions: 'Attach rope to high pulley. Push rope down while spreading ends apart at bottom and keeping elbows fixed at sides.',
      tips: JSON.stringify(['Lock out arms fully at bottom', 'Keep upper arms stationary', 'Feel stretch at top of movement']),
    },
    {
      name: 'Skull Crushers (Lying Tricep Extension)',
      slug: 'skull-crushers',
      muscleGroup: 'Arms',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: 'Lie on flat bench holding EZ-bar overhead. Lower bar toward forehead by bending elbows, then extend arms back to starting position.',
      tips: JSON.stringify(['Keep elbows pointed up', 'Control weight carefully near forehead', 'Squeeze triceps at lockout']),
    },
    {
      name: 'Hanging Leg Raises',
      slug: 'hanging-leg-raises',
      muscleGroup: 'Core',
      equipment: 'Bodyweight',
      difficulty: 'Intermediate',
      instructions: 'Hang from pull-up bar. Raise legs until parallel to floor (or toes to bar) by flexing lower abs and tilting pelvis forward.',
      tips: JSON.stringify(['Avoid swinging', 'Initiate lift with lower abs, not hip flexors', 'Control descent']),
    },
    {
      name: 'Cable Woodchoppers',
      slug: 'cable-woodchoppers',
      muscleGroup: 'Core',
      equipment: 'Machine',
      difficulty: 'Intermediate',
      instructions: 'Set cable at shoulder height. Grab handle with both hands and rotate torso across body while keeping arms extended.',
      tips: JSON.stringify(['Pivot back foot as you rotate', 'Engage obliques throughout', 'Keep core braced']),
    },
    {
      name: 'HIIT Kettlebell Swings',
      slug: 'hiit-kettlebell-swings',
      muscleGroup: 'Full Body',
      equipment: 'Dumbbell',
      difficulty: 'Intermediate',
      instructions: 'Hinge hips and swing kettlebell between legs, then snap hips forward explosively to swing kettlebell to chest height.',
      tips: JSON.stringify(['Power comes from glutes and hip thrust, not arms', 'Keep spine neutral', 'Exhale sharply on hip snap']),
    },
  ];

  const createdExercises: Record<string, any> = {};
  for (const ex of exercisesData) {
    const record = await prisma.exercise.create({ data: ex });
    createdExercises[ex.slug] = record;
  }

  // 4. Create 8+ Workout Plans mapped to exercises
  const workoutPlansData = [
    {
      name: 'Full Body Blast (3-Day Split)',
      slug: 'full-body-blast',
      category: 'Strength',
      difficulty: 'Beginner',
      duration: 55,
      calories: 480,
      description: 'An all-around foundational full-body routine designed to stimulate major muscle groups and boost metabolic conditioning.',
      featured: true,
      exercises: [
        { slug: 'barbell-bench-press', sets: 4, reps: '10-12', restSeconds: 60, order: 1 },
        { slug: 'wide-grip-lat-pulldown', sets: 4, reps: '12', restSeconds: 60, order: 2 },
        { slug: 'leg-press-machine', sets: 4, reps: '12-15', restSeconds: 75, order: 3 },
        { slug: 'overhead-barbell-military-press', sets: 3, reps: '10', restSeconds: 60, order: 4 },
        { slug: 'hanging-leg-raises', sets: 3, reps: '15', restSeconds: 45, order: 5 },
      ],
    },
    {
      name: 'Upper Body Hypertrophy Power',
      slug: 'upper-body-power',
      category: 'Hypertrophy',
      difficulty: 'Intermediate',
      duration: 65,
      calories: 550,
      description: 'High-volume chest, back, and shoulder workout designed to maximize upper body width and muscular density.',
      featured: true,
      exercises: [
        { slug: 'incline-dumbbell-press', sets: 4, reps: '8-10', restSeconds: 75, order: 1 },
        { slug: 'bent-over-barbell-row', sets: 4, reps: '8-10', restSeconds: 75, order: 2 },
        { slug: 'cable-flyes-mid-chest', sets: 3, reps: '12-15', restSeconds: 60, order: 3 },
        { slug: 'seated-cable-row', sets: 3, reps: '12', restSeconds: 60, order: 4 },
        { slug: 'dumbbell-lateral-raises', sets: 4, reps: '15', restSeconds: 45, order: 5 },
        { slug: 'face-pulls-rope', sets: 3, reps: '15', restSeconds: 45, order: 6 },
      ],
    },
    {
      name: 'Leg Day Destroyer',
      slug: 'leg-day-destroyer',
      category: 'Strength',
      difficulty: 'Advanced',
      duration: 70,
      calories: 650,
      description: 'Intense lower body routine targeting quads, hamstrings, glutes, and calves for serious strength and endurance.',
      featured: true,
      exercises: [
        { slug: 'barbell-back-squat', sets: 5, reps: '6-8', restSeconds: 120, order: 1 },
        { slug: 'romanian-deadlift', sets: 4, reps: '8-10', restSeconds: 90, order: 2 },
        { slug: 'leg-press-machine', sets: 4, reps: '12-15', restSeconds: 75, order: 3 },
        { slug: 'walking-dumbbell-lunges', sets: 3, reps: '20 steps', restSeconds: 60, order: 4 },
      ],
    },
    {
      name: 'Push Day (Chest, Shoulders & Triceps)',
      slug: 'push-day-pro',
      category: 'Hypertrophy',
      difficulty: 'Intermediate',
      duration: 60,
      calories: 520,
      description: 'Dedicated pushing split for maximum chest fullness, boulder shoulders, and horseshoe tricep development.',
      featured: false,
      exercises: [
        { slug: 'barbell-bench-press', sets: 4, reps: '8', restSeconds: 90, order: 1 },
        { slug: 'incline-dumbbell-press', sets: 3, reps: '10', restSeconds: 75, order: 2 },
        { slug: 'overhead-barbell-military-press', sets: 4, reps: '8-10', restSeconds: 75, order: 3 },
        { slug: 'dumbbell-lateral-raises', sets: 4, reps: '15', restSeconds: 45, order: 4 },
        { slug: 'tricep-rope-pushdowns', sets: 4, reps: '12-15', restSeconds: 45, order: 5 },
      ],
    },
    {
      name: 'Pull Day (Back, Traps & Biceps)',
      slug: 'pull-day-pro',
      category: 'Hypertrophy',
      difficulty: 'Intermediate',
      duration: 60,
      calories: 530,
      description: 'Build a V-taper back and powerful arms with deadlifts, heavy rows, and targeted bicep isolation.',
      featured: false,
      exercises: [
        { slug: 'conventional-barbell-deadlift', sets: 4, reps: '5', restSeconds: 150, order: 1 },
        { slug: 'wide-grip-lat-pulldown', sets: 4, reps: '10-12', restSeconds: 60, order: 2 },
        { slug: 'seated-cable-row', sets: 3, reps: '12', restSeconds: 60, order: 3 },
        { slug: 'face-pulls-rope', sets: 3, reps: '15', restSeconds: 45, order: 4 },
        { slug: 'ez-bar-bicep-curls', sets: 4, reps: '10-12', restSeconds: 60, order: 5 },
      ],
    },
    {
      name: 'HIIT Fat Burner Circuit',
      slug: 'hiit-fat-burner',
      category: 'Cardio',
      difficulty: 'Intermediate',
      duration: 35,
      calories: 490,
      description: 'High-intensity metabolic conditioning circuit to burn maximum calories and keep metabolism elevated.',
      featured: true,
      exercises: [
        { slug: 'hiit-kettlebell-swings', sets: 5, reps: '20', restSeconds: 30, order: 1 },
        { slug: 'walking-dumbbell-lunges', sets: 4, reps: '24 steps', restSeconds: 45, order: 2 },
        { slug: 'hanging-leg-raises', sets: 4, reps: '15', restSeconds: 30, order: 3 },
      ],
    },
    {
      name: 'Core Crusher & Ab Sculptor',
      slug: 'core-crusher',
      category: 'Functional',
      difficulty: 'Beginner',
      duration: 25,
      calories: 210,
      description: 'Direct core and rotational oblique circuit for a rock-solid midsection and enhanced spinal stability.',
      featured: false,
      exercises: [
        { slug: 'hanging-leg-raises', sets: 4, reps: '15-20', restSeconds: 45, order: 1 },
        { slug: 'cable-woodchoppers', sets: 4, reps: '15 per side', restSeconds: 45, order: 2 },
      ],
    },
    {
      name: 'Arm Day Super-Pump (Biceps & Triceps)',
      slug: 'arm-day-super-pump',
      category: 'Hypertrophy',
      difficulty: 'Intermediate',
      duration: 45,
      calories: 380,
      description: 'High-rep antagonistic supersets targeting biceps and triceps for an incredible arm pump.',
      featured: false,
      exercises: [
        { slug: 'ez-bar-bicep-curls', sets: 4, reps: '12', restSeconds: 60, order: 1 },
        { slug: 'skull-crushers', sets: 4, reps: '12', restSeconds: 60, order: 2 },
        { slug: 'tricep-rope-pushdowns', sets: 4, reps: '15', restSeconds: 45, order: 3 },
      ],
    },
  ];

  for (const wp of workoutPlansData) {
    const createdPlan = await prisma.workoutPlan.create({
      data: {
        name: wp.name,
        slug: wp.slug,
        category: wp.category,
        difficulty: wp.difficulty,
        duration: wp.duration,
        calories: wp.calories,
        description: wp.description,
        featured: wp.featured,
      },
    });

    for (const item of wp.exercises) {
      const exRecord = createdExercises[item.slug];
      if (exRecord) {
        await prisma.workoutExercise.create({
          data: {
            workoutPlanId: createdPlan.id,
            exerciseId: exRecord.id,
            sets: item.sets,
            reps: item.reps,
            restSeconds: item.restSeconds,
            order: item.order,
          },
        });
      }
    }
  }

  // 5. Create a Default Demo User with Active Membership & Progress logs
  const hashedPassword = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'rahul@abfitness.in' },
    update: {
      gender: 'Male',
      height: 178.5,
      dob: '1996-04-12',
    },
    create: {
      name: 'Rahul Verma',
      email: 'rahul@abfitness.in',
      password: hashedPassword,
      phone: '+91 98765 43210',
      city: 'Mumbai',
      gender: 'Male',
      height: 178.5,
      dob: '1996-04-12',
      role: 'MEMBER',
    },
  });

  const goldPlan = await prisma.plan.findUnique({ where: { slug: 'gold-plan' } });
  if (goldPlan) {
    await prisma.membership.create({
      data: {
        userId: demoUser.id,
        planId: goldPlan.id,
        status: 'ACTIVE',
        cardNumber: 'ABF-2026-9842',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        autoRenew: true,
      },
    });
  }

  // Sample progress entries
  await prisma.progressEntry.createMany({
    data: [
      { userId: demoUser.id, weight: 78.5, bodyFat: 18.2, date: new Date('2026-05-01') },
      { userId: demoUser.id, weight: 77.2, bodyFat: 17.5, date: new Date('2026-05-15') },
      { userId: demoUser.id, weight: 76.0, bodyFat: 16.8, date: new Date('2026-06-01') },
      { userId: demoUser.id, weight: 75.1, bodyFat: 16.0, date: new Date('2026-06-15') },
      { userId: demoUser.id, weight: 74.3, bodyFat: 15.4, date: new Date('2026-07-01') },
    ],
  });

  // Sample goals
  await prisma.fitnessGoal.createMany({
    data: [
      {
        userId: demoUser.id,
        type: 'WEIGHT',
        title: 'Target Summer Body Weight',
        target: 72.0,
        current: 74.3,
        unit: 'kg',
        status: 'ACTIVE',
      },
      {
        userId: demoUser.id,
        type: 'BENCH_PRESS',
        title: 'Bench Press 100kg Club',
        target: 100,
        current: 85,
        unit: 'kg',
        status: 'ACTIVE',
      },
    ],
  });

  console.log('Database successfully seeded with plans, 25+ locations, 20+ exercises, 8+ workout plans, and demo member!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
