const projects = [
  {
    id: 1,
    title: "Painting a house",
    slug: "painting-a-house",
    lastDay: '2022-08-06',
  },
  {
    id: 2,
    title: "Grass Mowing",
    slug: "grass-mowing",
    lastDay: '2022-09-26',
    bids: [
      {
        bidder: 'YYY',
        hrate: 120
      }
    ]
  },
  {
    id: 3,
    title: "Plumbing issue",
    details: "Plumber needed for few of the faults at home ",
    slug: "plumbing-issue",
    hours: 8,
    lastDay: '2022-09-06',
    lastTime: '20:00',
    bids: [
      {
        bidder: "Adam",
        hrate: 120
      },
      {
        bidder: "Robert",
        hrate: 310
      },
      {
        bidder: "XXX",
        hrate: 112
      }
    ]
  },
  {
    id: 4,
    title: "Cleaner needed",
    slug: "cleaner-needed"
  },
  {
    id: 5,
    title: "House hold help needed",
    slug: "house-hold-help-needed"
  },
  {
    id: 6,
    title: "Fence painting help",
    slug: "fence-painting-help"
  },
  {
    id: 7,
    title: "Caterer for a house party",
    slug: "caterer-for-a-house-party"
  },
  {
    id: 8,
    title: "Looking for an architect for design review",
    slug: "looking-for-an-architect-for-design-review"
  },
  {
    id: 9,
    title: "Grass mowing needed in North Sydney",
    slug: "grass-mowing-needed-in-nort-sydney"
  },
  {
    id: 10,
    title: "Looking for a handyman refridgerator",
    slug: "looking-for-a-handyman-refrigerator"
  }
];

const newProject = {
  id: null,
  title: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newProject,
  projects
};
