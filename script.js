// ==================== Resume Data ====================
const resumeData = {
    name: "Aman Kumar",
    location: "Mumbai, Maharashtra",
    email: "aman.nandkuliar@gmail.com",
    linkedin: "linkedin.com/in/aman-kumar-671a5b2a4",
    github: "AMANKUMAR-Manipal",
    x:"@AMANNANADKULIAR",


    summary: `I’m Aman Kumar, a Computer Science & Communication Engineering student at Manipal University Jaipur with a core focus on the intersection of Software, Hardware, and AI.My work revolves around building intelligent systems that don’t just exist in code, but solve real-world problems.`,

    education: [
        {
            degree: "B.Tech Computer Science And Communication Engineering",
            institution: "Manipal University Jaipur",
            location: "India",
            expected: "June 2027"
        },
        {
            degree: "High School Diploma",
            institution: "Swarajaya Senior Secondary",
            location: "Alwar, India",
            completed: "August 2023"
        }
    ],

    skills: {
        technical: {
            "Languages": ["C", "C++", "Python"],
            "Databases": ["SQL", "PostgreSQL"],
            "Web Technologies": ["HTML", "CSS", "JavaScript", "ReactJS", "NodeJS"],
            "Operating Systems": ["Windows", "MacOS", "Linux"]
        },
        soft: [
            "Leadership",
            "Team Player",
            "Great Communicator",
            "Disciplined and Punctual"
        ]
    },

    projects: [
        {
            name: "FigPro",
            url: "figpro-eight.vercel.app",
            description: "A streamlined Figma-inspired application designed to demonstrate the integration of real-world features, including live collaboration powered by cursor chat, contextual comments, reactions, and interactive design functionalities. Built with Fabric.js, the platform enables users to create and manipulate design elements such as shapes, freeform drawings, and image uploads on a collaborative canvas, showcasing practical implementations of modern collaborative tools.",
            technologies: ["Fabric.js", "Next.js","TypeScript","Liveblocks","Fabric.js","Shadcn","Tailwind CSS"]
        },
        {
            name: "Celery",
            url: "",
            description: "This project proposes an AI-driven SaaS platform that allows users to generate fully functional websites through simple natural language input. Using a multi-tenant SaaS architecture, the system serves multiple users securely from a centralized platform while keeping their data separate. The goal is to make website building accessible to non-technical users and significantly reduce development time. By leveraging advances in AI and large language models, the system converts user descriptions into structured web components automatically, similar to modern AI website builders.",
            technologies: ["AI/ML", "SaaS", "Multi-tenant Architecture", "NLP"]
        }
    ]
};

// ==================== Global State ====================
let commandHistory = [];
let historyIndex = -1;
let currentTheme = 'dracula';
let isInThemeMode = false;
let completionIndex = 0;

