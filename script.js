// Sample project data
const projectsData = {
    games: [
        {
            id: 'nightshade',
            title: "Codename: Nightshade",
            type: "Game",
            description: "Nightshade is a stealth game inspired by Splinter Cell. Main features: World-state Memory AI",
            image: "assets/nightshade.png",
            link: "project.html?id=nightshade",
            newtab: false
        },
        {
            id: 'slippytiles',
            title: "Slippy Tiles",
            type: "Game",
            description: "Slippy Tiles - Slide, align, and outsmart the board in a deceptively simple puzzle of precision and planning.",
            image: "assets/st.png",
            link: "project.html?id=slippytiles",
            newtab: false
        }
    ],
    apps: [
        {
            title: "VR Archviz Toolkit",
            description: `Engineered interactive ArchViz systems with runtime object transforms, material swapping, and spatial measurement tools.`,
            link: "https://www.youtube.com/watch?v=26LIzegw2Vk",
            newtab: true,
            image: "assets/xe.png",
        }
    ]
};

// Function to create a project card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Determine target attribute based on newtab parameter
    const targetAttr = project.newtab ? 'target="_blank" rel="noopener noreferrer"' : '';
    
    card.innerHTML = `
        <a href="${project.link}" ${targetAttr} style="text-decoration: none; color: inherit; display: block;">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.parentElement.textContent='No Image'">
            </div>
            <div class="project-info">
                <span class="project-type">${project.type}</span>
                <h3 class="project-title">
                    ${project.title}
                </h3>
                <p class="project-description">${project.description}</p>
            </div>
        </a>
    `;
    
    return card;
}

// Function to render projects
function renderProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = '<div class="blog-content"><p class="coming-soon">Coming soon...</p></div>';
        return;
    }
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Render games
    renderProjects(projectsData.games, 'gamesGrid');
    
    // Render apps
    renderProjects(projectsData.apps, 'appsGrid');
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
