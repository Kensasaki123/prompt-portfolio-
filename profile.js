/* Profile details and assignment project information for the site and chatbot. */
const PORTFOLIO_PROFILE = {
  name: "Abdul Quavi",
  location: "Kota",
  intro: "I'm a student developer from Kota who enjoys learning how software works by building practical projects and exploring new technologies.",
  about: "I'm Abdul, a student developer from Kota exploring programming and web technologies. I enjoy learning by building practical projects and improving my ideas through code.",
  education: "12th Standard · Indira International School",
  email: "ostudy590@gmail.com",
  github: "https://github.com/Kensasaki123",
  linkedin: "https://www.linkedin.com/in/abdul-quavi-589861275",
  avatar: "https://avatars.githubusercontent.com/u/133897493?v=4",
  skills: ["Python", "JavaScript", "TypeScript", "C++", "C"],
  projects: [
    { title: "Python Programs Collection", category: "Python", description: "A collection of Python programs for factorial, Fibonacci, and converting a structure into a dictionary, documented in an updated README.", tech: ["Python", "README"], repo: "", live: "", number: "01" },
    { title: "Messy Python Code Improvement", category: "Python", description: "A messy Python script improved with AI assistance, with clearer structure and more readable code.", tech: ["Python", "Code Quality", "AI"], repo: "", live: "", number: "02" },
    { title: "Bug Fixing Using Cursor AI", category: "Python", description: "A buggy program investigated and corrected using Cursor AI, with the issue and fix documented.", tech: ["Python", "Debugging", "Cursor AI"], repo: "", live: "", number: "03" },
    { title: "Interactive Quiz Application", category: "Web", description: "An interactive quiz application developed in Lecture 10.", tech: ["HTML", "CSS", "JavaScript"], repo: "", live: "", number: "04" },
    { title: "Book Reading List Application", category: "Web", description: "A book reading list application developed in Lecture 11. Add the deployed reading-list URL after confirming it.", tech: ["HTML", "CSS", "JavaScript"], repo: "", live: "", number: "05" }
  ]
};
if (typeof window !== "undefined") window.PORTFOLIO_PROFILE = PORTFOLIO_PROFILE;
if (typeof module !== "undefined") module.exports = PORTFOLIO_PROFILE;
