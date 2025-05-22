/**
 * Email templates for career application responses
 */

/**
 * Generate position-specific content for confirmation emails
 * based on the job title the candidate applied for
 */
export function getPositionSpecificContent(jobTitle: string): { 
  htmlContent: string; 
  textContent: string; 
} {
  const title = jobTitle.toLowerCase();
  
  // AI Research positions
  if (title.includes('research') || title.includes('scientist')) {
    return {
      htmlContent: `
<div style="margin-top: 25px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #1a365d; margin-top: 0;">About Our Research Team</h3>
  <p>Our AI Research team is at the forefront of developing verifiable AI systems that eliminate hallucinations. We're particularly focused on:</p>
  <ul>
    <li>Developing novel verification techniques for large language models</li>
    <li>Creating evaluation frameworks for hallucination detection</li>
    <li>Building systems that can provide proof of their reasoning</li>
  </ul>
  <p>Researchers at P-Squared regularly publish at top-tier conferences like NeurIPS, ICML, and ACL, and collaborate with leading academic institutions.</p>
</div>`,
      textContent: `
ABOUT OUR RESEARCH TEAM

Our AI Research team is at the forefront of developing verifiable AI systems that eliminate hallucinations. We're particularly focused on:
- Developing novel verification techniques for large language models
- Creating evaluation frameworks for hallucination detection
- Building systems that can provide proof of their reasoning

Researchers at P-Squared regularly publish at top-tier conferences like NeurIPS, ICML, and ACL, and collaborate with leading academic institutions.`
    };
  }
  
  // Engineering positions
  else if (title.includes('engineer') || title.includes('developer') || title.includes('programmer')) {
    return {
      htmlContent: `
<div style="margin-top: 25px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #1a365d; margin-top: 0;">About Our Engineering Team</h3>
  <p>Our Engineering team builds the systems and infrastructure that power P-Squared's verifiable AI products. As an engineering-driven company, we value:</p>
  <ul>
    <li>Technical excellence and continuous learning</li>
    <li>Collaborative problem-solving and knowledge sharing</li>
    <li>Building robust, scalable, and maintainable systems</li>
  </ul>
  <p>Engineers at P-Squared work with cutting-edge technologies and have the opportunity to directly impact products used by enterprise customers worldwide.</p>
</div>`,
      textContent: `
ABOUT OUR ENGINEERING TEAM

Our Engineering team builds the systems and infrastructure that power P-Squared's verifiable AI products. As an engineering-driven company, we value:
- Technical excellence and continuous learning
- Collaborative problem-solving and knowledge sharing
- Building robust, scalable, and maintainable systems

Engineers at P-Squared work with cutting-edge technologies and have the opportunity to directly impact products used by enterprise customers worldwide.`
    };
  }
  
  // Product positions
  else if (title.includes('product') || title.includes('manager') || title.includes('pm')) {
    return {
      htmlContent: `
<div style="margin-top: 25px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #1a365d; margin-top: 0;">About Our Product Team</h3>
  <p>Our Product team drives the vision and strategy for P-Squared's AI solutions. We're focused on:</p>
  <ul>
    <li>Deeply understanding enterprise customer needs across industries</li>
    <li>Translating complex AI capabilities into intuitive user experiences</li>
    <li>Prioritizing features that deliver measurable business value</li>
  </ul>
  <p>Product Managers at P-Squared collaborate closely with engineering, research, design, and go-to-market teams to build products that transform how enterprises use AI.</p>
</div>`,
      textContent: `
ABOUT OUR PRODUCT TEAM

Our Product team drives the vision and strategy for P-Squared's AI solutions. We're focused on:
- Deeply understanding enterprise customer needs across industries
- Translating complex AI capabilities into intuitive user experiences
- Prioritizing features that deliver measurable business value

Product Managers at P-Squared collaborate closely with engineering, research, design, and go-to-market teams to build products that transform how enterprises use AI.`
    };
  }
  
  // Sales/Business positions
  else if (title.includes('sales') || title.includes('business') || title.includes('account')) {
    return {
      htmlContent: `
<div style="margin-top: 25px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #1a365d; margin-top: 0;">About Our Sales Team</h3>
  <p>Our Sales team partners with enterprise customers to solve critical business challenges using P-Squared's verifiable AI technology. We focus on:</p>
  <ul>
    <li>Building trusted relationships with Fortune 500 companies</li>
    <li>Understanding complex industry-specific challenges</li>
    <li>Demonstrating measurable ROI from AI investments</li>
  </ul>
  <p>Sales professionals at P-Squared are technical consultants who help customers transform their operations with AI that can be trusted for mission-critical applications.</p>
</div>`,
      textContent: `
ABOUT OUR SALES TEAM

Our Sales team partners with enterprise customers to solve critical business challenges using P-Squared's verifiable AI technology. We focus on:
- Building trusted relationships with Fortune 500 companies
- Understanding complex industry-specific challenges
- Demonstrating measurable ROI from AI investments

Sales professionals at P-Squared are technical consultants who help customers transform their operations with AI that can be trusted for mission-critical applications.`
    };
  }
  
  // Default for other positions
  else {
    return {
      htmlContent: `
<div style="margin-top: 25px; padding: 20px; background-color: #f0f4f8; border: 1px solid #d0d9e6; border-radius: 8px;">
  <h3 style="color: #1a365d; margin-top: 0;">About P-Squared</h3>
  <p>At P-Squared, we're building AI systems that enterprises can trust for mission-critical applications. Our core values include:</p>
  <ul>
    <li>Rigorous verification of AI outputs</li>
    <li>Transparency in how our systems work</li>
    <li>Customer-focused innovation</li>
  </ul>
  <p>We're a team of researchers, engineers, and industry experts committed to eliminating AI hallucinations and building systems that can prove the correctness of their outputs.</p>
</div>`,
      textContent: `
ABOUT P-SQUARED

At P-Squared, we're building AI systems that enterprises can trust for mission-critical applications. Our core values include:
- Rigorous verification of AI outputs
- Transparency in how our systems work
- Customer-focused innovation

We're a team of researchers, engineers, and industry experts committed to eliminating AI hallucinations and building systems that can prove the correctness of their outputs.`
    };
  }
}

