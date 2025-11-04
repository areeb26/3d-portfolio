function TriggerContent({ content }) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-4xl font-bold text-white mb-2">{content.title}</h3>
        <p className="text-xl text-purple-400 mb-4">{content.subtitle}</p>
        <p className="text-gray-300 leading-relaxed">{content.description}</p>
      </div>
      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
        <p className="text-sm text-gray-300 text-center">
          Click on any node to explore different sections of my portfolio
        </p>
      </div>
    </div>
  );
}

function AboutContent({ content }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{content.title}</h3>
        <p className="text-gray-300 leading-relaxed text-lg">{content.bio}</p>
      </div>

      {content.location && (
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{content.location}</span>
        </div>
      )}

      {content.interests && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {content.interests.map((interest, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsContent({ content }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">{content.title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(content.categories).map(([category, skills]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
              {category}
            </h4>
            <div className="space-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-300">{skill}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-1000"
                        style={{ width: `${85 + Math.random() * 15}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent({ content }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">{content.title}</h3>

      <div className="space-y-6">
        {content.positions.map((position, i) => (
          <div key={i} className="relative pl-8 pb-6 border-l-2 border-yellow-500/30 last:border-l-0 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 bg-yellow-500 rounded-full border-4 border-gray-900"></div>

            <div className="space-y-2">
              <div>
                <h4 className="text-xl font-bold text-white">{position.role}</h4>
                <p className="text-yellow-400 font-medium">{position.company}</p>
                <p className="text-sm text-gray-400">{position.period}</p>
              </div>

              <ul className="space-y-2 mt-3">
                {position.achievements.map((achievement, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-300">
                    <span className="text-yellow-500 mt-1">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent({ content }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">{content.title}</h3>

      <div className="grid grid-cols-1 gap-6">
        {content.projects.map((project, i) => (
          <div
            key={i}
            className="p-5 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl hover:border-green-500/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                {project.name}
              </h4>
              {project.link && (
                <a
                  href={project.link}
                  className="text-green-400 hover:text-green-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            <p className="text-gray-300 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, j) => (
                <span
                  key={j}
                  className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs border border-green-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent({ content }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-2">{content.title}</h3>
        <p className="text-gray-400">Let's connect and build something amazing together</p>
      </div>

      {content.email && (
        <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <a href={`mailto:${content.email}`} className="text-white hover:text-purple-400 transition-colors">
                {content.email}
              </a>
            </div>
          </div>
        </div>
      )}

      {content.social && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Social Links</h4>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(content.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <span className="text-purple-400 capitalize font-medium">{platform[0].toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white capitalize">{platform}</p>
                  <p className="text-xs text-gray-400">{url}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function renderModalContent(node) {
  const content = node.content;

  switch (node.id) {
    case 'trigger':
      return <TriggerContent content={content} />;
    case 'about':
      return <AboutContent content={content} />;
    case 'skills':
      return <SkillsContent content={content} />;
    case 'experience':
      return <ExperienceContent content={content} />;
    case 'projects':
      return <ProjectsContent content={content} />;
    case 'contact':
      return <ContactContent content={content} />;
    default:
      return <div className="text-gray-300">Content not available</div>;
  }
}
