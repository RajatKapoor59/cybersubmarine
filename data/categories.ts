export interface Category {
  slug: string;
  name: string;
  description: string;
  color: string;
}

export const categories: Category[] = [
  {
    slug: "soc-monitoring",
    name: "SOC & Monitoring",
    description: "Threat detection, alert response, and security operations for lean teams.",
    color: "#00B4D8",
  },
  {
    slug: "microsoft-365",
    name: "Microsoft 365 Security",
    description: "Securing email, SharePoint, Teams, and your entire M365 environment.",
    color: "#0077A8",
  },
  {
    slug: "managed-security",
    name: "Managed Security",
    description: "How to evaluate, choose, and work with MSSPs and MDR providers.",
    color: "#005F73",
  },
  {
    slug: "compliance",
    name: "Compliance & Certification",
    description: "SOC 2, ISO 27001, Cyber Essentials — explained without the consultant markup.",
    color: "#2E8B57",
  },
  {
    slug: "incident-response",
    name: "Incident Response",
    description: "What to do when something goes wrong. Before, during, and after.",
    color: "#C9541A",
  },
  {
    slug: "tool-comparisons",
    name: "Tool Comparisons",
    description: "Honest side-by-side breakdowns of security tools for SMB budgets.",
    color: "#7B5EA7",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