/**
 * Generate HTML email template for career application confirmation
 */
export function generateCareerEmailHtml(
  name: string,
  jobTitle: string,
  resumeName: string,
  coverLetterName: string | null,
  positionInfo: { htmlContent: string; textContent: string }
): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <h2 style="color: #1a365d;">Thank you for your application</h2>
  <p>Dear ${name},</p>
  <p>Thank you for applying to the <strong>${jobTitle}</strong> position at P-Squared. We appreciate your interest in joining our team.</p>
  <p>We've received your application and our recruiting team is reviewing it now. If your qualifications match our needs, we'll contact you to schedule an initial interview.</p>
  
  ${positionInfo.htmlContent}
  
  <div style="margin-top: 25px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
    <h3 style="margin-top: 0; color: #1a365d;">Application Summary</h3>
    <p><strong>Position:</strong> ${jobTitle}</p>
    <p><strong>Resume:</strong> ${resumeName}</p>
    ${coverLetterName ? `<p><strong>Cover Letter:</strong> ${coverLetterName}</p>` : ''}
  </div>
  
  <p style="margin-top: 25px;">If you have any questions about your application or our hiring process, please feel free to reply to this email.</p>
  
  <p>Best regards,<br>
  <strong>The P-Squared Recruiting Team</strong><br>
  <a href="mailto:careers@psqrd.ai" style="color: #0066cc;">careers@psqrd.ai</a></p>
  
  <hr style="margin-top: 30px; margin-bottom: 20px; border-top: 1px solid #eee;">
  
  <div style="margin-top: 30px; font-size: 0.75em; color: #999; text-align: center;">
    <p>© ${new Date().getFullYear()} P-Squared AI. All rights reserved.</p>
    <p>123 Innovation Way, San Francisco, CA 94107</p>
  </div>
</div>
`;
}

/**
 * Generate text email template for career application confirmation
 */
export function generateCareerEmailText(
  name: string,
  jobTitle: string,
  resumeName: string,
  coverLetterName: string | null,
  positionInfo: { htmlContent: string; textContent: string }
): string {
  return `
Dear ${name},

Thank you for applying to the ${jobTitle} position at P-Squared. We appreciate your interest in joining our team.

We've received your application and our recruiting team is reviewing it now. If your qualifications match our needs, we'll contact you to schedule an initial interview.

${positionInfo.textContent}

For your reference, here's a summary of your application:
- Position: ${jobTitle}
- Resume: ${resumeName}
${coverLetterName ? `- Cover Letter: ${coverLetterName}` : ''}

If you have any questions about your application or our hiring process, please feel free to reply to this email.

Best regards,
The P-Squared Recruiting Team
careers@psqrd.ai
`;
}
