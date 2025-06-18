// Project Filtering System
const projectFilters = document.querySelectorAll('.filter-btn');
const projectGrid = document.querySelector('.project-grid');
const projects = document.querySelectorAll('.project-card');

if (projectFilters && projectGrid) {
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            
            projectFilters.forEach(btn => btn.classList.remove('active'));
           
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-filter');
            
            projects.forEach(project => {
                project.classList.remove('fade-in');
                const projectCategory = project.getAttribute('data-category');
                
                if (category === 'all' || category === projectCategory) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.classList.add('fade-in');
                    }, 10);
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}


const projectCards = document.querySelectorAll('.project-card');
const modal = document.createElement('div');
modal.className = 'project-modal';
document.body.appendChild(modal);

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectTitle = card.querySelector('h3').textContent;
        const projectDesc = card.querySelector('.project-description').textContent;
        const projectTech = card.querySelector('.project-tech').innerHTML;
        const projectImage = card.querySelector('img').src;
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${projectImage}" alt="${projectTitle}">
                <h3>${projectTitle}</h3>
                <p>${projectDesc}</p>
                <div class="project-tech">
                    ${projectTech}
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Lazy Loading for Project Images
const projectImages = document.querySelectorAll('.project-card img');
const imageOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.classList.add('fade-in');
            observer.unobserve(img);
        }
    });
}, imageOptions);

projectImages.forEach(img => {
    imageObserver.observe(img);
});

// Project Search Functionality
const searchInput = document.querySelector('.project-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        projects.forEach(project => {
            const title = project.querySelector('h3').textContent.toLowerCase();
            const description = project.querySelector('.project-description').textContent.toLowerCase();
            const tech = project.querySelector('.project-tech').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tech.includes(searchTerm)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
}

// Project Category Counter
function updateProjectCounter() {
    const categories = {};
    
    projects.forEach(project => {
        const category = project.getAttribute('data-category');
        categories[category] = (categories[category] || 0) + 1;
    });
    
    projectFilters.forEach(filter => {
        const category = filter.getAttribute('data-filter');
        const count = category === 'all' ? projects.length : (categories[category] || 0);
        
        const counterSpan = filter.querySelector('.count') || document.createElement('span');
        counterSpan.className = 'count';
        counterSpan.textContent = `(${count})`;
        
        if (!filter.querySelector('.count')) {
            filter.appendChild(counterSpan);
        }
    });
}


updateProjectCounter(); 