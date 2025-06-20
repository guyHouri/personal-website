// This script generates a PDF version of Guy Houri's CV
// In a real implementation, you would use a PDF generation library like jsPDF or Puppeteer

const cvContent = `
Guy Houri
Software Engineer
guy.houri2024@gmail.com — +972-544312639 — Tel Aviv, Israel — LinkedIn

Profile
Passionate about leveraging technology to create positive impact and contribute to meaningful missions. Full-Stack Developer with 3 years of experience building robust and scalable applications from scratch within the IDF. Currently completing a B.Sc. in Computer Science with a focus on Data Science. Dedicated to collaborative problem-solving and achieving ambitious goals. Seeking a full-time role.

Work Experience

Israel Defence Forces, Computer Service Directorate                                    2021 – 2024
Full-Stack Developer
• Integrated React Native into a new project, utilizing Redux and collaborating with UX designers.
• Managed the central Spring server, handling API integrations and unit testing with multiple teams.
• Led NiFi/Kafka-based ETL infrastructure, implementing NestJS microservices and physical servers.
• Resolved concurrency bottlenecks via load testing, improving scalability with Kubernetes.
• Maintained and optimized a complex legacy system, implementing advanced MongoDB queries.
• Implemented CI/CD pipelines using GitLab CI and Docker for streamlined deployment.
• Mentored junior developers, transitioning into a senior role.
• Applied Agile (Scrum) methodology via TFS and monitored performance with Kibana dashboards.

Education

Colman College of Management                                                           2022 – 2025
B.Sc. Computer Science, Specialization: Data Science

IDF Mamram Computer Academy                                                                 2021
Software Development Course: Vue.js, JavaScript, Docker, OOP

Hafkar Hayrok College                                                              2020 – 2021
Software Technician - Graduated with Honors: C, Python, Assembly

Lady Davis High School                                                             2014 – 2020
Majored in Computer Science and Biotechnology

Skills
• Programming: Java, JavaScript (ES6+), TypeScript, Python, C.
• Frontend: React.js, React Native, Redux, HTML5, CSS3, MUI.
• Backend: Node.js (Express.js, NestJS), Spring Boot.
• Databases: MongoDB, PostgreSQL.
• Big Data: Apache NiFi, Kafka.
• DevOps: Kubernetes (k8s), Docker, GitLab CI, OpenShift.
• Tools: Git, TFS, Kibana, Elastic, Agile (Scrum).
• Soft Skills: Teamwork, Collaboration, Communication.
• Languages: Proficient in English, Hebrew.
`

console.log("CV Content for PDF Generation:")
console.log(cvContent)
console.log(
  "\nNote: In a production environment, this would generate a proper PDF file using libraries like jsPDF, Puppeteer, or similar PDF generation tools.",
)
