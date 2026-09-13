const projectsGrid = document.querySelector("#projects-grid");
const projectCount = document.querySelector("#project-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll(".filter-button");

function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
}

function createProjectLink(label, url, variant = "secondary") {
    const link = document.createElement("a");
    link.className = `project-link project-link--${variant}`;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;

    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.append(arrow);

    return link;
}

function createTechnology(technology) {
    const item = document.createElement("li");
    item.className = "technology";

    if (technology.icon) {
        const icon = document.createElement("img");
        icon.className = "technology-icon";
        icon.src = `https://skills.syvixor.com/api/icons?i=${encodeURIComponent(technology.icon)}&perline=1&radius=40`;
        icon.alt = "";
        icon.width = 18;
        icon.height = 18;
        icon.loading = "lazy";
        icon.decoding = "async";
        icon.referrerPolicy = "no-referrer";
        item.append(icon);
    }

    item.append(document.createTextNode(technology.name));
    return item;
}

function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";

    if (project.isLearningExercise) {
        card.classList.add("project-card--learning");
    }

    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.append(
        createTextElement("span", "year-badge", `BTS ${project.year}`),
        createTextElement("span", "project-type", project.type)
    );

    const heading = createTextElement("h3", "project-title", project.title);
    const repository = createTextElement("p", "repository-name", project.repository);
    const description = createTextElement("p", "project-description", project.description);

    const technologies = document.createElement("ul");
    technologies.className = "technology-list";
    technologies.setAttribute("aria-label", "Technologies et Langages utilisées");

    project.technologies.forEach((technology) => {
        technologies.append(createTechnology(technology));
    });

    const links = document.createElement("div");
    links.className = "project-links";
    links.append(createProjectLink("Code source sur GitHub", project.githubUrl));

    if (project.demoUrl) {
        links.append(createProjectLink("Site du projet", project.demoUrl, "primary"));
    }

    card.append(meta, heading, repository, description, technologies, links);
    return card;
}

function renderProjects(filter = "all") {
    const visibleProjects = window.BTS_PROJECTS.filter((project) => (
        filter === "all" || project.year === Number(filter)
    ));

    projectsGrid.replaceChildren(...visibleProjects.map(createProjectCard));
    projectsGrid.hidden = visibleProjects.length === 0;
    emptyState.hidden = visibleProjects.length !== 0 || filter !== "2";

    const label = visibleProjects.length > 1 ? "projets crées depuis le début !" : "projet crée depuis le début !";
    projectCount.textContent = `${visibleProjects.length} ${label}`;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((filterButton) => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle("is-active", isSelected);
            filterButton.setAttribute("aria-pressed", String(isSelected));
        });

        renderProjects(button.dataset.filter);
    });
});

renderProjects();
