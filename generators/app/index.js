'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
        type    : 'confirm',
        name    : 'withSass',
        message : 'Would you like to initialize Sass?',
        default : true
      }, {
        type    : 'confirm',
        name    : 'withReact',
        message : 'Would you like to initialize React.js?',
        default : true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.dist = props.name === this.appname ? '.' : props.name;
      this.props = props;
    });
  }

  writing() {

    let templatePath = 'basic/';

    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(`${this.props.dist}/`),
      this.props
    );
  }

};
