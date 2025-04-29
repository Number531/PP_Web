import { EDUCATIONAL_POINTS, COSMIC_FACTS } from "../data/educational-content"
import { PRODUCT_FEATURES, COMPANY_FACTS } from "../data/company-content"
import type { EducationalPoint, ProductFeature } from "../types"

/**
 * Service for managing and retrieving application data
 */
export const DataService = {
  /**
   * Get educational points filtered by scroll progress
   */
  getVisibleEducationalPoints(scrollProgress: number): EducationalPoint[] {
    return EDUCATIONAL_POINTS.filter((point) => point.scrollTrigger <= scrollProgress)
  },

  /**
   * Get product features filtered by scroll progress
   */
  getVisibleProductFeatures(scrollProgress: number): ProductFeature[] {
    return PRODUCT_FEATURES.filter((feature) => feature.scrollTrigger <= scrollProgress)
  },

  /**
   * Get a random cosmic fact
   */
  getRandomCosmicFact(): string {
    return COSMIC_FACTS[Math.floor(Math.random() * COSMIC_FACTS.length)]
  },

  /**
   * Get a random company fact
   */
  getRandomCompanyFact(): string {
    return COMPANY_FACTS[Math.floor(Math.random() * COMPANY_FACTS.length)]
  },

  /**
   * Get an educational point by ID
   */
  getEducationalPointById(id: string): EducationalPoint | undefined {
    return EDUCATIONAL_POINTS.find((point) => point.id === id)
  },

  /**
   * Get a product feature by ID
   */
  getProductFeatureById(id: string): ProductFeature | undefined {
    return PRODUCT_FEATURES.find((feature) => feature.id === id)
  },
}