// ==================== Command Registry ====================
const commands = {
    help: {
        description: "Display available commands",
        execute: () => {
            return `
<span class="highlight">Available Commands:</span>

  <span class="command-text">help</span>         - Display this help message
  <span class="command-text">about</span>        - Show professional summary
  <span class="command-text">education</span>    - Display educational background
  <span class="command-text">skills</span>       - List technical and soft skills
  <span class="command-text">projects</span>     - Show project portfolio
  <span class="command-text">contact</span>      - Display contact information
  <span class="command-text">themes</span>       - Change terminal theme
  <span class="command-text">clear</span>        - Clear the terminal
  <span class="command-text">exit</span>         - Exit current mode

<span class="info">💡 Tip: Use Tab for autocomplete and ↑↓ for command history</span>
`;
        }
    },

    about: {
        description: "Display professional summary",
        execute: () => {
            return `
<span class="highlight">${resumeData.name}</span>
<span class="info">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="json-key">{</span>
  <span class="json-key">"name"</span>: <span class="json-string">"${resumeData.name}"</span>,
  <span class="json-key">"location"</span>: <span class="json-string">"${resumeData.location}"</span>,
  <span class="json-key">"role"</span>: <span class="json-string">"Computer Science Student & Aspiring Software Engineer"</span>,
  <span class="json-key">"summary"</span>: <span class="json-string">"${resumeData.summary}"</span>
<span class="json-key">}</span>

<span class="info">Type 'contact' to get in touch!</span>
`;
        }
    },

    education: {
        description: "Display educational background",
        execute: () => {
            let output = `\n<span class="highlight">🎓 Education</span>\n<span class="info">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>\n\n`;

            resumeData.education.forEach((edu, index) => {
                output += `<span class="success">▸ ${edu.degree}</span>\n`;
                output += `  ${edu.institution}, ${edu.location}\n`;
                output += `  ${edu.expected ? 'Expected: ' + edu.expected : 'Completed: ' + edu.completed}\n`;
                if (index < resumeData.education.length - 1) output += `\n`;
            });

            return output;
        }
    },

    skills: {
        description: "List technical and soft skills",
        execute: () => {
            let output = `\n<span class="highlight">💻 Skills</span>\n<span class="info">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>\n\n`;

            output += `<span class="success">Technical Skills:</span>\n`;
            for (const [category, items] of Object.entries(resumeData.skills.technical)) {
                output += `  <span class="json-key">${category}:</span> ${items.join(', ')}\n`;
            }

            output += `\n<span class="success">Soft Skills:</span>\n`;
            resumeData.skills.soft.forEach(skill => {
                output += `  <span class="info">•</span> ${skill}\n`;
            });

            return output;
        }
    },

    projects: {
        description: "Show project portfolio",
        execute: () => {
            let output = `\n<span class="highlight">🚀 Projects</span>\n<span class="info">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>\n\n`;

            resumeData.projects.forEach((project, index) => {
                output += `<span class="success">${index + 1}. ${project.name}</span>`;
                if (project.url) {
                    output += ` - <a href="https://${project.url}" target="_blank" class="link">${project.url}</a>`;
                }
                output += `\n\n`;
                output += `   ${project.description}\n\n`;
                if (project.technologies && project.technologies.length > 0) {
                    output += `   <span class="json-key">Technologies:</span> ${project.technologies.join(', ')}\n`;
                }
                if (index < resumeData.projects.length - 1) output += `\n`;
            });

            return output;
        }
    },

    contact: {
        description: "Display contact information",
        execute: () => {
            return `
<span class="highlight">📧 Contact Information</span>
<span class="info">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

  <span class="json-key">Email:</span>     <a href="mailto:${resumeData.email}" class="link">${resumeData.email}</a>
  <span class="json-key">GitHub:</span>    <a href="https://github.com/${resumeData.github}" target="_blank" class="link">github.com/${resumeData.github}</a>
  <span class="json-key">LinkedIn:</span>  <a href="https://${resumeData.linkedin}" target="_blank" class="link">${resumeData.linkedin}</a>
  <span class="json-key">x:</span>         <a href="https://${resumeData.x}" target="_blank" class="link">${resumeData.x}</a>


<span class="success">Let's connect! 🤝</span>
`;
        }
    },

    themes: {
        description: "Change terminal theme",
        execute: () => {
            isInThemeMode = true;
            return `
<span class="highlight">🎨 Available Themes</span>
<span class="info">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

  <span class="command-text">dracula</span>   - Purple & pink cyberpunk theme
  <span class="command-text">dark</span>      - Classic green-on-black hacker theme
  <span class="command-text">ubuntu</span>    - Ubuntu orange & purple theme
  <span class="command-text">medallion</span> - Vintage gold & brown theme

<span class="info">Type a theme name to switch, or 'exit' to return.</span>
`;
        }
    },

    clear: {
        description: "Clear the terminal",
        execute: () => {
            setTimeout(() => {
                document.getElementById('terminal-output').innerHTML = '';
            }, 50);
            return '';
        }
    },

    exit: {
        description: "Exit current mode",
        execute: () => {
            if (isInThemeMode) {
                isInThemeMode = false;
                return `<span class="success">Exited theme mode.</span>`;
            }
            return `<span class="info">Thanks for visiting! Type 'help' to see available commands.</span>`;
        }
    }
};

// ==================== Theme Management ====================
const themes = {
    dracula: { name: 'Dracula', description: 'Purple & pink cyberpunk theme' },
    dark: { name: 'Dark', description: 'Classic green-on-black' },
    ubuntu: { name: 'Ubuntu', description: 'Ubuntu orange & purple' },
    medallion: { name: 'Medallion', description: 'Vintage gold & brown' }
};

function changeTheme(themeName) {
    if (themes[themeName]) {
        document.body.setAttribute('data-theme', themeName === 'dracula' ? '' : themeName);
        currentTheme = themeName;
        return `<span class="success">Theme changed to '${themes[themeName].name}'!</span>`;
    }
    return `<span class="error">Unknown theme: ${themeName}</span>\n<span class="info">Available themes: ${Object.keys(themes).join(', ')}</span>`;
}

