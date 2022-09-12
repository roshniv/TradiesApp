const projects = [
  {
    id: 1,
    title: "Creating Reusable React Components",
    slug: "react-creating-reusable-components",
    category: "JavaScript"
  },
  {
    id: 2,
    title: "React: The Big Picture",
    slug: "react-big-picture",
    category: "JavaScript",
    bids: [
      {
        bidId: 1,
        bidder: 'XXX',
        hrate: 120
      }
    ]
  },
  {
    id: 3,
    title: "Securing React Apps with Auth0",
    details: "Securing React Apps with Auth0",
    slug: "react-auth0-authentication-security",
    category: "JavaScript",
    hours: 8,
    lastDay: '2022-09-06',
    lastTime: '20:00',
    bids: [
      {
        bidId: 1,
        bidder: "Adam",
        hrate: 120
      },
      {
        bidId: 2,
        bidder: "Robert",
        hrate: 310
      },
      {
        bidId: 3,
        bidder: "XXX",
        hrate: 112
      }
    ]
  },
  {
    id: 4,
    title: "Building a JavaScript Development Environment",
    slug: "javascript-development-environment",
    category: "JavaScript"
  },
  {
    id: 5,
    title: "Building Applications with React and Redux",
    slug: "react-redux-react-router-es6",
    category: "JavaScript"
  },
  {
    id: 6,
    title: "Building Applications in React and Flux",
    slug: "react-flux-building-applications",
    category: "JavaScript"
  },
  {
    id: 7,
    title: "Clean Code: Writing Code for Humans",
    slug: "writing-clean-code-humans",
    category: "Software Practices"
  },
  {
    id: 8,
    title: "Architecting Applications for the Real World",
    slug: "architecting-applications-dotnet",
    category: "Software Architecture"
  },
  {
    id: 9,
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    slug: "career-reboot-for-developer-mind",
    category: "Career"
  },
  {
    id: 10,
    title: "Web Component Fundamentals",
    slug: "web-components-shadow-dom",
    category: "HTML5"
  }
];

const newProject = {
  id: null,
  title: "",
  category: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newProject,
  projects
};
