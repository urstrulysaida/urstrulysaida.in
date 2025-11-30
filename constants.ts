import { ProfileData } from './types';

export const PROFILE_DATA: ProfileData = {
  personal: {
    summary: "A dedicated Computer Science student specializing in Cybersecurity, Cloud Architecture (GCP/AWS), and DevOps practices. Driven by a passion for building secure, scalable infrastructure, I leverage skills in Python, network security, and SIEM analysis to contribute to robust defense strategies and efficient cloud deployments.",
    email: "urstrulysaida@gmail.com",
    contact: "7674012184",
    whatsapp: "6301466654",
    dob: "2001-01-11",
    gender: "Male",
    category: "GEN",
    disability: "No",
    address: "10-11, avulavaripalem, Guntur Andhra Pradesh India, 522411",
    city: "Andhra Pradesh",
    state: "Andhra Pradesh"
  },
  education: [
    {
      id: "10th",
      title: "10th Details",
      bgImage: "https://i.ytimg.com/vi/sU7KHbJxr0s/maxresdefault.jpg",
      details: [
        { label: "School", value: "ZPHS SCHOOL" },
        { label: "Marks", value: "7%" },
        { label: "Passout", value: "N/A" },
        { label: "Certificate", value: "View Certificate", isLink: true, linkUrl: "https://drive.google.com/file/d/15OPbt8X_FkjVENA-_ByxJ-6acZrH4yVG/view?usp=sharing" }
      ]
    },
    {
      id: "12th",
      title: "Intermediate (12th) Details",
      bgImage: "https://i.ytimg.com/vi/sU7KHbJxr0s/maxresdefault.jpg",
      details: [
        { label: "Institute", value: "N/A" },
        { label: "Percentage", value: "6%" },
        { label: "Passout", value: "N/A" },
        { label: "Certificate", value: "View Certificate", isLink: true, linkUrl: "https://drive.google.com/file/d/15LNA5es18GqDRMX1Fg7wYfzcYBWXo5Vk/view?usp=sharing" }
      ]
    },
    {
      id: "ug",
      title: "UG Details",
      bgImage: "https://image-static.collegedunia.com/public/reviewPhotos/951801/inbound2892504353987376923.jpg",
      details: [
        { label: "Institute", value: "Kakinada Institute of Engineering and Technology" },
        { label: "Course", value: "B.Tech" },
        { label: "Branch", value: "Cyber Security" },
        { label: "State", value: "Andhra Pradesh" },
        { label: "Univ. Reg No", value: "22B21A4627" },
        { label: "Passout", value: "2026" }
      ]
    }
  ],
  career: {
    currentRole: [
      { label: "Role", value: "N/A" },
      { label: "Company", value: "N/A" },
      { label: "Location", value: "Andhra Pradesh" }
    ],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/shaiksaidavali/", iconColorClass: "text-blue-700", linkText: "View Profile" },
      { label: "GitHub", url: "https://github.com/urstrulysaida", iconColorClass: "text-gray-700 dark:text-gray-300", linkText: "View Profile" },
      { label: "Codepen", url: "https://codepen.io/Mr_-Prince_Ssv", iconColorClass: "text-yellow-600", linkText: "View Codepen" }
    ],
    certifications: [
      {
        id: "cert1",
        title: "Google Cybersecurity Cert.",
        type: "Professional Certification",
        focus: "SIEM Analysis, Threat Detection, Risk Management (NIST/MITRE).",
        skills: "Enterprise Defense Strategies, Vulnerability Assessment, Security Operations Center (SOC) Fundamentals.",
        linkUrl: "https://drive.google.com/drive/folders/1GQHLGxvDy1Q0kK9evMfOjfEfOn2-fI5A?usp=sharing",
        colorClass: "text-green-500"
      },
      {
        id: "cert2",
        title: "AWS Cloud Technology",
        type: "Industry Training Program",
        focus: "Cloud Migration, Solution Design, Core AWS Services (EC2, S3, VPC).",
        skills: "Architecture Principles, Scalability, Cost Optimization, Infrastructure Fundamentals.",
        linkUrl: "https://drive.google.com/file/d/1QVr7fmnA-DpbHwySLg4d1lC8sA1RaURP/view?usp=drive_link",
        colorClass: "text-yellow-500"
      },
      {
        id: "cert3",
        title: "Advanced Data Analytics",
        type: "Professional Certification",
        focus: "Predictive Modeling, Statistical Analysis (R), Complex SQL Queries.",
        skills: "Data Visualization, Business Intelligence, Advanced Data Manipulation.",
        linkUrl: "https://drive.google.com/drive/folders/19PpE3C9AG5eBUGssrH_IAGa7RQlTHzUp?usp=drive_link",
        colorClass: "text-purple-500"
      }
    ],
    internships: [
      {
        id: "int1",
        title: "Zscaler Cloud Networking",
        type: "Virtual Internship",
        focus: "Zero Trust Architecture (ZTA), Secure Access Service Edge (SASE).",
        skills: "Modern Network Security, Cloud-First Environment Protection, Access Policy Management.",
        linkUrl: "https://drive.google.com/file/d/1AmbBgEeqkv45qOzodPugsVUiaunObl2U/view?usp=drive_link",
        colorClass: "text-indigo-500"
      },
      {
        id: "int2",
        title: "Fortinet Network Security",
        type: "Associate (NSE)",
        focus: "Next-Generation Firewalls, Cybersecurity Threat Landscape.",
        skills: "Network Segmentation, Security Fabric Concepts, Wired/Wireless Network Security.",
        linkUrl: "https://drive.google.com/file/d/1bGLpt7pwHiEaG9pvlNZnMlv7S35I3q5I/view?usp=drive_link",
        colorClass: "text-red-500"
      },
      {
        id: "int3",
        title: "Cloud Computing Internship",
        type: "8 Weeks Experience",
        focus: "GCP Services (Compute, Storage, VPC), Infrastructure-as-Code (IaC) concepts.",
        skills: "Practical Deployment, Cloud Security & Cost Management, Networking setup in a cloud environment.",
        linkUrl: "https://drive.google.com/file/d/1xbeF-RusGvEKylOF6wELgnYVunS5x8RO/view?usp=drive_link",
        colorClass: "text-blue-500"
      },
      {
        id: "int4",
        title: "IoT Internship",
        type: "16 Weeks Experience",
        focus: "Device Prototyping (Arduino/ESP), Sensor Integration, Data Transmission (MQTT).",
        skills: "Full-Stack IoT Deployment, Hardware-Software Interfacing, Cloud Connectivity Protocols.",
        linkUrl: "https://drive.google.com/file/d/1d1Rgjnw9mvVhVQJCXOZSz5bQRpthl33-/view?usp=drive_link",
        colorClass: "text-pink-500"
      },
      {
        id: "int5",
        title: "Ethical Hacking Internship",
        type: "10 Weeks Experience",
        focus: "Vulnerability Assessment, Penetration Testing Methodologies.",
        skills: "Network and Web App Security Testing, Foundational Defense Strategies.",
        linkUrl: "https://drive.google.com/file/d/1LkavkbMS0g6BfP-QAjf9C9QE_IsrGSVv/view?usp=drive_link",
        colorClass: "text-indigo-500"
      }
    ]
  }
};