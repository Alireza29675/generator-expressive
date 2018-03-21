'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const finalMessage = (dist) => chalk`
*-------------------------------------*
|                                     |
|  {cyan Expressive} installed successfuly!  |
|  {gray you can start using by running:}    |
|                                     |
|  {bgCyan.black  ${''.padEnd(31, ' ')} }  |
|  {bgCyan.black  ${(' cd ' + dist + '/').padEnd(31, ' ')} }  |
|  {bgCyan.black  ${(' npm install').padEnd(31, ' ')} }  |
|  {bgCyan.black  ${(' npm run bundle').padEnd(31, ' ')} }  |
|  {bgCyan.black  ${(' npm start').padEnd(31, ' ')} }  |
|  {bgCyan.black  ${''.padEnd(31, ' ')} }  |
|                                     |
*-------------------------------------*
`

module.exports = class extends Generator {

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('expressive')} generator!`)
    );

    const prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'What is your project name?',
        default : this.appname
      }, {
        type    : 'input',
        name    : 'description',
        message : 'What is your project description?',
      }, {
        type    : 'input',
        name    : 'author',
        message : 'What is the author\'s name?',
      }, {
        type    : 'checkbox',
        name    : 'technologies',
        message : 'What technologies do you want to use?',
        choices: [{
          name: 'Sass',
          value: 'withSass',
          checked: true
        }, {
          name: 'React.js',
          value: 'withReact',
          checked: true
        }, {
          name: 'Socket.io',
          value: 'withSocket',
          checked: true
        }, {
          name: 'Mongoose (MongoDB + ORM)',
          value: 'withMongoose',
          checked: true
        }]
      }
    ];

    return this.prompt(prompts).then(props => {
      props.withSass = props.technologies.includes('withSass')
      props.withReact = props.technologies.includes('withReact')
      props.withSocket = props.technologies.includes('withSocket')
      props.withMongoose = props.technologies.includes('withMongoose')
      props.year = (new Date()).getFullYear();
      props.packageName = props.name.toLowerCase().split(' ').join('-');
      props.dist = props.name === this.appname ? '.' : props.name;
      this.props = props;
    });
  }

  writing() {

    this.fs.copyTpl(
      this.templatePath('basic/'),
      this.destinationPath(`${this.props.dist}/`),
      this.props
    );

    if (this.props.withReact) {
      this.fs.copyTpl(
        this.templatePath('withReact/'),
        this.destinationPath(`${this.props.dist}/`),
        this.props
      );
    }

    if (this.props.withSass) {
      this.fs.copyTpl(
        this.templatePath('withSass/'),
        this.destinationPath(`${this.props.dist}/`),
        this.props
      );
    }

    if (this.props.withSocket) {
      this.fs.copyTpl(
        this.templatePath('withSocket/'),
        this.destinationPath(`${this.props.dist}/`),
        this.props
      );
    }

    if (this.props.withMongoose) {
      this.fs.copyTpl(
        this.templatePath('withMongoose/'),
        this.destinationPath(`${this.props.dist}/`),
        this.props
      );
    }

    setTimeout(() => {
      this.log(finalMessage(this.props.dist))
    }, 200)

  }

};
