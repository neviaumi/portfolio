import * as openAI from './open-ai.js';

const prompts = await openAI.loadPortfolioIntoPrompts().then(prompts => [
  ...prompts,
  {
    content: `You are asked to write a cord intro message for apply the opening of Founding Engineer on OpenInfo.

The co-founder Tom Morrison has leave a message : "Let us know what your ideal role looks like and the type of company you want to work for"
Your reply should answer the question Tom Morrison asked and include some information about yourself.

Here is the JD of the opening:
We're hiring multiple Founding Full-Stack Engineers to join our growing team in London.

We're building an AI-driven workflow automation platform to transform the operations of the 230,000 wholesalers across UK, US and Europe.

We've recently raised a pre-seed round from a top VC + Angels and will be building out the team quickly over the next 12-months.

What we're looking for:

A pro-active, hard-working and enterprising individual
Enjoys the processing of rapidly learning and failing
Motivated by real ownership and self-direction
Technically excellent
Actively looking be part of a rapidly scaling start-up journey
Open to varying levels of experience
Job description:

As a Full-Stack Founding Engineer you will be a core member of our technical team, working directly with our CTO to:

Build and scale features and modules that transform operations of wholesalers

Work right across our tech-stack, including working closely with multiple world leading AI foundational models
Shape our engineering culture and help build our technical team
Make critical decisions about our technical strategy, architecture and tooling
TypeScript, React, Next.js, AWS, PostgreSQL
Why people want to work for us:

Potential career-defining opportunity: We have paying, happy customers and the funding to scale quickly in a huge market.

True technical ownership and impact: autonomy over your work + real impact on the product / technical direction of the business

Shaping a team and culture: As we scale, you'll be a key part of building out a high-performing technical team and company culture.

Benefits:

Competitive salary: £60-90k depending on level of experience
Generous equity
Private office within a WeWork in Central London
Flexible hours - organise your time your way
Unlimited holiday policy
Hardware budget for your perfect set-up
How to apply:

Send an email to hiring@open-info.co.uk with:

Your CV
A brief note on the value you can add to our team
Show us the projects you're proud of! Whether it's side projects, open source work, or anything cool you've built (GitHub links welcome)
LinkedIn Easy Apply applications will not be accepted.

Interview Process
15-minute introductory chat (Online)
30-minute experience deep-dive (Online/In-person)
60-minute live-coding interview (Online/In-person)
Systems Design Interview and Coffee with Co-Founders (In-person)

Here is best practice of cord intro message according to their website:
# How to write an effective intro message

Writing an intro message to a company on cord can seem daunting at first. A well-crafted, personalised message on cord can boost your chances of securing that interview opportunity by 84%*. 

Follow this guide to help you write an engaging message that will increase your chances of landing an interview. 

1. Keep it short & informal

Data has shown that shorter messages tend to get a better response from companies. The company will be able to see your profile, so there’s no need to go into too much detail about your past experience. Keep it short and snappy! 
As cord is a messaging tool designed to give you direct access to hiring teams, treat it like you would any messaging tool - be friendly and chatty. 
2. Personalise the message 

Show genuine interest in the company and be specific about what excites you - is it their product, their mission, their office dog? Mention any relevant industry insights or aspects of their team culture that caught your attention. 
Highlight 1 or 2 qualities that make you an ideal fit for the position. Touch on your skills, relevant experience, or how you align with the company's culture. 
3. Make scheduling simple

Why not let them know you’re keen to chat? To make it easy, offer a couple of times that would suit you over the coming days.  Be clear in your availability but remain flexible to accommodate their schedule.

## Examples of good and bad messages on cord
### Bad message
\`\`\`text
Hi, I’m interested in the position.
\`\`\`

- impersonal
- doesn’t show genuine interest

### Good message
\`\`\`text
Hi Joe, just saw the Front End position and I’m really interested! Your company looks like it’s at an exciting stage of growth, something I’d love to be part of. I’ve worked at a FinTech for a few years so think we could be a good fit. Are you free to chat this week? I’m free Wednesday morning or Thursday after 4pm. Let me know what suits you.
Cheers,
Susie
\`\`\`
- personal
- shows genuine interest
- offers times to speak

### Bad message
\`\`\`text
Hi, I'm interested in this role and look forward to a potential conversation about it. Thanks
\`\`\`

- impersonal
- implies they want to speak, but isn’t clear in availability 

### Good message
\`\`\`text
Hi Lucy,

I saw your Data Analyst role and wanted to reach out. I’m looking to join a team where I can immerse myself in data tools, connect with a diverse set of technologies and develop innovative products.

I have a background in Data Analysis and Machine Learning and believe my skills will be a solid addition to the team.

Feel free to send me a message back to arrange a call - I have good availability on weekday mornings.

Thanks,
Anna
\`\`\`
- personal
- shows genuine interest
- offers times to speak

### Bad message
\`\`\`text
Hi,
I was just going through roles on cord the other day and I stumbled upon the job listing for the Back End Engineer position and I felt like I have to reach out and let you know how incredibly enthusiastic I am about the opportunity to possibly work at such a renowned and prestigious company. It really would be a dream come true to be a part of a team that has accomplished as much as you guys have. I have been following your company for what feels like the longest time and I am pretty much familiar with every product you have launched in the past few years.
Now, diving a bit into my background, I have worked in a couple of tech companes in London mostly involving a lot of back-end stuff like dealing with databases and APIs etc. I am pretty good with Python and Node.js.I have garnered a substantial amount of experience, enough to say that I am pretty confident in my abilities to get stuff done, no matter how complicated or complex they might seem at the outset.
In summary, I think my background is perfect for the position. I can send my CV separately, if you’d like. I look forward to hearing back from you.
Sincerely,
Lucas
\`\`\`

- too long!
- doesn’t give any specific examples 
- offers to send CV (no need, as the company can see your cord profile and has access to your CV if they accept your message) 

### Good message
\`\`\`text
Hi Jane,

I've just come back from a career break and am now looking for a new Full Stack position.

After reading the job description, I believe I have the required skills for this position, in particular, due to my extensive Node.js experience, which formed a significant part of my previous role at Google.

Take a look at my profile and if you think we’d be a good fit I’d love to have an initial chat. I’m free most days this week.

Best,
Tom

PS check out my GitHub profile which has several personal projects on it - the link is on my cord profile :)
\`\`\`
- personal
- gives specific examples of previous experience
- offers to speak
`,
    role: 'user',
  },
]);

console.log(await openAI.prompt(prompts).then(openAI.readMessageFromPrompt));