// ==================== Terminal Functions ====================
function displayOutput(text, className = '') {
    const outputDiv = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = `output-line ${className}`;

    // Typewriter effect
    let index = 0;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent;

    line.innerHTML = '';
    outputDiv.appendChild(line);
    scrollToBottom();

    const typeWriter = () => {
        if (index < text.length) {
            line.innerHTML = text.substring(0, index + 1);
            index++;
            setTimeout(typeWriter, 1); // Very fast typing
        } else {
            line.innerHTML = text; // Ensure full HTML is rendered
            scrollToBottom();
        }
    };

    typeWriter();
}

function displayCommand(command) {
    displayOutput(`<span class="prompt">aman@portfolio:~$</span> <span class="command-text">${command}</span>`);
}

function executeCommand(input) {
    const trimmedInput = input.trim().toLowerCase();

    if (!trimmedInput) return;

    // Add to history
    commandHistory.push(input);
    historyIndex = commandHistory.length;

    // Display the command
    displayCommand(input);

    // Handle theme mode
    if (isInThemeMode && trimmedInput !== 'exit') {
        if (themes[trimmedInput]) {
            const result = changeTheme(trimmedInput);
            displayOutput(result);
            isInThemeMode = false;
        } else if (trimmedInput === 'exit') {
            isInThemeMode = false;
            displayOutput(`<span class="success">Exited theme mode.</span>`);
        } else {
            displayOutput(`<span class="error">Unknown theme: ${trimmedInput}</span>\n<span class="info">Available themes: ${Object.keys(themes).join(', ')}</span>`);
        }
        return;
    }

    // Execute regular commands
    if (commands[trimmedInput]) {
        const result = commands[trimmedInput].execute();
        displayOutput(result);
    } else {
        displayOutput(`<span class="error">Command not found: ${trimmedInput}</span>\n<span class="info">Type 'help' to see available commands.</span>`);
    }
}

function scrollToBottom() {
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function updateCursorPosition(input) {
    const prompt = document.querySelector('.prompt');
    const inputElement = document.getElementById('terminal-input');
    const cursor = document.querySelector('.cursor');

    // Calculate cursor position based on input length
    const charWidth = 8.4; // Approximate width of monospace character
    const position = inputElement.value.length * charWidth;
    cursor.style.setProperty('--cursor-position', `${position}px`);
}

// ==================== Tab Completion ====================
function handleTabCompletion(input) {
    const availableCommands = isInThemeMode
        ? [...Object.keys(themes), 'exit']
        : Object.keys(commands);

    const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));

    if (matches.length === 1) {
        return matches[0];
    } else if (matches.length > 1) {
        // Cycle through matches
        completionIndex = (completionIndex + 1) % matches.length;
        return matches[completionIndex];
    }

    return input;
}

// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const modal = document.getElementById('welcome-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // Focus input when clicking anywhere in terminal
    document.querySelector('.terminal-container').addEventListener('click', () => {
        terminalInput.focus();
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        terminalInput.focus();
        // Display welcome message
        displayOutput(`
<span class="ascii-art">
╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐  ┌┬┐┌─┐  ╔═╗┌┬┐┌─┐┌┐┌  ╦╔═┬ ┬┌┬┐┌─┐┬─┐ ┌─┐
║║║├┤ │  │  │ ││││├┤    │ │ │  ╠═╣│││├─┤│││  ╠╩╗│ ││││├─┤├┬┘ └─┐
╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘   ┴ └─┘  ╩ ╩┴ ┴┴ ┴┘└┘  ╩ ╩└─┘┴ ┴┴ ┴┴└─ └─┘
                    ╔═╗┌─┐┬─┐┌┬┐┌─┐┌─┐┬  ┬┌─┐
                    ╠═╝│ │├┬┘ │ ├┤ │ ││  ││ │
                    ╩  └─┘┴└─ ┴ └  └─┘┴─┘┴└─┘
</span>

<span class="success">Welcome to my interactive terminal portfolio!</span>
Type <span class="command-text">help</span> to see available commands.

`);
    });

    // Handle input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            executeCommand(command);
            terminalInput.value = '';
            completionIndex = 0;
            updateCursorPosition(terminalInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
                updateCursorPosition(terminalInput);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
            updateCursorPosition(terminalInput);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const completed = handleTabCompletion(terminalInput.value);
            terminalInput.value = completed;
            updateCursorPosition(terminalInput);
        }
    });

    // Update cursor position on input
    terminalInput.addEventListener('input', () => {
        updateCursorPosition(terminalInput);
    });

    // Initialize cursor position
    updateCursorPosition(terminalInput);
});
