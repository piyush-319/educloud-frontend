export const extraCourseLessons = {
  2: [
{
  id: "linux-1",
  icon: "🐧",
  title: "Linux & Terminal Fundamentals",
  content: "Learn what Linux is, how the shell works, and how to navigate a terminal using pwd, ls, cd, and clear.",
  concepts: [
    { title: "Linux", detail: "An operating system widely used on servers, cloud machines, and development systems." },
    { title: "Shell", detail: "A command interpreter that accepts commands and displays their results." },
    { title: "Working directory", detail: "The directory your terminal is currently operating in." }
  ],
  examples: [
    { command: "pwd", output: "/home/student", explanation: "Prints the current working directory." },
    { command: "ls", output: "Documents  Downloads  projects", explanation: "Lists entries in the current directory. Your output may differ." },
    { command: "cd Documents", output: "(no output)", explanation: "Changes into the Documents directory if it exists." }
  ],
  mission: "Explore your terminal. Run pwd, ls, and cd to enter a directory and then return to your home directory.",
  expectedOutput: "pwd should print a directory path. ls should list available entries. cd changes the current directory without normally printing a message.",
  quiz: [
    { question: "Which command prints your current directory?", options: ["pwd", "ls", "clear", "cd"], answer: 0, explanation: "pwd means print working directory." },
    { question: "Which command lists directory entries?", options: ["cd", "ls", "pwd", "who"], answer: 1, explanation: "ls lists files and directories." },
    { question: "What does cd do?", options: ["Deletes a directory", "Changes directory", "Lists files", "Creates a user"], answer: 1, explanation: "cd changes the shell's current directory." },
    { question: "What is a shell?", options: ["A command interpreter", "A text file", "A network cable", "A database"], answer: 0, explanation: "A shell interprets commands and launches programs." },
    { question: "Does ls always show the same output on every computer?", options: ["Yes", "No"], answer: 1, explanation: "The output depends on the entries in that directory." }
  ],
  takeaways: ["Use pwd to check your location.", "Use ls to inspect a directory.", "Use cd to move between directories."],
  nextMission: "Practice navigating between several directories and identify where you are after each change."
},
{
  id: "linux-2",
  icon: "📁",
  title: "Files, Directories and Permissions",
  content: "Learn to create, inspect, copy, move, and remove files and directories, and understand basic Linux permissions.",
  concepts: [
    { title: "File and directory", detail: "Files store data; directories organize files and other directories." },
    { title: "Paths", detail: "Absolute paths start from the filesystem root; relative paths start from your current directory." },
    { title: "Permissions", detail: "Read (r), write (w), and execute (x) permissions control access for the owner, group, and others." }
  ],
  examples: [
    { command: "mkdir practice", output: "(no output)", explanation: "Creates a directory named practice." },
    { command: "touch notes.txt", output: "(no output)", explanation: "Creates an empty file if it does not exist." },
    { command: "ls -l", output: "-rw-r--r-- 1 student student 0 notes.txt", explanation: "Illustrative output showing file details and permissions; your output may differ." },
    { command: "cp notes.txt notes-copy.txt", output: "(no output)", explanation: "Copies the file to a new name." }
  ],
  mission: "Create a practice directory and an empty notes.txt file inside it. List the files and inspect their permissions with ls -l.",
  expectedOutput: "The directory should contain notes.txt. ls -l should show a permissions string, owner/group information, and the filename.",
  quiz: [
    { question: "Which command creates a directory?", options: ["mkdir", "pwd", "cat", "whoami"], answer: 0, explanation: "mkdir creates a directory." },
    { question: "Which command copies a file?", options: ["mv", "cp", "cd", "pwd"], answer: 1, explanation: "cp copies files or directories when used with suitable options." },
    { question: "What does the r permission mean?", options: ["Rename", "Read", "Remove", "Run only"], answer: 1, explanation: "r grants read access." },
    { question: "What does an absolute path start from?", options: ["Your current directory", "The filesystem root", "The Downloads folder", "A filename"], answer: 1, explanation: "An absolute path starts at the filesystem root, represented by /." },
    { question: "Which command displays a detailed listing?", options: ["ls -l", "clear", "cd", "touch"], answer: 0, explanation: "The -l option requests a long listing format." }
  ],
  takeaways: ["Use mkdir to create directories.", "Use cp to copy files.", "Understand read, write, and execute permissions before changing them."],
  nextMission: "Create a small folder structure and compare permissions on two files."
}
  ,
{
  id: "linux-3",
  icon: "👥",
  title: "Users, Groups and Processes",
  content: "Understand Linux users and groups, inspect running processes, and learn how process IDs help with system administration.",
  concepts: [
    { title: "Users and groups", detail: "Users represent accounts. Groups help manage shared access to files and resources." },
    { title: "Process ID (PID)", detail: "Each running process has a process identifier." },
    { title: "Process monitoring", detail: "Tools such as ps and top help inspect running processes." }
  ],
  examples: [
    { command: "whoami", output: "student", explanation: "Prints the current username; your output may differ." },
    { command: "id", output: "uid=1000(student) gid=1000(student) groups=1000(student)", explanation: "Illustrative output showing user and group identifiers." },
    { command: "ps", output: "PID TTY TIME CMD", explanation: "Displays processes associated with the current terminal; output varies." },
    { command: "ps -ef", output: "(process listing)", explanation: "Lists processes in a detailed format on common Linux systems." }
  ],
  mission: "Run whoami, id, and ps. Identify your current username and find a process ID in the process listing.",
  expectedOutput: "whoami prints a username, id shows user and group identifiers, and ps displays process information.",
  quiz: [
    { question: "Which command prints the current username?", options: ["whoami", "mkdir", "pwd", "touch"], answer: 0, explanation: "whoami prints the effective username." },
    { question: "What does PID stand for?", options: ["Process Identifier", "Private Internet Directory", "Program Input Data", "Permission ID"], answer: 0, explanation: "PID is the identifier assigned to a process." },
    { question: "Which command can list processes?", options: ["ps", "cd", "mkdir", "echo"], answer: 0, explanation: "ps reports process information." },
    { question: "Why are groups useful?", options: ["They organize shared access", "They replace all files", "They shut down Linux", "They change IP addresses"], answer: 0, explanation: "Groups let administrators manage access for sets of users." },
    { question: "Does every running process have a PID?", options: ["Yes, on normal Linux process systems", "No process has one"], answer: 0, explanation: "Linux assigns process identifiers to processes." }
  ],
  takeaways: ["Use whoami to identify the current user.", "Use id to inspect user and group IDs.", "Use ps to inspect processes and their PIDs."],
  nextMission: "Compare process listings before and after opening a terminal command."
},
{
  id: "linux-4",
  icon: "🌐",
  title: "Networking and Troubleshooting",
  content: "Learn basic network concepts and practise checking connectivity, hostnames, and IP configuration with common Linux tools.",
  concepts: [
    { title: "IP address", detail: "An address used to identify a network interface on an IP network." },
    { title: "DNS", detail: "The Domain Name System helps translate domain names into IP addresses." },
    { title: "Connectivity checks", detail: "Network tools help distinguish name-resolution problems from connectivity issues." }
  ],
  examples: [
    { command: "hostname", output: "student-vm", explanation: "Prints the machine hostname; your output may differ." },
    { command: "ip addr", output: "(network interface listing)", explanation: "Displays network interfaces and addresses on systems with iproute2 installed." },
    { command: "getent hosts example.com", output: "(resolved address, if available)", explanation: "Checks whether the system can resolve a hostname; network and DNS access are required." },
    { command: "ping -c 4 example.com", output: "(connectivity statistics, if replies are allowed)", explanation: "Sends four test packets. Some networks block ping, so no reply does not always mean a site is down." }
  ],
  mission: "Check your hostname and network interfaces. If internet access is available, try resolving example.com and explain what the result tells you.",
  expectedOutput: "hostname prints a host name, ip addr lists interfaces, and getent hosts may return an address when name resolution succeeds.",
  quiz: [
    { question: "What does DNS help do?", options: ["Resolve names to IP addresses", "Create Linux users", "Edit files", "List processes"], answer: 0, explanation: "DNS maps domain names to IP addresses." },
    { question: "Which command shows network interfaces and addresses?", options: ["ip addr", "whoami", "mkdir", "ps"], answer: 0, explanation: "ip addr displays interface and address information." },
    { question: "What does hostname display?", options: ["The machine's host name", "All passwords", "File permissions", "Every process"], answer: 0, explanation: "hostname displays or manages the system hostname." },
    { question: "If ping receives no replies, is the destination definitely offline?", options: ["Yes", "No"], answer: 1, explanation: "Firewalls and network policies may block ping replies." },
    { question: "What does getent hosts help check?", options: ["Host name resolution", "Disk formatting", "User creation", "File copying"], answer: 0, explanation: "It queries the system's configured name-service databases for host information." }
  ],
  takeaways: ["Know the role of IP addresses and DNS.", "Use ip addr to inspect interfaces.", "Interpret network test results in context."],
  nextMission: "Troubleshoot a hostname-resolution issue by checking the hostname lookup and network configuration separately."
}
,
{
  id: "linux-5",
  icon: "⌨️",
  title: "Bash Scripting",
  content: "Learn to automate repetitive terminal tasks with Bash scripts, variables, command output, and conditional logic.",
  concepts: [
    { title: "Bash script", detail: "A text file containing shell commands that can be run as a sequence." },
    { title: "Variables", detail: "Store values and reference them using a dollar sign, such as $name." },
    { title: "Conditionals", detail: "Use if and else to run different commands depending on a condition." }
  ],
  examples: [
    { command: "echo 'Hello from Bash'", output: "Hello from Bash", explanation: "Prints text to the terminal." },
    { command: "name='Student'; echo \"Hello, $name\"", output: "Hello, Student", explanation: "Assigns a value to a variable and expands it." },
    { command: "if [ -d \"$HOME\" ]; then echo 'Home exists'; fi", output: "Home exists", explanation: "Checks whether the home directory exists; output depends on the system." }
  ],
  mission: "Create a script named greet.sh that prints a greeting and displays the current username using whoami. Run it with Bash.",
  expectedOutput: "The script should print your greeting and then the username of the account running it.",
  quiz: [
    { question: "What is a Bash script?", options: ["A file of shell commands", "A network protocol", "A database table", "A Linux user"], answer: 0, explanation: "A Bash script automates a sequence of shell commands." },
    { question: "Which command prints text?", options: ["echo", "cd", "pwd", "mkdir"], answer: 0, explanation: "echo writes its arguments to standard output." },
    { question: "How do you reference a variable named name?", options: ["$name", "#name", "&name", "/name"], answer: 0, explanation: "Bash variable values are expanded with the $ prefix." },
    { question: "What does an if statement do?", options: ["Runs commands based on a condition", "Always deletes a file", "Changes the hostname", "Lists all users"], answer: 0, explanation: "Conditionals select commands according to whether a test succeeds." },
    { question: "Which command can run a script with Bash?", options: ["bash greet.sh", "pwd greet.sh", "ls greet.sh", "cd greet.sh"], answer: 0, explanation: "bash greet.sh passes the script file to the Bash interpreter." }
  ],
  takeaways: ["Automate repeated commands with scripts.", "Use variables to reuse values.", "Use conditionals to make scripts respond to different situations."],
  nextMission: "Write a script that checks whether a chosen directory exists and prints a useful message."
},
{
  id: "linux-6",
  icon: "🌿",
  title: "Git and Version Control",
  content: "Learn how Git tracks file changes, records commits, and helps developers work with project history.",
  concepts: [
    { title: "Repository", detail: "A project directory whose history and changes are tracked by Git." },
    { title: "Commit", detail: "A recorded snapshot of selected changes, accompanied by a message." },
    { title: "Staging area", detail: "The area where you select changes to include in the next commit." }
  ],
  examples: [
    { command: "git --version", output: "git version (installed version)", explanation: "Checks whether Git is installed; the version depends on your system." },
    { command: "git init", output: "Initialized empty Git repository ...", explanation: "Initializes a repository in the current directory if it is not already one." },
    { command: "git status", output: "(repository status)", explanation: "Shows changed, staged, and untracked files." },
    { command: "git add README.md", output: "(no output)", explanation: "Stages README.md if the file exists." },
    { command: "git commit -m \"Add README\"", output: "(commit summary)", explanation: "Records staged changes; Git may require user.name and user.email to be configured first." }
  ],
  mission: "In a new practice directory, initialize a Git repository, create a README.md file, inspect git status, stage the file, and commit it.",
  expectedOutput: "git status should show the new file before staging and a clean working tree after a successful commit.",
  quiz: [
    { question: "What is Git used for?", options: ["Version control", "Changing screen brightness only", "Creating IP addresses", "Managing CPU temperature only"], answer: 0, explanation: "Git tracks changes and records project history." },
    { question: "What does git init do?", options: ["Initializes a repository", "Deletes all commits", "Installs Linux", "Uploads every file automatically"], answer: 0, explanation: "git init creates repository metadata in the current directory." },
    { question: "What does git status show?", options: ["Working-tree and staging state", "Only the computer hostname", "Network routes only", "All user passwords"], answer: 0, explanation: "git status summarizes changes and untracked files." },
    { question: "What does git add do?", options: ["Stages selected changes", "Immediately pushes to a remote", "Creates a Linux user", "Removes Git"], answer: 0, explanation: "git add selects changes for the next commit." },
    { question: "What is a commit?", options: ["A recorded set of changes", "A directory permission", "A network address", "A shell variable"], answer: 0, explanation: "A commit records staged changes in the repository history." }
  ],
  takeaways: ["Use git status to inspect changes.", "Stage changes before committing.", "Write clear commit messages that explain the purpose of a change."],
  nextMission: "Make a second change to README.md and create another commit so you can inspect the project history."
}
,
{
  title: "Docker Fundamentals",
  icon: "🐳",
  duration: "~20 min",
  overview: "Understand containers, images, Dockerfiles and the basic container lifecycle.",
  concepts: [
    { title: "Image", detail: "A template used to create containers." },
    { title: "Container", detail: "An isolated runtime environment created from an image." },
    { title: "Dockerfile", detail: "A text file describing steps to build an image." }
  ],
  example: [
    { command: "docker --version", output: "Docker version (installed version)" },
    { command: "docker images", output: "(List of locally available images)" },
    { command: "docker ps", output: "(List of running containers)" },
    { command: "docker ps -a", output: "(List of all containers, including stopped ones)" }
  ],
  mission: "If Docker is installed and available, inspect local images and containers using docker images and docker ps. If it is unavailable, explain the difference between an image and a container.",
  expectedOutput: "Docker commands display local image or container information when the Docker engine is accessible.",
  quiz: [
    { question: "What is a Docker image?", options: ["A template for creating containers", "A running process only", "A Git branch", "A Linux user"], answer: 0, explanation: "Images provide the packaged filesystem and configuration used to create containers." },
    { question: "What is a container?", options: ["An instance created from an image", "A source-control commit", "A network cable", "A directory permission"], answer: 0, explanation: "A container is a running or stopped instance based on an image." },
    { question: "What does docker ps show by default?", options: ["Running containers", "All local files", "Every Docker image", "Git commits"], answer: 0, explanation: "docker ps lists running containers by default." },
    { question: "What is a Dockerfile used for?", options: ["Defining image build instructions", "Tracking Git branches", "Changing Linux passwords", "Checking DNS only"], answer: 0, explanation: "A Dockerfile describes how to build an image." },
    { question: "Does docker ps -a include stopped containers?", options: ["Yes", "No"], answer: 0, explanation: "The -a option includes containers that are not currently running." }
  ],
  takeaways: ["Images are templates; containers are instances.", "Dockerfiles describe image builds.", "Use Docker inspection commands to understand local resources."],
  nextMission: "Sketch a simple application container workflow from Dockerfile to image to container."
},
{
  title: "CI/CD Pipeline Fundamentals",
  icon: "🔄",
  duration: "~20 min",
  overview: "Learn how continuous integration and continuous delivery/deployment automate software checks and releases.",
  concepts: [
    { title: "Continuous integration", detail: "Frequently combine code changes and run automated checks." },
    { title: "Continuous delivery", detail: "Keep software ready for release after automated validation." },
    { title: "Pipeline stages", detail: "Typical stages include checkout, build, test and deployment." }
  ],
  example: [
    { command: "git status", output: "(Check working-tree changes)" },
    { command: "npm test", output: "(Project test results, if a test script exists)" },
    { command: "npm run build", output: "(Build output, if configured)" }
  ],
  mission: "Draw a pipeline with checkout, dependency installation, tests, build and deployment. Identify which stages should pass before release.",
  expectedOutput: "A clear sequence of stages with tests and build checks completed before deployment.",
  quiz: [
    { question: "What is the purpose of continuous integration?", options: ["Integrate changes and run automated checks frequently", "Skip testing", "Store passwords in source code", "Replace version control"], answer: 0, explanation: "CI helps detect integration issues early through frequent automated validation." },
    { question: "Which is a common pipeline stage?", options: ["Build", "Guess", "Ignore tests", "Delete source history"], answer: 0, explanation: "Build is a common stage in automated pipelines." },
    { question: "Why run automated tests before deployment?", options: ["To detect problems earlier", "To guarantee there are never bugs", "To remove all logs", "To disable reviews"], answer: 0, explanation: "Tests help catch regressions, although they cannot guarantee bug-free software." },
    { question: "What does continuous delivery aim for?", options: ["Keeping software ready for release", "Manually copying every file without checks", "Removing the build process", "Stopping collaboration"], answer: 0, explanation: "Continuous delivery keeps validated changes ready for release." },
    { question: "Should secrets be hard-coded into pipeline files?", options: ["No, use an appropriate secrets manager", "Yes, always"], answer: 0, explanation: "Secrets should be protected using secure secret storage and access controls." }
  ],
  takeaways: ["Automate repeatable checks.", "Run tests before releasing changes.", "Protect credentials and deployment secrets."],
  nextMission: "Design a pipeline for a small web app and explain what happens when its tests fail."
}
  ],
  3: [
{
  title: "Python Setup and First Program",
  icon: "🐍",
  duration: "~15 min",
  overview: "Understand Python, run your first program, and learn how Python executes instructions.",
  concepts: [
    { title: "Python interpreter", detail: "The interpreter executes Python code." },
    { title: "print()", detail: "The print function displays information in the output." },
    { title: "Syntax and indentation", detail: "Python uses indentation to organize code blocks." }
  ],
  example: [
    { command: "python3 --version", output: "Python 3.x.x (installed version)" },
    { command: "print('Hello, world!')", output: "Hello, world!" },
    { command: "print(2 + 3)", output: "5" }
  ],
  mission: "Create hello.py containing print('Hello, Python!') and run it with python3 hello.py.",
  expectedOutput: "Hello, Python!",
  quiz: [
    { question: "Which function displays output in Python?", options: ["print()", "input()", "type()", "range()"], answer: 0, explanation: "print() writes the supplied values to standard output." },
    { question: "Which command commonly runs hello.py with Python 3 on Linux?", options: ["python3 hello.py", "run hello.py", "open python3", "git hello.py"], answer: 0, explanation: "python3 invokes the Python 3 interpreter on the script." },
    { question: "What does print(2 + 3) display?", options: ["5", "23", "2 + 3", "Error in every Python version"], answer: 0, explanation: "Python evaluates the addition before printing the result." },
    { question: "What is a Python interpreter?", options: ["A program that executes Python code", "A folder for images", "A Git branch", "A database record"], answer: 0, explanation: "The interpreter executes Python instructions." },
    { question: "Python uses indentation to structure code blocks.", options: ["True", "False"], answer: 0, explanation: "Indentation is syntactically significant for Python code blocks." }
  ],
  takeaways: ["Run Python scripts with the interpreter.", "Use print() to display results.", "Write valid syntax and consistent indentation."],
  nextMission: "Write a program that prints your name and the result of a simple calculation."
},
{
  title: "Variables and Data Types",
  icon: "📦",
  duration: "~18 min",
  overview: "Store information in variables and distinguish common Python data types.",
  concepts: [
    { title: "Variables", detail: "Names refer to values that a program can use." },
    { title: "Common types", detail: "int represents integers, float represents floating-point numbers, str represents text, and bool represents truth values." },
    { title: "Type conversion", detail: "Functions such as int(), float(), and str() convert compatible values." }
  ],
  example: [
    { command: "name = 'Asha'", output: "(Stores text in name)" },
    { command: "age = 16", output: "(Stores an integer in age)" },
    { command: "price = 19.5", output: "(Stores a floating-point value)" },
    { command: "print(type(age))", output: "<class 'int'>" },
    { command: "print(int('42'))", output: "42" }
  ],
  mission: "Create variables for a product name, quantity, and price. Print each value and inspect its type using type().",
  expectedOutput: "The program displays the three stored values and their Python types.",
  quiz: [
    { question: "Which type represents text such as 'hello'?", options: ["str", "int", "bool", "float"], answer: 0, explanation: "Strings use the str type." },
    { question: "What is the type of 12 in Python?", options: ["int", "str", "float", "bool"], answer: 0, explanation: "12 is an integer literal." },
    { question: "What does type(3.5) return?", options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'bool'>"], answer: 0, explanation: "A decimal numeric literal such as 3.5 has type float." },
    { question: "Which expression converts the text '42' to an integer?", options: ["int('42')", "str(42)", "bool('42')", "type('42')"], answer: 0, explanation: "int() converts a valid integer string to an integer." },
    { question: "Can a Python variable name be reassigned to a value of another type?", options: ["Yes", "No"], answer: 0, explanation: "Python names can be rebound to values of different types." }
  ],
  takeaways: ["Variables give names to values.", "Use type() to inspect a value's type.", "Convert input carefully because text and numbers are different types."],
  nextMission: "Build a small receipt program that stores item names, quantities, and prices."
},
{
  title: "Conditions",
  icon: "🔀",
  duration: "~18 min",
  overview: "Make programs choose different actions using comparisons and conditional statements.",
  concepts: [
    { title: "Boolean expressions", detail: "Comparisons such as age >= 18 evaluate to True or False." },
    { title: "if and else", detail: "Use if to run a block when a condition is true and else for the alternative." },
    { title: "elif", detail: "Use elif to check another condition when earlier conditions were false." }
  ],
  example: [
    { command: "age = 20\nif age >= 18:\n    print('Adult')\nelse:\n    print('Under 18')", output: "Adult" },
    { command: "score = 75\nif score >= 90:\n    print('A')\nelif score >= 70:\n    print('B')\nelse:\n    print('Keep practising')", output: "B" },
    { command: "print(5 > 3)", output: "True" }
  ],
  mission: "Write a program that stores a score and prints 'Pass' when the score is at least 40, otherwise prints 'Try again'.",
  expectedOutput: "A score of 40 or more prints Pass; a lower score prints Try again.",
  quiz: [
    { question: "Which keyword starts a conditional block?", options: ["if", "for", "def", "import"], answer: 0, explanation: "if begins a conditional statement." },
    { question: "What does elif allow you to do?", options: ["Check another condition", "Define a function", "Create a list", "Repeat forever"], answer: 0, explanation: "elif checks another condition when previous conditions were false." },
    { question: "What is the result of 5 > 3?", options: ["True", "False", "5", "3"], answer: 0, explanation: "Five is greater than three, so the comparison evaluates to True." },
    { question: "When does an else block run in a simple if/else statement?", options: ["When the if condition is false", "Whenever the program starts", "Only when a loop ends", "Only after importing a module"], answer: 0, explanation: "The else block handles the case where the if condition is false." },
    { question: "Which operator checks whether two values are equal?", options: ["==", "=", "!=", ">="], answer: 0, explanation: "== compares values for equality; = assigns a value." }
  ],
  takeaways: ["Use comparisons to produce Boolean values.", "Use if and else to choose between paths.", "Use elif when several conditions need to be checked."],
  nextMission: "Build a simple ticket-price checker using age ranges and conditional branches."
},
{
  title: "Loops",
  icon: "🔁",
  duration: "~20 min",
  overview: "Repeat actions efficiently with for and while loops and control repetition using range().",
  concepts: [
    { title: "for loop", detail: "Iterates over items in an iterable such as a list or range." },
    { title: "while loop", detail: "Repeats while its condition remains true." },
    { title: "range()", detail: "Produces a sequence of integers commonly used for counting loops." }
  ],
  example: [
    { command: "for i in range(3):\n    print(i)", output: "0\n1\n2" },
    { command: "for name in ['Asha', 'Ravi']:\n    print(name)", output: "Asha\nRavi" },
    { command: "count = 1\nwhile count <= 3:\n    print(count)\n    count += 1", output: "1\n2\n3" }
  ],
  mission: "Write a loop that prints the numbers 1 through 10, then write another loop that prints each item in a short list.",
  expectedOutput: "The first loop prints each integer from 1 to 10. The second prints each list item once.",
  quiz: [
    { question: "Which loop commonly iterates over a list?", options: ["for", "def", "class", "import"], answer: 0, explanation: "A for loop iterates over items in an iterable." },
    { question: "What does list(range(3)) produce?", options: ["[0, 1, 2]", "[1, 2, 3]", "[0, 1, 2, 3]", "[3]"], answer: 0, explanation: "range(3) starts at zero and stops before three." },
    { question: "When does a while loop continue?", options: ["While its condition is true", "Only once", "Only when a list is empty", "Only after a function returns"], answer: 0, explanation: "A while loop repeats while its condition evaluates to true." },
    { question: "How many times does for i in range(4) run its body?", options: ["4", "3", "5", "1"], answer: 0, explanation: "range(4) yields 0, 1, 2, and 3, giving four iterations." },
    { question: "What can prevent a while loop from ending as expected?", options: ["A condition that never becomes false", "Using an integer variable", "Printing a message", "Naming a variable"], answer: 0, explanation: "If the condition stays true and no exit occurs, the loop can continue indefinitely." }
  ],
  takeaways: ["Use for loops to iterate over sequences.", "Use range() for numeric iteration.", "Ensure while-loop conditions can eventually become false."],
  nextMission: "Create a multiplication-table generator using a loop."
},
{
  title: "Functions",
  icon: "⚙️",
  duration: "~20 min",
  overview: "Organize reusable code with functions, parameters, return values and local variables.",
  concepts: [
    { title: "def", detail: "The def keyword defines a function." },
    { title: "Parameters and arguments", detail: "Parameters are names in a function definition; arguments are values passed when calling it." },
    { title: "return", detail: "return sends a result back to the caller." }
  ],
  example: [
    { command: "def greet(name):\n    print('Hello,', name)\n\ngreet('Asha')", output: "Hello, Asha" },
    { command: "def add(a, b):\n    return a + b\n\nprint(add(3, 4))", output: "7" },
    { command: "def square(n):\n    return n * n\n\nresult = square(5)\nprint(result)", output: "25" }
  ],
  mission: "Write a function named calculate_total that accepts a price and quantity and returns their product. Call it and print the result.",
  expectedOutput: "Calling calculate_total(12, 3) should return 36.",
  quiz: [
    { question: "Which keyword defines a function in Python?", options: ["def", "return", "import", "while"], answer: 0, explanation: "def introduces a function definition." },
    { question: "In def greet(name), what is name?", options: ["A parameter", "A returned value", "A loop", "A module"], answer: 0, explanation: "name is the parameter listed in the function definition." },
    { question: "What does return do?", options: ["Sends a result back to the caller", "Always prints a value", "Repeats a loop", "Imports a module"], answer: 0, explanation: "return passes a value back to the code that called the function." },
    { question: "What does add(3, 4) return for def add(a, b): return a + b?", options: ["7", "34", "3", "4"], answer: 0, explanation: "The function adds its arguments, so 3 + 4 equals 7." },
    { question: "Why are functions useful?", options: ["They help reuse organized code", "They remove the need for all variables", "They automatically fix every bug", "They replace the Python interpreter"], answer: 0, explanation: "Functions package behavior so it can be called repeatedly." }
  ],
  takeaways: ["Define reusable behavior with def.", "Pass information through parameters.", "Use return when a caller needs a computed result."],
  nextMission: "Create separate functions for adding, subtracting and multiplying two numbers."
},
{
  title: "Lists, Dictionaries and Collections",
  icon: "🗂️",
  duration: "~20 min",
  overview: "Store and work with groups of values using lists, tuples, dictionaries and sets.",
  concepts: [
    { title: "List", detail: "An ordered, mutable collection that can contain multiple values." },
    { title: "Tuple and set", detail: "Tuples are ordered and immutable; sets store distinct values without guaranteeing a positional order." },
    { title: "Dictionary", detail: "A mapping that associates keys with values." }
  ],
  example: [
    { command: "fruits = ['apple', 'banana']\nfruits.append('mango')\nprint(fruits)", output: "['apple', 'banana', 'mango']" },
    { command: "student = {'name': 'Asha', 'score': 90}\nprint(student['name'])", output: "Asha" },
    { command: "colors = {'red', 'blue', 'red'}\nprint(len(colors))", output: "2" },
    { command: "point = (4, 7)\nprint(point[0])", output: "4" }
  ],
  mission: "Create a list of three tasks and a dictionary storing a student's name and score. Add another task and print the updated collection and student details.",
  expectedOutput: "The list contains four tasks, and the dictionary displays the stored name and score.",
  quiz: [
    { question: "Which collection type is mutable and ordered?", options: ["list", "tuple", "str", "int"], answer: 0, explanation: "Lists are ordered collections whose elements can be changed." },
    { question: "How do you access the value associated with the name key in student?", options: ["student['name']", "student.name()", "student(name)", "student->name"], answer: 0, explanation: "Dictionary values are accessed by indexing with their keys." },
    { question: "What does append() do to a list?", options: ["Adds an item to the end", "Sorts every dictionary", "Removes the first item", "Makes the list immutable"], answer: 0, explanation: "append() adds one item to the end of a list." },
    { question: "What happens to duplicate values in a set?", options: ["Only one copy of each value is retained", "Every duplicate gets a fixed index", "The set becomes a tuple", "All values are converted to strings"], answer: 0, explanation: "Sets store distinct elements, so duplicates do not create separate entries." },
    { question: "Which collection is immutable after creation?", options: ["tuple", "list", "dict", "set"], answer: 0, explanation: "A tuple cannot have its elements reassigned or added after creation." }
  ],
  takeaways: ["Use lists for ordered collections you need to change.", "Use dictionaries for key-value data.", "Choose tuples and sets when their properties fit the task."],
  nextMission: "Build a simple inventory dictionary and update the quantity of an item."
},
{
  title: "Files and Exception Handling",
  icon: "📄",
  duration: "~20 min",
  overview: "Read and write files safely, use context managers, and handle common runtime errors.",
  concepts: [
    { title: "File modes", detail: "The r mode reads, w writes from scratch, and a appends to an existing file or creates it." },
    { title: "with open()", detail: "A context manager ensures a file is properly closed when the block finishes." },
    { title: "Exceptions", detail: "try and except let a program handle expected runtime errors." }
  ],
  example: [
    { command: "with open('notes.txt', 'w') as file:\n    file.write('Hello\\n')", output: "(Writes Hello followed by a newline)" },
    { command: "with open('notes.txt', 'r') as file:\n    print(file.read())", output: "Hello" },
    { command: "try:\n    number = int('abc')\nexcept ValueError:\n    print('Please enter a valid integer')", output: "Please enter a valid integer" }
  ],
  mission: "Write a program that saves a note to notes.txt, reads it back, and handles a ValueError when converting invalid text to an integer.",
  expectedOutput: "The saved note is displayed, and invalid numeric text produces a helpful message instead of an unhandled ValueError.",
  quiz: [
    { question: "Which file mode is used to append content?", options: ["a", "r", "x", "b"], answer: 0, explanation: "The a mode appends to a file and creates it if needed." },
    { question: "Why use with open(...) as file?", options: ["It manages file closing automatically", "It encrypts every file", "It prevents all exceptions", "It converts text into integers"], answer: 0, explanation: "The context manager closes the file when the block exits." },
    { question: "Which exception commonly occurs when int('abc') is evaluated?", options: ["ValueError", "KeyError", "IndexError", "StopIteration"], answer: 0, explanation: "The text abc is not a valid integer representation, so int() raises ValueError." },
    { question: "What does the w file mode do to an existing file when it is opened successfully?", options: ["Truncates its existing content", "Always appends to the end", "Opens it only for reading", "Renames the file"], answer: 0, explanation: "Opening an existing file in w mode truncates its content." },
    { question: "What is the purpose of an except block?", options: ["Handle a matching exception", "Define a new class", "Repeat a loop", "Import a package"], answer: 0, explanation: "An except block handles exceptions matching its declared type." }
  ],
  takeaways: ["Use the appropriate file mode.", "Prefer with open() for resource management.", "Catch specific exceptions and give useful feedback."],
  nextMission: "Create a small journal program that appends entries and handles a missing or invalid input."
},
{
  title: "CLI Task Tracker Mini-Project",
  icon: "✅",
  duration: "~25 min",
  overview: "Combine Python variables, collections, loops, functions, file operations and exception handling in a command-line task tracker.",
  concepts: [
    { title: "Command-line interface", detail: "A CLI lets users interact with a program through text commands and prompts." },
    { title: "Task collection", detail: "A list can store task records while the program is running." },
    { title: "Persistence", detail: "Saving tasks to a file lets them remain available after the program exits." }
  ],
  example: [
    { command: "tasks = ['Study Python', 'Practise loops']\nfor index, task in enumerate(tasks, start=1):\n    print(f'{index}. {task}')", output: "1. Study Python\n2. Practise loops" },
    { command: "task = input('Enter a task: ').strip()\nif task:\n    print('Added:', task)\nelse:\n    print('Task cannot be empty')", output: "(Displays a message based on the entered text)" }
  ],
  mission: "Build a CLI task tracker that can list tasks, add a task, mark a task complete, and save task data to a JSON file. Handle invalid menu choices and missing or malformed saved data gracefully.",
  expectedOutput: "The menu offers add, list, complete and exit actions. Added tasks can be saved and loaded again, and invalid choices show a helpful message.",
  quiz: [
    { question: "Which Python module provides JSON encoding and decoding?", options: ["json", "math", "random", "pathlib"], answer: 0, explanation: "The json module converts compatible Python data to and from JSON." },
    { question: "Why save tasks to a file?", options: ["To retain them after the program exits", "To make loops unnecessary", "To prevent every possible error", "To change Python syntax"], answer: 0, explanation: "File persistence allows task data to be loaded in a later run." },
    { question: "Why validate a user's menu choice?", options: ["To handle unsupported choices safely", "To make all input trusted", "To remove the need for functions", "To turn every string into a number automatically"], answer: 0, explanation: "Validation lets the program reject unsupported options with useful feedback." },
    { question: "What does enumerate(tasks, start=1) do?", options: ["Produces index-value pairs starting at index 1", "Sorts tasks alphabetically", "Deletes completed tasks", "Writes tasks to a file"], answer: 0, explanation: "enumerate yields each item with a counter beginning at the supplied start value." },
    { question: "Which design helps keep a task tracker's code organized?", options: ["Separate functions for menu actions", "One enormous repeated code block", "Ignore invalid input", "Store every task in a variable name"], answer: 0, explanation: "Separate functions make each action easier to understand, test and maintain." }
  ],
  takeaways: ["Combine smaller concepts to build a useful program.", "Validate input and handle file errors.", "Separate program actions into functions and persist data when needed."],
  nextMission: "Add task priorities, due dates, and a filter that displays only incomplete tasks."
}
  ],
};
