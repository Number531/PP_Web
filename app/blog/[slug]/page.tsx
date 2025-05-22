import { redirect } from "next/navigation"

export default function BlogPostPage() {
  // Redirect to the main blog page since we're now using a modal approach
  redirect("/blog")
}
