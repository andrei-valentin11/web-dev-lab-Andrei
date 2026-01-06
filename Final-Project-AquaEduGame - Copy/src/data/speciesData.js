export const speciesData = [
  {
    id: 1,
    name: 'Tilapia',
    scientificName: 'Oreochromis niloticus',
    image: '🐟',
    description: 'One of the most popular freshwater fish in the Philippines, known for its fast growth and adaptability.',
    phLevel: {
      min: 6.5,
      max: 8.5,
      optimal: 7.0
    },
    oxygenLevel: {
      min: 4,
      max: 8,
      optimal: 6,
      unit: 'mg/L'
    },
    temperature: {
      min: 22,
      max: 30,
      optimal: 26,
      unit: '°C'
    },
    waterDepth: {
      min: 1,
      max: 3,
      optimal: 1.5,
      unit: 'meters'
    },
    salinity: {
      min: 0,
      max: 5,
      optimal: 0,
      unit: 'ppt'
    },
    feeding: 'Omnivorous - feed 2-3 times daily',
    growthRate: 'Fast (4-6 months to harvest)',
    difficulty: 'Easy'
  },
  {
    id: 2,
    name: 'Bangus (Milkfish)',
    scientificName: 'Chanos chanos',
    image: '🐠',
    description: 'The national fish of the Philippines, highly valued for its taste and nutritional value.',
    phLevel: {
      min: 7.5,
      max: 8.5,
      optimal: 8.0
    },
    oxygenLevel: {
      min: 5,
      max: 10,
      optimal: 7,
      unit: 'mg/L'
    },
    temperature: {
      min: 25,
      max: 32,
      optimal: 28,
      unit: '°C'
    },
    waterDepth: {
      min: 0.5,
      max: 2,
      optimal: 1,
      unit: 'meters'
    },
    salinity: {
      min: 10,
      max: 35,
      optimal: 25,
      unit: 'ppt'
    },
    feeding: 'Herbivorous - feed 2-3 times daily with algae and commercial feed',
    growthRate: 'Moderate (6-8 months to harvest)',
    difficulty: 'Medium'
  },
  {
    id: 3,
    name: 'Shrimp (Vannamei)',
    scientificName: 'Litopenaeus vannamei',
    image: '🦐',
    description: 'Premium shrimp species with high market value, requires careful water management.',
    phLevel: {
      min: 7.5,
      max: 8.5,
      optimal: 8.0
    },
    oxygenLevel: {
      min: 5,
      max: 8,
      optimal: 6.5,
      unit: 'mg/L'
    },
    temperature: {
      min: 26,
      max: 32,
      optimal: 28,
      unit: '°C'
    },
    waterDepth: {
      min: 0.8,
      max: 1.5,
      optimal: 1.2,
      unit: 'meters'
    },
    salinity: {
      min: 15,
      max: 30,
      optimal: 25,
      unit: 'ppt'
    },
    feeding: 'Omnivorous - feed 3-4 times daily',
    growthRate: 'Fast (3-4 months to harvest)',
    difficulty: 'Hard'
  },
  {
    id: 4,
    name: 'Crab (Mud Crab)',
    scientificName: 'Scylla serrata',
    image: '🦀',
    description: 'High-value crustacean species, popular in both local and export markets.',
    phLevel: {
      min: 7.0,
      max: 8.5,
      optimal: 7.8
    },
    oxygenLevel: {
      min: 4,
      max: 8,
      optimal: 6,
      unit: 'mg/L'
    },
    temperature: {
      min: 24,
      max: 30,
      optimal: 27,
      unit: '°C'
    },
    waterDepth: {
      min: 0.5,
      max: 1.5,
      optimal: 1,
      unit: 'meters'
    },
    salinity: {
      min: 10,
      max: 35,
      optimal: 20,
      unit: 'ppt'
    },
    feeding: 'Carnivorous - feed 2 times daily with fish, mollusks',
    growthRate: 'Moderate (5-6 months to harvest)',
    difficulty: 'Medium'
  },
  {
    id: 5,
    name: 'Seaweed (Kappaphycus)',
    scientificName: 'Kappaphycus alvarezii',
    image: '🌿',
    description: 'Important aquaculture crop for carrageenan production, environmentally friendly.',
    phLevel: {
      min: 7.5,
      max: 8.5,
      optimal: 8.0
    },
    oxygenLevel: {
      min: 5,
      max: 10,
      optimal: 7,
      unit: 'mg/L'
    },
    temperature: {
      min: 25,
      max: 30,
      optimal: 27,
      unit: '°C'
    },
    waterDepth: {
      min: 0.5,
      max: 2,
      optimal: 1,
      unit: 'meters'
    },
    salinity: {
      min: 30,
      max: 35,
      optimal: 33,
      unit: 'ppt'
    },
    feeding: 'Photosynthetic - requires sunlight and nutrients',
    growthRate: 'Fast (45-60 days per cycle)',
    difficulty: 'Easy'
  },
  {
    id: 6,
    name: 'Grouper',
    scientificName: 'Epinephelus spp.',
    image: '🐡',
    description: 'Premium marine fish with high market demand, requires expert care.',
    phLevel: {
      min: 7.8,
      max: 8.5,
      optimal: 8.2
    },
    oxygenLevel: {
      min: 6,
      max: 10,
      optimal: 8,
      unit: 'mg/L'
    },
    temperature: {
      min: 26,
      max: 30,
      optimal: 28,
      unit: '°C'
    },
    waterDepth: {
      min: 1.5,
      max: 3,
      optimal: 2,
      unit: 'meters'
    },
    salinity: {
      min: 30,
      max: 35,
      optimal: 33,
      unit: 'ppt'
    },
    feeding: 'Carnivorous - feed 2 times daily with fresh fish',
    growthRate: 'Slow (8-12 months to harvest)',
    difficulty: 'Hard'
  }
]

