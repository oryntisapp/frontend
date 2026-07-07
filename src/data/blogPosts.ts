export interface BlogPost {
  slug: string;
  category: "Industry" | "Product" | "Playbook" | "Engineering";
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-operations-still-live-in-six-different-tabs",
    category: "Industry",
    title: "Why Operations Still Live in Six Different Tabs",
    excerpt:
      "Finance runs in NetSuite, HR lives in Workday, sales tracks in Salesforce, and your ops team keeps a master spreadsheet that nobody updates. This fragmentation — separate systems, manual handoffs, stale data — is the real bottleneck most organizations don't see until it costs them a quarter.",
    content:
      "Most organizations today run their business across half a dozen disconnected systems. Finance lives in NetSuite or QuickBooks. HR runs on Workday or BambooHR. Sales tracks opportunities in Salesforce. Customer support uses Zendesk or Intercom. And somewhere in the middle, an operations team maintains a master spreadsheet that everyone forgets to update.\n\nThis fragmentation creates a hidden tax on every cross-functional process. When finance needs headcount approval from HR, someone has to export a report, email it, wait for a reply, and manually reconcile the numbers. When sales closes a deal, the fulfillment handoff requires a human to copy data from one system to another. Each handoff is a delay. Each manual step is an opportunity for error.\n\nThe real cost isn't the tools themselves — it's the absence of a layer that connects them. Organizations spend millions on best-in-class SaaS products and then lose the value in the gaps between them. An invoice that sits in approval for three days because the right person doesn't see it isn't a finance problem or an HR problem — it's an operations problem that no single tool was built to solve.\n\nOryntis was designed to fill that gap: a coordination layer that lives across your existing systems, not instead of them. The tabs don't go away, but someone finally connects what's inside them.",
    readTime: "5 min read",
    publishedAt: "May 12, 2026",
  },
  {
    slug: "inside-the-ai-operations-engine",
    category: "Product",
    title: "Inside the AI Operations Engine",
    excerpt:
      "The AI Operations Engine sits across every department, ingesting events from your ERP, CRM, HR, and finance tools and coordinating cross-functional workflows automatically. It doesn't replace those systems — it connects them, turning a fragmented toolchain into a single operational layer.",
    content:
      "The AI Operations Engine is the core of the Oryntis platform — a real-time coordination layer that ingests events from every system you connect and orchestrates responses across them.\n\nWhen a new hire is added in Workday, the engine doesn't just log that event. It triggers the sequence of downstream actions that follow: provisioning an email account, adding the employee to payroll, assigning desk and equipment through your facilities system, and notifying the IT team — all without a human writing a single email or opening a single ticket.\n\nWhat makes this different from a traditional workflow tool is the engine's ability to reason across systems. It doesn't just execute a fixed sequence of steps. It monitors the state of each process, detects when something stalls, and either escalates or adjusts the workflow in real time. If a purchase order sits in approval for longer than the configured threshold, the engine doesn't wait — it notifies the next person in the chain and logs the delay for your weekly review.\n\nThe engine is designed to be agnostic about which specific systems you run. The connectors (ERP, CRM, HRIS, finance tools) normalize data from each source into a common schema so the engine can route information between them without custom integration work. That means the same workflow that runs between NetSuite and Workday today will work with SAP and BambooHR tomorrow if you switch providers.\n\nIt doesn't replace your existing tools. It makes them finally work as one system.",
    readTime: "4 min read",
    publishedAt: "April 28, 2026",
  },
  {
    slug: "finding-bottlenecks-before-they-cost-you",
    category: "Product",
    title: "Finding Bottlenecks Before They Cost You",
    excerpt:
      "The Workflow Intelligence System analyzes execution data across every connected system to surface delays, handoff failures, and capacity constraints — before they turn into missed SLAs or quarter-end fire drills.",
    content:
      "Most operations teams discover bottlenecks the hard way: a missed SLA, a quarter-end scramble, a customer complaint that traces back to a process that stalled three weeks ago. By the time you see the symptom, the root cause is buried in a log you don't have.\n\nThe Workflow Intelligence System changes that by analyzing every workflow execution across your connected systems in real time. It builds a baseline of normal performance for each process — how long an invoice approval typically takes, how often a sales-to-fulfillment handoff completes without manual intervention, where delays accumulate in the employee onboarding sequence.\n\nWhen a metric deviates from the baseline, the system surfaces an alert — not as another notification to ignore, but as a specific, actionable signal: 'Purchase orders from the AP department are spending 40% longer in approval this week. The bottleneck is at the director-level review step.'\n\nOver time, the intelligence layer learns which bottlenecks matter most. A two-hour delay in sales-to-fulfillment may be noise; a two-hour delay in a compliance-critical approval chain is a risk signal. The system weights alerts by business impact, so the operations team spends their time on what actually matters — not on a dashboard full of equal-priority warnings.\n\nThe goal isn't more data. It's fewer surprises.",
    readTime: "4 min read",
    publishedAt: "April 14, 2026",
  },
  {
    slug: "what-actually-gets-automated-in-week-one",
    category: "Playbook",
    title: "What Actually Gets Automates in Week One",
    excerpt:
      "Invoice approvals, headcount change triggers, support ticket escalations, and sales-to-fulfillment handoffs — the Business Automation Layer targets the repetitive cross-system tasks that consume most of your team's weekly hours, not the edge cases.",
    content:
      "Every operations team we've worked with has the same list: the repetitive, cross-system tasks that consume hours every week but aren't complex enough to justify building a custom integration. Invoice routing and approval. Headcount change notifications between HR and finance. Support ticket escalations that need to reach the right team based on customer tier. Sales-to-fulfillment handoffs that require data entry in three different systems.\n\nThese tasks share a pattern: they're rule-based, they cross system boundaries, and they happen frequently enough that the manual effort adds up to real cost — but not so frequently that anyone has prioritized automating them.\n\nThe Business Automation Layer is designed specifically for this middle ground. You define the trigger (an event in one connected system), the conditions (which accounts, which departments, which dollar thresholds), and the actions (create a record in another system, send a notification, escalate after a timeout).\n\nIn the first week of deployment, most teams automate between five and ten workflows. The quick wins are almost always in the same places: finance approvals, HR data changes, and customer-facing handoffs where speed directly impacts satisfaction. None of these are technically difficult to automate — the friction was always the integration between systems, not the logic itself.\n\nOnce those first workflows are running, the team has a template for everything else. The automation layer becomes a capability the business builds on, not a project that ends.",
    readTime: "6 min read",
    publishedAt: "March 30, 2026",
  },
  {
    slug: "one-source-of-truth-integrating-a-decade-of-saas-sprawl",
    category: "Engineering",
    title: "One Source of Truth: Integrating a Decade of SaaS Sprawl",
    excerpt:
      "The Integration & Data Layer connects to your existing ERP, CRM, HRIS, and finance APIs and normalizes their schemas into one queryable graph. No more exporting CSVs and reconciling spreadsheets — every system talks the same language.",
    content:
      "The average enterprise organization runs over 200 SaaS applications. Even the subset relevant to operations — ERP, CRM, HRIS, finance, support, procurement — spans a dozen or more systems, each with its own data model, API conventions, and update cadence.\n\nThe Integration & Data Layer solves this not by asking you to standardize your tools, but by abstracting away the differences. Each connector maps the source system's schema into a normalized, queryable graph. A 'customer' record in Salesforce and a 'customer' record in NetSuite become the same entity, with fields mapped and conflicts resolved according to rules you define.\n\nThis normalization has a practical effect: workflows and dashboards don't need to know which system data comes from. A dashboard metric showing 'active customers' can aggregate across Salesforce, NetSuite, and your support platform without custom code for each source. A workflow triggered by 'new customer signed contract' can pull details from the CRM and create records in finance and fulfillment systems automatically.\n\nThe layer also handles the operational complexity of integrations: rate limiting, retry logic, webhook reliability, schema drift detection. When a connected system updates its API, the layer surfaces the change and flags workflows that may be affected — before they break.\n\nYour systems don't need to speak the same language. The integration layer translates.",
    readTime: "5 min read",
    publishedAt: "March 16, 2026",
  },
  {
    slug: "reading-the-command-center-a-field-guide",
    category: "Product",
    title: "Reading the Command Center: A Field Guide",
    excerpt:
      "The Operations Command Dashboard surfaces real-time KPIs, workflow execution status, and predictive alerts in a single view. This walkthrough covers what each metric means and how to spot a developing bottleneck before your team feels it.",
    content:
      "The Operations Command Dashboard is the visual front door to the Oryntis platform — a single view that aggregates key metrics from every connected system and every running workflow.\n\nThe dashboard is organized around three layers of information:\n\nFirst, health metrics — the infrastructure-level signals that tell you whether your connected systems and the platform itself are running normally. Active workflows, automation success rate, system latency, API utilization. These are the 'check engine' indicators. If any of them drift outside their normal range, the dashboard surface them immediately.\n\nSecond, operational KPIs — the business-level numbers that reflect how your processes are performing. Workflow completion rates, average handling time per process type, bottleneck frequency by department. These are the metrics you'd track in a weekly review, available in real time.\n\nThird, predictive alerts — the signals the Workflow Intelligence System generates when it detects a deviation from baseline performance. These aren't raw data points; they're analyzed, prioritized, and presented with context: 'Finance approvals are slowing down. The bottleneck is at the director-level step. Three workflows are currently queued.'\n\nReading the dashboard effectively means starting with the alerts (what needs attention now), then checking the KPIs (what's trending in the wrong direction), and using the health metrics as a diagnostic when something doesn't look right. It's designed to answer one question: 'Is everything running the way it should?' — and if not, 'What do I do about it?'\n\nNo complex queries, no custom reports. Just the state of your operations, in one place.",
    readTime: "4 min read",
    publishedAt: "March 2, 2026",
  },
];
