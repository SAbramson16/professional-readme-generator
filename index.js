const inquirer = require('inquirer');
const fs = require('fs');


// create two arrays for all the license options and the corresponding badge links.
let options = [
    'Apache License 2.0',
    'GNU General Public License v3.0', 
    'MIT License', 
    'BSD 2-Clause "Simplified" License', 
    'BSD 3-Clause "New" or "Revised" License', 
    'Boost Software License 1.0', 
    'Creative Commons Zero v1.0 Universal', 
    'Eclipse Public License 2.0', 
    'GNU Affero General Public License v3.0', 
    'GNU General Public License v2.0', 
    'GNU Lesser General Public License v2.1', 
    'Mozilla Public License 2.0', 
    'The Unlicense' 
];

let badgeLinks = [
'[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
'[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
'[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
'[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)',
'[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
'[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
'[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)',
'[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)',
'[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
'[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)',
'[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',
'[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
'[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)'
];

//Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Please enter title name.',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please type out a description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter usage information.',
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please enter contribution guidelines.',
    },
    {
        type: 'input',
        name: 'test',
        message: 'What are the test instructions?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license for your project.',
        choices: options,
        default: options[0]
    },
    {
        type: 'input',
        name: 'username',
        message: 'Please enter your Github username.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address.',
    }
];

//Create a function to write README file
const generateMarkdown = ({title, description, installation, usage, contribution, test, license, username, email, badges}) =>
`# ${title} ${badges}

## Description
${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## License
${license}

## Contributing
${contribution}

## Tests 
${test}

## Questions
If you have any further questions, feel free to contact me:  
Github: github.com/${username}
Email: ${email}
`

inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers)
        answers['badges'] = renderLicenseBadge(answers.license);
        const readmeContent = generateMarkdown(answers);
        fs.writeFile('./output/README.md', readmeContent, (err) =>
        err ? console.error(err) : console.log('ReadMe successfully generated!'));
    });

//renders license badge by looping through the licenses and badges    
function renderLicenseBadge(license) {
    console.log(license);
    for (let i=0; i < options.length; i++) {
        if (license == options[i]) {
            return badgeLinks[i];
        } ;
        
    };
};