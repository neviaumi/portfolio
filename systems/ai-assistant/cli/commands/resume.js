const resumeBuilderUrl = 'http://localhost:8080';

export function generateTailoredResumePdf(tailoredResumeJsonId) {
  return fetch(
    new URL(
      `/api/resume/resume-to-pdf?tailorResumeId=${tailoredResumeJsonId}`,
      resumeBuilderUrl,
    ),
    {
      method: 'GET',
    },
  ).then(res => res.body);
}

export function generateTailoredATSResumePdf(tailoredResumeJsonId) {
  return fetch(
    new URL(
      `/api/resume/ats-resume-to-pdf?tailorResumeId=${tailoredResumeJsonId}`,
      resumeBuilderUrl,
    ),
    {
      method: 'GET',
    },
  ).then(res => res.body);
}
