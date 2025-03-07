export async function fetchResumeJson() {
  const os = await import('node:os');
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const useTailoredResume =
    process.env['VITE_IS_TAILORED_RESUME'] === 'true' ? true : false;
  const resumeSource =
    process.env['VITE_RESUME_SOURCE'] ||
    'https://neviaumi.github.io/portfolio/resume.json';
  if (useTailoredResume) {
    return fs
      .readFile(path.join(os.tmpdir(), resumeSource), {
        encoding: 'utf8',
      })
      .then(JSON.parse);
  }
  return fetch(resumeSource).then(res => res.json());
}

export function resumeToLatex(resume) {
  function escapes(source) {
    return source.replaceAll('&', '\\&');
  }
  const {
      basics,
      education,
      meta: { highlightedKeywords: generatedHighlightKeywords } = {},
      skills,
      work: works,
    } = resume,
    flattenSkills = skills
      .map(skill => [skill.name, skill.keywords])
      .reduce((acc, item) => {
        if (acc[item[0]]) {
          acc[item[0]].push(...item[1]);
        } else {
          acc[item[0]] = item[1];
        }
        return acc;
      }, {}),
    allKeywords = Object.values(flattenSkills).flat(),
    githubProfileUrl = basics.profiles.find(
      profile => profile.network === 'Github',
    ).url,
    highlightedKeywords = (input => {
      if (input.length === 0) return null;
      return input;
    })(
      generatedHighlightKeywords?.filter(keyword =>
        allKeywords.includes(keyword),
      ) ?? [],
    ),
    linkedInProfileUrl = basics.profiles.find(
      profile => profile.network === 'Linkedin',
    ).url;
  return `\\documentclass{res}

\\name{${basics.name}}
\\address{${basics.location.region}}
\\address{${basics.email}}

\\begin{document}
Name: ${basics.name}
\\\\
Position Applied For: ${basics.label}
\\\\
Email: ${basics.email}
\\\\
Address: ${basics.location.region}
\\\\
My website: https://neviaumi.github.io/portfolio/resume
\\\\
Github: ${githubProfileUrl}
\\\\
LinkedIn: ${linkedInProfileUrl}
\\\\
    \\section{ABOUT THIS DOCUMENT}
    This document has been optimized for Applicant Tracking Systems (ATS) to ensure accurate parsing and alignment with job-specific requirements.
    For a comprehensive view of my portfolio and additional details, please visit: https://neviaumi.github.io/portfolio/resume
\\
\\

    \\hyphenpenalty=10000
    \\exhyphenpenalty=10000
    \\section{Summary}
    ${basics.summary}
\\
\\  
    \\section{EXPERIENCE}
    \\begin{itemize}
        ${works
          .map(work => {
            return `\\item[-] ${work.position} | ${work.company}, ${work.location} | ${work.startDate} - ${work.endDate}
        ${work.summary ? `\\\\ \\textit{Role Summary:} ${work.summary.trim()}` : ''}
        ${
          work.highlights
            ? `\\\\ \\textbf{Highlighted:}
        \\begin{itemize}
            ${work.highlights
              ?.map(highlight => {
                return `\\item[-] ${highlight}`;
              })
              .join('\n')}
        \\end{itemize}`
            : ''
        }
         
`;
          })
          .join('\n')}
    \\end{itemize}
\\
\\  
            
    \\section{TECHNICAL SKILLS}
    \\begin{itemize}
${
  highlightedKeywords
    ? `        \\raggedright
        \\item[-] Highlighted: ${escapes(highlightedKeywords.join(', '))}`
    : ''
}    
${Object.entries(flattenSkills)
  .map(
    ([skill, keywords]) =>
      `        \\raggedright
        \\item[-] ${skill}: ${escapes(keywords.join(', '))}`,
  )
  .join('\n')}
    \\end{itemize}
\\
\\  
    \\section{EDUCATION}
    \\begin{itemize}
${education.map(edu => `        \\item[-] ${edu.studyType} in ${edu.area}, ${edu.institution} \\hfill ${edu.startDate} - ${edu.endDate}`).join('\n')}
    \\end{itemize}

    

\\end{document}`;
}

const isMainExecution =
  import.meta.url === new URL(process.argv[1], 'file://').toString();
if (isMainExecution) {
  fetchResumeJson()
    .then(resumeToLatex)
    .then(async latexText => {
      const workspace = await import('./workspace.js');
      const fs = await import('node:fs/promises');
      const fileName = await (async () => {
        const useTailoredResume = process.env['VITE_IS_TAILORED_RESUME']
          ? true
          : false;
        if (!useTailoredResume) return 'resume.tex';
        const resumeJson = await fetchResumeJson();
        return resumeJson.meta.id + '.tex';
      })();
      await fs.writeFile(`${workspace.PUBLIC_FOLDER}/${fileName}`, latexText);
      return latexText;
    });
}
