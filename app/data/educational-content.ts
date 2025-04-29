export interface EducationalPoint {
  id: string
  title: string
  description: string
  position: [number, number, number] // 3D coordinates
  scrollTrigger: number // Scroll percentage when this becomes relevant (0-1)
}

export const EDUCATIONAL_POINTS: EducationalPoint[] = [
  {
    id: "cosmic-dust",
    title: "Cosmic Dust",
    description:
      "Tiny particles that exist in space between stars. These microscopic particles are crucial in the formation of new stars and planetary systems.",
    position: [0.5, 0.7, 1.2],
    scrollTrigger: 0.1,
  },
  {
    id: "nebula",
    title: "Nebulae",
    description:
      "Giant clouds of dust and gas where stars are born. These stellar nurseries can span hundreds of light years across and contain the building blocks of solar systems.",
    position: [-1.2, 0.3, -0.6],
    scrollTrigger: 0.2,
  },
  {
    id: "dark-matter",
    title: "Dark Matter",
    description:
      "An invisible form of matter that doesn't emit, absorb, or reflect light. It makes up approximately 85% of the matter in the universe and 27% of its total mass-energy content.",
    position: [0.8, -0.9, 0.5],
    scrollTrigger: 0.3,
  },
  {
    id: "black-hole",
    title: "Black Holes",
    description:
      "Regions of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it once it passes the event horizon.",
    position: [-0.6, -0.5, -1.1],
    scrollTrigger: 0.4,
  },
  {
    id: "cosmic-expansion",
    title: "Cosmic Expansion",
    description:
      "The universe is constantly expanding, with galaxies moving away from each other. This expansion began with the Big Bang and continues to accelerate due to dark energy.",
    position: [1.3, 0.2, -0.8],
    scrollTrigger: 0.5,
  },
  {
    id: "galaxy-formation",
    title: "Galaxy Formation",
    description:
      "Galaxies form as matter coalesces under gravity, spinning into spiral or elliptical shapes containing billions of stars, nebulae, and planetary systems.",
    position: [-0.9, 0.8, 0.7],
    scrollTrigger: 0.6,
  },
  {
    id: "stellar-lifecycle",
    title: "Stellar Lifecycle",
    description:
      "Stars are born in nebulae, live by fusing hydrogen into helium, and can die as supernovae, neutron stars, or black holes depending on their initial mass.",
    position: [0.4, -1.2, -0.3],
    scrollTrigger: 0.7,
  },
  {
    id: "cosmic-microwave",
    title: "Cosmic Microwave Background",
    description:
      "Electromagnetic radiation as a remnant from the early stage of the universe, providing evidence for the Big Bang theory and the age of the universe.",
    position: [-1.1, -0.4, 1.0],
    scrollTrigger: 0.8,
  },
]

export const COSMIC_FACTS = [
  "The observable universe is approximately 93 billion light-years in diameter.",
  "There are more stars in the universe than grains of sand on all the beaches on Earth.",
  "The largest known structure in the universe is the Hercules-Corona Borealis Great Wall, spanning about 10 billion light-years.",
  "A day on Venus is longer than a year on Venus.",
  "The Milky Way galaxy is moving through space at approximately 2.1 million kilometers per hour.",
  "The light hitting Earth today from distant stars left them thousands or even millions of years ago.",
  "Black holes can 'sing' as they collide, emitting gravitational waves at specific frequencies.",
  "There are billions of galaxies in the observable universe, each containing billions of stars.",
  "The universe is expanding at an accelerating rate due to a mysterious force called dark energy.",
  "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 4 billion tons.",
]
