const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  // 这个方法需要做的就是查看数据库label表中有无对应的label, 如果没有需要对其进行创建
  // 然后将这些标签保存到ctx中的某个属性中
  // 注意这里传递的应该包含的信息处理label的名称外, 还需要将其在表中的id传递过去
  // 无论它是否在表中, 都能获取对应的id
  // 这样在下一个添加动态的中间件中可以直接使用添加
  
  // 1. 获取用户传入的label信息, 这里的labels是一个数组
  const { labels } = ctx.request.body;
  // 2. 判断每一个标签在label表中是否存在
  const newLabels = [];
  for (const name of labels) {
    const labelResult = await labelService.getLabelByName(name);
    const label = { name };
    if (!labelResult) {
      // 如果查询不到, 需要在表中创建数据
      const result = labelService.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels;
  await next()
}



module.exports = {
  verifyLabelExists
}