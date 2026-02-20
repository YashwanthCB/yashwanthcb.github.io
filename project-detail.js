// Project data with detailed information
const projectsDatabase = {
    'nightshade': {
        id: 'nightshade',
        title: 'Codename: Nightshade',
        type: 'Game',
        description: "Nightshade - UE5 stealth game inspired by Splinter Cell with light exposure & sound detection. " +
                    "World-Aware Memory AI - NPCs track environment changes, build suspicion & escalate investigations.",
        links: [
            { label: 'GitHub', url: 'https://github.com/YashwanthCB/codename-nightshade' },
            { label: 'Demo Gameplay Video', url: 'https://youtu.be/DNXjnePVrZ0' }
        ],
        images: [
            'https://via.placeholder.com/800x450/00ff88/000000?text=Gameplay+Screenshot+1',
            'https://via.placeholder.com/800x450/00ccff/000000?text=Gameplay+Screenshot+2',
            'https://via.placeholder.com/800x450/00ff88/000000?text=Level+Design',
            'https://via.placeholder.com/800x450/00ccff/000000?text=AI+System'
        ],
        videos: [
            'https://www.youtube.com/embed/DNXjnePVrZ0'
        ]
    },
    'slippytiles': {
        id: 'slippytiles',
        title: 'Slippy Tiles',
        type: 'Game',
        description: `Slippy Tiles - A minimalist puzzle game where every move matters.
Slide tiles across the board to form perfect patterns and solve clever spatial challenges.
Simple to learn, surprisingly deep to master.`,
        links: [
            { label: 'Play Game', url: 'https://yashwanth.itch.io/slippy-tiles' },
            { label: 'Gameplay Teaser', url: 'https://www.youtube.com/watch?v=abIbjXpU4-g' }
        ],
        images: [
            'https://via.placeholder.com/800x450/00ff88/000000?text=Gameplay+Screenshot+1',
            'https://via.placeholder.com/800x450/00ccff/000000?text=Gameplay+Screenshot+2',
            'https://via.placeholder.com/800x450/00ff88/000000?text=Level+Design',
            'https://via.placeholder.com/800x450/00ccff/000000?text=AI+System'
        ],
        videos: [
            'https://www.youtube.com/embed/abIbjXpU4-g'
        ]
    }
};

// Get project ID from URL
function getProjectIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Render project details
function renderProjectDetails(project) {
    if (!project) {
        document.querySelector('.project-detail-container').innerHTML = 
            '<h1>Project not found</h1><a href="index.html" class="back-button">← Back to Portfolio</a>';
        return;
    }

    // Set title
    document.getElementById('projectTitle').textContent = project.title;
    document.title = `${project.title} - Yashwanth CB`;

    // Set type
    document.getElementById('projectType').textContent = project.type;

    // Set description
    document.getElementById('projectDescription').textContent = project.description;

    // Render links
    const linksContainer = document.getElementById('projectLinks');
    if (project.links && project.links.length > 0) {
        linksContainer.innerHTML = project.links.map(link => 
            `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="project-link">${link.label}</a>`
        ).join('');
    } else {
        linksContainer.innerHTML = '<p style="color: var(--text-muted);">No links available</p>';
    }

    // Render media grid
    const mediaGrid = document.getElementById('mediaGrid');
    mediaGrid.innerHTML = '';

    // Add images
    if (project.images && project.images.length > 0) {
        project.images.forEach(imageUrl => {
            const imageItem = document.createElement('div');
            imageItem.className = 'media-item';
            imageItem.innerHTML = `
                <img src="${imageUrl}" alt="${project.title}" class="media-item-image" onerror="this.parentElement.style.display='none'">
            `;
            mediaGrid.appendChild(imageItem);
        });
    }

    // Add videos
    if (project.videos && project.videos.length > 0) {
        project.videos.forEach(videoUrl => {
            const videoItem = document.createElement('div');
            videoItem.className = 'media-item';
            videoItem.innerHTML = `
                <div class="media-item-video">
                    <iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy='strict-origin-when-cross-origin'></iframe>
                </div>
            `;
            mediaGrid.appendChild(videoItem);
        });
    }

    // If no media, show message
    if ((!project.images || project.images.length === 0) && (!project.videos || project.videos.length === 0)) {
        mediaGrid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1 / -1; text-align: center; padding: 2rem;">No media available for this project</p>';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    const projectId = getProjectIdFromURL();
    const project = projectsDatabase[projectId];
    renderProjectDetails(project);
});
