import { BlogPost } from '../blog-posts-types';
import { post as hallucinationHorizon } from './hallucination-horizon-verifiable-ai';
import { post as escapingTrustTax } from './escaping-ai-trust-tax';
import { post as shatteringBlackBox } from './shattering-ai-black-box';
import { post as defensiveToDecisive } from './defensive-posture-decisive-power';
import { post as beyondHype } from './beyond-transitory-hype';
import { post as beyondOperationalEfficiency } from './beyond-operational-efficiency';
import { post as beyondAutomation } from './beyond-automation';
import { post as acceleratingPerilOfInertia } from './accelerating-peril-of-inertia';
import { post as navigatingRegulatoryLabyrinth } from './navigating-regulatory-labyrinth';
import { post as unseenFoundation } from './unseen-foundation';
import { post as aiTrustParadox } from './ai-trust-paradox';

export const posts: BlogPost[] = [
  hallucinationHorizon,
  escapingTrustTax,
  shatteringBlackBox,
  defensiveToDecisive,
  beyondHype,
  beyondOperationalEfficiency,
  beyondAutomation,
  acceleratingPerilOfInertia,
  navigatingRegulatoryLabyrinth,
  unseenFoundation,
  aiTrustParadox
];

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(post => post.categories.includes(category));
}
