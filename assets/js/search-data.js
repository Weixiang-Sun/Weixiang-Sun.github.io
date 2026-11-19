// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "Notes by Weixiang Sun on research and other things.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-home",
          title: "Home",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "Project pages for work Weixiang Sun led or co-led.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Publications by Weixiang Sun, newest first.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "news-excited-to-start-my-ph-d-at-university-of-notre-dame",
          title: 'Excited to start my Ph.D. at University of Notre Dame.',
          description: "",
          section: "News",},{id: "news-we-release-llms4all-a-review-on-large-language-models-for-research-and-applications-in-academic-disciplines",
          title: 'We release LLMs4All: A Review on Large Language Models for Research and Applications...',
          description: "",
          section: "News",},{id: "news-it-s-a-great-honor-to-present-our-llms4all-on-rise-ai-conference",
          title: 'It’s a great honor to present our LLMs4ALL on RISE AI Conference.',
          description: "",
          section: "News",},{id: "news-i-will-join-adobe-as-a-research-scientist-intern-in-seattle-this-summer",
          title: 'I will join Adobe as a Research Scientist Intern in Seattle this summer!...',
          description: "",
          section: "News",},{id: "news-our-paper-prescam-a-benchmark-for-predicting-scam-progression-from-early-conversations-has-been-accepted-at-colm-2026",
          title: 'Our paper PreScam: A Benchmark for Predicting Scam Progression from Early Conversations has...',
          description: "",
          section: "News",},{id: "news-two-papers-have-been-accepted-at-emnlp-2026-main-the-collaboration-tax-how-much-llm-multi-agent-systems-pay-to-coordinate-first-author-and-mdforge-agentic-molecular-dynamics-pipeline-design-under-sparse-simulator-feedback",
          title: 'Two papers have been accepted at EMNLP 2026 Main: The Collaboration Tax: How...',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%77%73%75%6E%34@%6E%64.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Weixiang-Sun", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/weixiang-sun-76641a263", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=zizf0i0AAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
