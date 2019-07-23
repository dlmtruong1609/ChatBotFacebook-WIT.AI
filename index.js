const restify = require('restify');
const Message = require('./message')
const server = restify.createServer({
  name: 'Kimi',
  version: '1.0.0'
});

const token = '123456'

const bot = new Message('EAAMXUrZANC4oBAPwmOLW5ZBdKBOu2zjRdmCI9DBKLUQ1tYBkKnZAitLTspj0eZBQ138U3cqcBqCwL333bZBtExzezwWELLZCK5BafwkejOhZAZCPwH9Ud8ilSumDVmuFHJPjhsCp9WrgCfoaZAfZAdUye4rv7vgHYkBAfqCpU2zsZAovwmRdCp9gviz');

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/', (req, res, next) => {
    if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === token) {
      res.end(req.query['hub.challenge'])
    } else {
      next();
    }
})

function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

server.post('/', (req, res, next) => {

  const response = req.body

  const greeting = firstEntity(response.entry[0].messaging[0].message.nlp, 'greetings');
  const doraemon = firstEntity(response.entry[0].messaging[0].message.nlp, 'doraemon');
  if(response.object === 'page') {
    const messageObj = bot.getMessageObj(response)
    if (greeting && greeting.confidence > 0.8) {
      bot.sendText('Xin chào. Tôi có thể giúp gì cho bạn?', messageObj.id)
    } else if (doraemon && doraemon.confidence > 0.8) {
      bot.sendText('Doraemon là 1 chú mèo máy thông minh',  messageObj.id)
    } else {
      bot.sendText('Xin lỗi tôi không hiểu :(', messageObj.id)
    }
  }
  res.send(200)
})
server.listen(3000, function () {
  console.log('localhost:3000');
});
module.exports = server;
