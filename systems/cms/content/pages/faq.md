---
summary: HelloWorld
title: FAQ
introduction: >-
  Welcome to my FAQ section! Here, I answer some common questions about my work
  experience, problem-solving approach, and what I look for in a team.
questions:
  - question: >-
      Tell me about a time when you faced a significant technical challenge in
      your development work. How did you approach solving it, and what was the
      outcome?
    answer: "#### ⭐ Situation:\n\n\"In a previous project, we faced a major challenge with our production release. Upper management wanted every feature to be fully complete and suitable for all users before going live. This created an endless development cycle, where requirements kept changing, and the product never reached production.\"\n\n#### \U0001F3AF Task:\n\n\"To break this cycle, I explored ways to allow incremental releases while keeping unfinished features hidden from end users. My goal was to find a solution that would enable us to deploy continuously without delaying progress.\"\n\n#### \U0001F680 Action:\n\n\"I researched and introduced the concept of feature flags to the team. I conducted a proof of concept (PoC) demonstrating how we could toggle features on or off for specific users using a feature flag service. This would allow us to deploy features gradually, test in production, and reduce risk.\"\n\n\"However, the SaaS-based feature flag solution required compliance approval, which became a bottleneck, delaying implementation. While waiting for approval, I explored alternative self-hosted options, but due to organizational constraints, we couldn’t proceed with those either.\"\n\n#### \U0001F3C6 Result:\n\n\"Unfortunately, before I left the project, the compliance approval was still pending, and the feature flag solution hadn't been implemented. However, my research and PoC helped raise awareness of the problem, and discussions were ongoing to adopt an incremental release strategy. This experience reinforced the importance of balancing technical feasibility with organizational constraints.\"\n"
    group: "\U0001F6E0 Problem-Solving & Challenges"
  - question: How do you handle disagreements with co-workers?
    answer: >
      In a sprint planning session, my co-worker and I had different ideas on
      how to handle user onboarding for an internal SSO system. They suggested a
      manual process where new employees had to log in first before
      administrators could assign permissions. While this worked, it created
      inefficiencies since administrators couldn’t pre-configure user access in
      advance.


      I believed we could automate this, so I researched Google Workspace’s
      capabilities and found that we could use webhooks to sync user accounts
      instantly. Instead of just rejecting my co-worker’s idea, I presented my
      findings during planning, showing how automation would reduce manual work
      and improve efficiency. Our Product Owner approved the idea, and I worked
      with QA and DevOps to implement it.


      In the end, we successfully integrated the webhook, eliminating
      unnecessary manual steps and streamlining onboarding. This experience
      reinforced the importance of constructive discussions—by listening to
      different ideas, researching alternatives, and working together, we
      arrived at a solution that benefited everyone.
    group: "\U0001F6E0 Problem-Solving & Challenges"
  - question: What is the most challenging aspect of your current project?
    answer: >
      The most challenging aspect of developing my portfolio has been writing
      clear and well-structured content about myself. To streamline this
      process, I integrated AI into my workflow. First, I draft the content
      directly in Figma without worrying about grammar or structure. Then, I use
      ChatGPT to refine and reorganize it. Once the content is polished, I
      update it in Figma, transfer it to the CMS, and finally implement it in
      the web frontend. This approach ensures my content is well-structured and
      presents a logical flow.
    group: "\U0001F4C2 Projects & Experience"
  - question: What are you currently working on?
    answer: >
      I’m currently working on my portfolio website to showcase my skills,
      experience, and professional identity. This project not only allows me to
      present my work effectively but also gives me the opportunity to reflect
      on the type of role and work environment that best align with my career
      goals.
    group: "\U0001F4C2 Projects & Experience"
  - question: What is the most interesting project you have worked on?
    answer: >
      One of the most interesting projects I worked on was building an internal
      system that allowed staff to trigger user notifications across multiple
      channels.

      What made this project exciting was that our team had full autonomy over
      the release strategy. Given the complexity of the requirements—supporting
      notifications via SMS, app notifications, web notifications, and in-app
      messages, as well as targeting all users, specific users, or user
      segments—we knew that implementing everything at once would be
      time-consuming and inefficient.

      Instead, we took a progressive release approach. We prioritized delivering
      the most valuable and easiest-to-implement features first. Initially, we
      launched app and in-app notifications because the frontend integration was
      already in place. Additionally, we started with basic targeting—supporting
      all users and a limited set of specific user IDs (up to 300)—to avoid the
      complexities of background job processing. This allowed the system to be
      immediately useful while giving us time to iterate and expand features
      gradually.


      #### Key Takeaways & Relevance:


      This experience reinforced the importance of iterative development and
      delivering value early rather than aiming for a perfect, all-encompassing
      solution from the start. I believe this mindset aligns well with a company
      that values agile development, progressive feature rollouts, and balancing
      technical effort with business needs.
    group: "\U0001F4C2 Projects & Experience"
  - question: How have you handled criticism of your work?
    answer: >
      I believe the key to handling criticism is to stay calm, understand the
      reasoning behind it, and adjust my approach when necessary. Constructive
      feedback is an opportunity for growth, and I always try to learn from it.

      For example, during my annual review at Neat, a peer review comment stated
      that I should “focus on what the business needs, not just what I want.”
      This made me reflect on my approach and discuss it with my leader to
      understand the reasoning behind it.

      It turned out that I was unintentionally prioritizing technical
      improvements over immediate business needs. One instance was when I was
      tasked with implementing a complex form with over 10 fields across
      multiple sections. I noticed that the existing solution using Ant Design’s
      Form component wasn’t modular enough, so I decided to integrate
      react-hook-form for better reusability. Since no one objected when I
      raised the idea in our internal chat, I assumed it was fine to proceed.
      However, this change led to an inconsistent experience across different
      forms and increased the learning curve for other developers, making
      development take longer than expected.

      The key takeaway from this experience was that aligning with the team is
      just as important as technical improvements. Now, whenever I want to
      introduce a significant change, I ensure that the team is fully aware.
      Instead of assuming silence means approval, I actively seek
      feedback—whether by getting direct responses in chat or bringing it up in
      planning meetings.
    group: "\U0001F680 Productivity & Time Management"
  - question: What time-management strategies do you use at work?
    answer: >
      Time management plays a crucial role in productivity, and I approach it
      from two perspectives: team-level strategy and personal strategy. By
      structuring work effectively, I ensure both smooth collaboration and
      individual efficiency.


      #### Team-Level Strategy


      I break down each story into detailed sub-tasks before starting
      development. For example, I include specifics like required API endpoints,
      frontend updates, and necessary validations. This approach:


      * Improves estimation accuracy

      * Makes it easier for developers to follow structured implementation

      * Allows work to be completed in smaller, manageable pieces


      #### Personal Strategy


      I use a daily to-do list alongside our daily stand-up to stay focused on
      deliverables. My list contains small, technical action items, such as:


      * Adjusting API configurations

      * Implementing a frontend route

      * Connecting a backend API to the UI


      Additionally, I use the Pomodoro Technique (a.k.a. the Tomato Timer) when
      I hit mental roadblocks. Setting focused work intervals with short breaks
      helps me regain productivity and avoid burnout.


      #### Example Application


      When working at Emma, the team lacked structured project management
      processes—there were no sprint planning, backlog refinement, or daily
      stand-ups. The only alignment was through weekly meetings. To stay on
      track in that chaotic environment, I relied heavily on my to-do list and
      the Pomodoro method, ensuring I stayed productive and met deadlines
      despite the lack of structure.
    group: "\U0001F680 Productivity & Time Management"
  - question: How do you handle tight deadlines?
    answer: >
      In my experience, I haven’t faced a situation where we were forced to
      crunch to meet a deadline because our team prioritizes backlog refinement
      and sprint planning to minimize last-minute pressure.

      For example, at Neat, our approach ensures that large epics are broken
      down into smaller, manageable stories before they enter development. The
      Product Owner works closely with the team to prioritize what goes into
      each sprint, which helps us avoid surprises and last-minute rushes.

      However, I do understand that unexpected challenges can arise. If I ever
      found myself in a situation where we had to meet a hard deadline, I would:


      1. Reassess priorities—Identify the most critical features and what could
      be delivered first while postponing non-essential work.

      2. Improve efficiency—Optimize workflows by increasing collaboration with
      QA, running parallel testing, or using feature flags for phased releases.

      3. Communicate risks early—If a deadline is unrealistic, I would
      communicate with stakeholders early to find a feasible solution rather
      than rushing and compromising quality.


      This structured approach ensures we can deliver value to users on time
      while maintaining quality, even in high-pressure situations.
    group: "\U0001F680 Productivity & Time Management"
  - question: What is something that you had to push for in your previous projects?
    answer: >
      When I started working at Neat, the project lacked automated tests and had
      no clear Definition of Done (DoD). As a result, deployments were risky,
      and we had to manually verify everything in production, which made the
      system unstable.

      I pushed for establishing a proper Definition of Done, which included:


      * Ensuring all components and dependencies were up to date.

      * Requiring API tests before merging code.

      * Implementing linting and code formatting to maintain consistency.


      To make this happen, I researched and implemented test coverage for both
      the frontend and backend, gradually improving the system’s reliability.
      Whenever I had the chance, I worked on increasing test coverage, either by
      adding new tests or refactoring existing code. Additionally, I paired with
      colleagues to help troubleshoot failing tests and set up missing ones.

      As a result of these efforts, the system became far more stable, and the
      QA return rate dropped significantly, proving the impact of our testing
      improvements.
    group: "\U0001F6E0 Problem-Solving & Challenges"
  - question: Tell me about a time you had a disagreement with your manager.
    answer: >
      While working at PlayStation, my team was developing a feature that
      allowed gaming partners to create user groups and assign permissions at
      the group level instead of individually. This also included hierarchical
      grouping, where sub-groups would inherit permissions from parent groups.

      A challenge arose when upper management wanted the entire feature set
      completed before releasing anything. This led to frequent changes to the
      UI and feature behavior, but no actual deployment, making development feel
      like an endless cycle.

      I raised my concerns with my direct manager, and we both agreed that an
      incremental release approach would be more effective. We proposed
      launching the core grouping feature first, without hierarchical grouping,
      so it could be used earlier while we continued development.

      To explore this idea, I conducted a proof of concept (PoC) using feature
      flags, which would allow us to enable or disable specific functionality
      based on user ID or partner ID. However, since the feature flag system was
      a paid SaaS service, it required compliance approval. This process turned
      into a major bottleneck, dragging on indefinitely. As a result, we never
      actually integrated the feature flags into the system, and development
      continued without any releases.

      Unfortunately, before I left, the feature was still stuck in
      limbo—constantly being worked on but never deployed. We provided feedback
      to upper management, but by that time, the project was nearing its
      conclusion, and it was too late to pivot.

      Key Takeaways:

      This experience reinforced the importance of:


      * Prioritizing incremental releases to prevent development from stalling.

      * Identifying potential blockers (like compliance requirements) early
      before exploring third-party solutions.

      * Gaining stakeholder buy-in for progressive rollouts to avoid
      all-or-nothing releases.


      Had we anticipated these challenges earlier, we could have found a more
      efficient way to deliver value sooner.
    group: "\U0001F6E0 Problem-Solving & Challenges"
  - question: How do you tackle challenges?
    answer: >
      When tackling challenges or making tough decisions in a project, I follow
      an approach inspired by Architecture Decision Records (ADR). I start by
      understanding the context and identifying key factors to consider. Then, I
      research possible solutions and create proof-of-concepts (PoCs) for each.
      Finally, I compare the pros and cons before making a well-informed
      decision.

      For example, while building my portfolio website, I needed a CMS to manage
      content via an admin dashboard instead of hardcoding it. My key decision
      drivers were:


      * No server hosting required (nice to have).

      * Content should be committed to Git directly.

      * Must provide API access for content retrieval.


      After researching options like Contentful, WordPress, PayloadCMS, TinaCMS,
      and DecapCMS, I implemented PoCs to evaluate each. Based on my findings, I
      chose TinaCMS because its workflow aligned well with Git, and it stores
      content in JSON/Markdown instead of a database, making it more
      version-control-friendly.

      This structured decision-making process ensures that I choose solutions
      based on clear criteria and real-world testing rather than assumptions.
    group: "\U0001F6E0 Problem-Solving & Challenges"
  - question: What frustrates you?
    answer: >
      I feel frustrated when the features I work on never get released,
      especially when new requirements keep piling up on top of an unfinished
      feature.

      For example, while working at PlayStation, I encountered a situation where
      the business wanted to build a large feature that could accommodate all
      partners. However, this led to an endless development cycle with no clear
      release point. I raised this concern during my 1-on-1 meetings with my
      manager, and we explored solutions to release the feature incrementally.
      We conducted a proof of concept (PoC) and proposed using feature flags to
      enable partial rollouts. However, since the feature flag system was a paid
      SaaS solution, the approval and evaluation process took over a year,
      causing development to stall.

      This experience taught me the importance of defining clear milestones and
      ensuring that features can be delivered iteratively rather than becoming
      never-ending projects. Without tangible progress, work can start to feel
      unmotivating and disconnected from business goals.
    group: "\U0001F4CC Work Preferences & Ideal Role"
  - question: What excites you about work?
    answer: >
      I’m excited about executing plans that the team has collaboratively
      created and seeing the real impact of our work. I enjoy being involved in
      the planning process—discussing what needs to be done, estimating effort,
      and refining scope when necessary. What excites me the most is witnessing
      how features are incrementally released and used by real users,
      continuously improving based on feedback.
    group: "\U0001F4CC Work Preferences & Ideal Role"
  - question: What are you looking for in your next role?
    answer: >
      In my next role, I’m looking for a collaborative work environment where
      teamwork drives projects at every stage—planning, estimation, development,
      deployment, and monitoring—rather than tasks being handled in isolation. I
      value teams that prioritize continuous improvement, whether it's enhancing
      code quality, increasing test coverage, or refining processes over time.
      Having dedicated engineering time at the end of each sprint would be ideal
      to support these efforts. Additionally, I prefer a hybrid or remote work
      setup to maintain a healthy work-life balance and maximize productivity by
      avoiding long daily commutes.
    group: "\U0001F4CC Work Preferences & Ideal Role"
_template: faq
---

