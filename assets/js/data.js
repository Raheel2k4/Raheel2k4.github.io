// ============================================================
// PORTFOLIO DATA — Edit via /admin/index.html
// ============================================================

const PORTFOLIO_DATA = {
  personal: {
    name: "Alex Chen",
    initials: "A.C",
    title: "Cybersecurity Engineer",
    subtitle: "Security Researcher",
    tagline: "I find what others miss — vulnerabilities, threats, and the truth behind your attack surface.",
    bio: "I specialize in offensive security, vulnerability research, and building resilient systems. With 5+ years in the field, I've helped organizations identify critical weaknesses before malicious actors can exploit them. Currently pursuing advanced research in zero-day discovery and red team operations.",
    status: "Open to work",
    photo: "",
    stats: { experience: "5+", cves: "12", ctf: "47", clients: "30+" }
  },
  certifications: ["OSCP","CEH","Security+","CISSP","eWPT"],
  skills: [
    { category: "Penetration Testing", icon: "⚔️", tags: ["Metasploit","Burp Suite","Nmap","SQLMap","OWASP ZAP"] },
    { category: "Reverse Engineering", icon: "🔬", tags: ["IDA Pro","Ghidra","x64dbg","Radare2","Binary Ninja"] },
    { category: "Cloud Security",      icon: "☁️", tags: ["AWS IAM","Azure Sentinel","GCP","Terraform","Kubernetes"] },
    { category: "Threat Intelligence", icon: "🎯", tags: ["MITRE ATT&CK","YARA","OSINT","Maltego","Shodan"] },
    { category: "Programming",         icon: "💻", tags: ["Python","Rust","C/C++","PowerShell","Bash","Go"] },
    { category: "Digital Forensics",   icon: "🔍", tags: ["Volatility","Autopsy","FTK","Wireshark","Zeek"] }
  ],
  projects: [
    { id:1, title:"RedTeam C2 Framework",      category:"Red Team", description:"Custom C2 framework for red team engagements with encrypted channels, LOTL techniques, and AV evasion modules.", image:"", tags:["Red Team","Python","C2"],     links:{ github:"https://github.com/", demo:"" } },
    { id:2, title:"CVE-2024-XXXX Analysis",    category:"Research",  description:"In-depth analysis and PoC for a critical auth bypass in a widely-used enterprise VPN. Responsibly disclosed.",    image:"", tags:["Research","CVE","Exploit"],links:{ github:"", demo:"#" } },
    { id:3, title:"Phishing Sim Platform",     category:"Blue Team", description:"Automated phishing simulation platform to test employee awareness and track improvement metrics over time.",         image:"", tags:["Blue Team","Python"],  links:{ github:"https://github.com/", demo:"" } }
  ],
  posts: [
    { id:1, title:"Breaking into AD: Kerberoasting Deep Dive",  date:"2025-03-14", excerpt:"Walkthrough of Kerberoasting in AD environments from recon to lateral movement, with detection included.",  tags:["Active Directory","Red Team"], url:"#" },
    { id:2, title:"Zero-Day Discovery Methodology",             date:"2025-02-01", excerpt:"My methodology for hunting zero-days in closed-source software using fuzzing, static analysis, and manual review.", tags:["Research","Zero-Day"],    url:"#" },
    { id:3, title:"HackTheBox — Eclipse Writeup",               date:"2025-01-10", excerpt:"Full solution for the Eclipse machine covering enumeration, privilege escalation via sudoers, and post-ex.", tags:["CTF","HackTheBox"],         url:"#" }
  ],
  contact: {
    intro: "Available for penetration testing, security consulting, and research collaborations.",
    links: [
      { icon:"🐙", label:"GitHub",   url:"https://github.com/" },
      { icon:"💼", label:"LinkedIn", url:"https://linkedin.com/in/" },
      { icon:"🐦", label:"X / Twitter", url:"https://x.com/" },
      { icon:"✉️", label:"Email",    url:"mailto:you@example.com" },
      { icon:"🔐", label:"HackTheBox",  url:"https://app.hackthebox.com/" }
    ]
  }
};
