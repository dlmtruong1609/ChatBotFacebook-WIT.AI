const restify = require('restify')
const Message = require('./message')
const dataFile = require('./data.json')
const server = restify.createServer({
  name: 'Doraemon',
  version: '1.0.0'
});
const token = '123456'

const bot = new Message('EAAMXUrZANC4oBAPAMxnHNbMiBvORYPBWpZCwd4GMwuXoTA5RvyR2mY5cfx31xwL9UmrxXhpIpZCLUyKnkUBYquqOtXgdivxABOpoxx9Lu1gwZASrx1xQYvy9ZB6IikWgsNzryszOqpLLOIkEdqDOgmZA7sQCxBG1r6GfFsIZAPur4B94I3iFNVY');

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

let nameAnswer = (i) => {
  return dataFile.nameAnswer[i]
}

let  oopsAnswer = (i) => {
  return dataFile.oops[i];
}

let birthdayAnswer = (i) => {
  return dataFile.birthday[i]
}

let flashlightzoomAnswer = (i) => {
  return dataFile.flashlightzoom[i]
}
let objects;
server.post('/', (req, res, next) => {

  const response = req.body

  const message = response.entry[0].messaging[0].message.text
  // random answer
  let i = Math.floor(3*Math.random())
  const greeting = firstEntity(response.entry[0].messaging[0].message.nlp, 'greetings');
  const intent = firstEntity(response.entry[0].messaging[0].message.nlp, 'intent');
  const name = firstEntity(response.entry[0].messaging[0].message.nlp, 'name');
  const key = firstEntity(response.entry[0].messaging[0].message.nlp, 'key');
  const object = firstEntity(response.entry[0].messaging[0].message.nlp, 'object');
  if (object) {
    objects = object.value
  }
  if(response.object === 'page') {
    const messageObj = bot.getMessageObj(response)
    if (intent && intent.value === "greetings") {
      bot.sendText('Xin chào. Bạn tên gì?', messageObj.id)
    } else if (intent && intent.value === "introduce" && name) {
      bot.sendText(`Chào ${name.value}, Ở đây mình có 2 sản phẩm đang bán là đèn pin phóng to và cánh cửa thần kỳ đó bạn \nBạn có câu hỏi gì không? \n- Bảo hành\n- Giá\n- hướng dẫn sử dụng `,  messageObj.id)
    } else if (objects === 'đèn pin phóng to') { // chiều sâu
        if (intent && intent.value === 'what') {
          bot.sendText("Đèn pin phóng to là bảo bối giúp bạn phóng to đồ vật như mong muốn", messageObj.id)
        } else if (intent && intent.value === 'askaboutlightvalue') {
          bot.sendText("Đèn pin giá 100 ngàn đồng nha, quá rẻ phải không nè :))", messageObj.id)
        } else if (intent && intent.value === "ability") {
          bot.sendText("To không giới hạn nha, muốn to bao nhiêu là to bấy nhiêu", messageObj.id)
        } else if (intent && intent.value === "warranty") {
          bot.sendText("Bảo hành mãi mãi trọn đời nha, khi nào cần bảo hành cứ gọi 1900 100 có :)", messageObj.id)
        } else {
          bot.sendText(oopsAnswer(i), messageObj.id)
        }
    } else if (objects === 'Cánh cửa thần kỳ') { // chiều sâu
        if (intent && intent.value === 'what') {
          bot.sendText("Cánh cửa thần kỳ là 1 trong những bảo bối của thế kỷ 22, giúp bạn đi đến bất cứ đâu trên trái đất", messageObj.id)
        } else if (intent && intent.value === 'askaboutlightvalue') {
          bot.sendText("Cửa thần kỳ này giá 500 ngàn đồng nha", messageObj.id)
        } else if (intent && intent.value === "ability") {
          bot.sendText("Có thể đi tới bất cứ đâu trên thế giới nha, không ra được vũ trụ thôi và giới hạn thời gian là không quá 1 tỷ năm về quá khứ và tới tương lai 😅", messageObj.id)
        } else if (intent && intent.value === "warranty") {
          bot.sendText("Bảo hành với cửa thần kỳ cũng mãi mãi trọn đời nha, khi nào cần bảo hành cứ gọi 1900 100 có :)", messageObj.id)
        } else {
          bot.sendText(oopsAnswer(i), messageObj.id)
        }
    } else if (objects === 'Ngôn ngữ tự nhiên') { // chiều sâu
      if (intent && intent.value === 'what') {
        bot.sendText("Ngôn ngữ tự nhiên là bất kỳ ngôn ngữ nào phát sinh, không suy nghĩ trước trong não bộ của con người. Điển hình là một số ngôn ngữ mà con người được sử dụng để giao tiếp với nhau, dù là ngôn ngữ âm thanh, ngôn ngữ ký hiệu, ký hiệu xúc giác hay chữ viết.", messageObj.id)
      } else {
        bot.sendText(oopsAnswer(i), messageObj.id)
      }
    } else if (objects === 'Xử lý ngôn ngữ tự nhiên') { // chiều sâu
      if (intent && intent.value === 'what') {
        bot.sendText("NLP là khái niệm để chỉ các kĩ thuật, phương pháp thao tác trên ngôn ngữ tự nhiên bằng máy tính.", messageObj.id)
        bot.sendText("Nó là một lĩnh vực đặc biệt, là sự kết hợp giữa các ngành khoa học máy tính, trí tuệ nhân tạo và ngôn ngữ học", messageObj.id)
      } else if (intent && intent.value ==='ability') {
        bot.sendText("- Spell checking\n- Finding Synonyms\n- Classifying (Positive – Negative)\n- Machine translation\n- Spoken dialog systems (IoT)\n- Question Answering (Chatbot)\n- Speech Recognition", messageObj.id)
      } else {
        bot.sendText(oopsAnswer(i), messageObj.id)
      }
    } else if (intent && intent.value === "list") {
      bot.sendText("- Đèn pin phóng to\n- Cánh cửa thần kỳ", messageObj.id)
    } else {
      bot.sendText(oopsAnswer(i), messageObj.id)
    }
  }
  res.send(200)
})
server.listen(3000, function () {
  console.log('localhost:3000');
});
module.exports = server;
