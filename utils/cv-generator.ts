export const generateCV = () => {
  const cvContent = `Guy Houri
Software Engineer
guy.houri2024@gmail.com — +972-544312639 — Tel Aviv, Israel — LinkedIn

═══════════════════════════════════════════════════════════════════════════════

PROFILE
═══════════════════════════════════════════════════════════════════════════════

Passionate about leveraging technology to create positive impact and contribute to 
meaningful missions. Full-Stack Developer with 3 years of experience building robust 
and scalable applications from scratch within the IDF. Currently completing a B.Sc. 
in Computer Science with a focus on Data Science. Dedicated to collaborative 
problem-solving and achieving ambitious goals. Seeking a full-time role.

═══════════════════════════════════════════════════════════════════════════════

WORK EXPERIENCE
═══════════════════════════════════════════════════════════════════════════════

Israel Defence Forces, Computer Service Directorate                    2021 – 2024
Full-Stack Developer

• Integrated React Native into a new project, utilizing Redux and collaborating 
  with UX designers.

• Managed the central Spring server, handling API integrations and unit testing 
  with multiple teams.

• Led NiFi/Kafka-based ETL infrastructure, implementing NestJS microservices 
  and physical servers.

• Resolved concurrency bottlenecks via load testing, improving scalability 
  with Kubernetes.

• Maintained and optimized a complex legacy system, implementing advanced 
  MongoDB queries.

• Implemented CI/CD pipelines using GitLab CI and Docker for streamlined 
  deployment.

• Mentored junior developers, transitioning into a senior role.

• Applied Agile (Scrum) methodology via TFS and monitored performance with 
  Kibana dashboards.

═══════════════════════════════════════════════════════════════════════════════

EDUCATION
═══════════════════════════════════════════════════════════════════════════════

Colman College of Management                                           2022 – 2025
B.Sc. Computer Science, Specialization: Data Science

IDF Mamram Computer Academy                                                     2021
Software Development Course: Vue.js, JavaScript, Docker, OOP

Hafkar Hayrok College                                                  2020 – 2021
Software Technician - Graduated with Honors: C, Python, Assembly

Lady Davis High School                                                 2014 – 2020
Majored in Computer Science and Biotechnology

═══════════════════════════════════════════════════════════════════════════════

SKILLS
═══════════════════════════════════════════════════════════════════════════════

Programming Languages:
• Java, JavaScript (ES6+), TypeScript, Python, C

Frontend Development:
• React.js, React Native, Redux, HTML5, CSS3, MUI

Backend Development:
• Node.js (Express.js, NestJS), Spring Boot

Databases & Big Data:
• MongoDB, PostgreSQL, Apache NiFi, Kafka

DevOps & Tools:
• Kubernetes (k8s), Docker, GitLab CI, OpenShift, Git, TFS, Kibana, Elastic

Methodologies:
• Agile (Scrum)

Soft Skills:
• Teamwork, Collaboration, Communication

Languages:
• Proficient in English, Hebrew

═══════════════════════════════════════════════════════════════════════════════

Generated on ${new Date().toLocaleDateString()} | The Maximizer - Guy Houri`

  return cvContent
}

export const downloadCV = () => {
  const cvContent = generateCV()

  // Create a blob with the CV content
  const blob = new Blob([cvContent], { type: "text/plain;charset=utf-8" })

  // Create a temporary URL for the blob
  const url = window.URL.createObjectURL(blob)

  // Create a temporary link element and trigger download
  const link = document.createElement("a")
  link.href = url
  link.download = "Guy_Houri_CV.txt"
  document.body.appendChild(link)
  link.click()

  // Clean up
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
