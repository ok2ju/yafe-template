module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  'subject-case': [2, 'always', ['pascal-case', 'sentence-case', 'start-case']]
}
