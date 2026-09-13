# Portfolio BTS SIO

Ce dépôt contient le site qui regroupe les projets réalisés par Paul Muller durant son BTS SIO.

Le site est accessible à l’adresse [bts.paulmuller.dev](https://bts.paulmuller.dev).

## Stack

- HTML5
- CSS
- JavaScript vanilla
- GitHub Pages

## Structure

```text
.
├── CNAME
├── index.html
├── assets/
│   ├── favicon.svg
│   ├── css/style.css
│   └── js/
│       ├── projects.js
│       └── main.js
└── README.md
```

## Ajouter un projet

Ajouter un objet dans le tableau `window.BTS_PROJECTS` du fichier `assets/js/projects.js` :

```js
{
    title: "Nom du projet",
    repository: "Nom-du-depot",
    year: 2,
    type: "Application web",
    description: "Description courte et factuelle.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/BTS-Projets/Nom-du-depot",
    demoUrl: null
}
```

Utiliser `year: 1` ou `year: 2` selon l’année du BTS. Si aucune démonstration n’est publiée, conserver `demoUrl: null`.
