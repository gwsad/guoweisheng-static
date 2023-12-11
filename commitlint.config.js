// 暂时用不到分包功能
// import fg from 'fast-glob'
// const getPackages = (packagePath) =>
//   fg.sync('*', { cwd: packagePath, onlyDirectories: true })

const scopes = [
  'docs',
  'play',
  'project',
  'core',
  'style',
  'ci',
  'dev',
  'deploy',
  'other',
  'typography',
  'color',
  'border',
  'var',
  'ssr',
]

module.exports = {
  rules: {
    'scope-enum': [2, 'always', scopes],
    // 限制提交消息的主体（body）尾部（footer）部分是否需要空行。
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    // 限制提交消息的头部长度为 72
    'header-max-length': [2, 'always', 72],
    // 限制提交消息的范围
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      1,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    // 限制提交消息的主题不能为空
    'subject-empty': [2, 'never'],
    // 限制提交消息的主题必须以一个句号结尾。
    'subject-full-stop': [2, 'never', '.'],
    // 限制提交消息的类型的大小写。
    'type-case': [2, 'always', 'lower-case'],
    // 限制提交消息的类型不能为空。
    'type-empty': [2, 'never'],
    /**
     * 提交消息的类型（Type）必须是一个预定义的枚举值列表
     */
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建
        'docs', // 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
        'feat', // 新增 feature
        'fix', // 修复 bug
        'perf', // 优化相关，比如提升性能、体验
        'refactor', // 代码重构，没有加新功能或者修复 bug
        'revert', // 回滚到上一个版本
        'release',
        'style', // 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
        'test' // 测试用例，包括单元测试、集成测试等
      ],
    ],
  },
  prompt: {
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false
  },
}
