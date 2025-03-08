const resumeBuilderUrl = 'http://localhost:8080';

export function uploadResumeJson(id, resumeJson) {
  return fetch(new URL(`/api/resume/${id}`, resumeBuilderUrl), {
    body: JSON.stringify(resumeJson),
    method: 'POST',
  }).then(res => {
    if (!res.ok) throw new Error(res.statusText);
  });
}

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
