import { getBot } from './getBot';
import { GrammyError, HttpError, Keyboard, InputFile } from 'grammy';
const bot = getBot();

if (!bot) throw new Error("Bot not found!");


bot.api.setMyCommands([
  // { command: 'get_id', description: 'Get your id' },
  // { command: 'hello', description: "Получить приветствие " },
  // { command: 'say_hello', description: "Получить приветствие 2" },
])

// bot.command('start', async (ctx) => {
//   await ctx.reply("Privet Mir!");
// })
// bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {
//   await ctx.reply("Hello");
// })

// bot.on(':voice', async ctx => {
//   console.log('ctx.message', ctx.message)
//   await ctx.reply('Voice')
// })
//
// bot.on(['::url', ':media'], async ctx => {
//   await ctx.reply('url')
// })
//
// bot.on('::mention', async ctx => {
//   await ctx.reply('mention')
// })
//
// bot.on(':sticker', async ctx => {
//   await ctx.reply('Sticker')
// })
// bot.on('msg').filter((ctx) => {
//   return !!ctx?.from?.is_premium;
// }, async (ctx) => {
//   await ctx.reply('Premium')
// })

// bot.hears(['ping', 'pink'],  async (ctx) => {
//   await ctx.reply('pong')
// })
//
// bot.hears(/пипец/,  async (ctx) => {
//   await ctx.reply('Незя')
// })


// bot.command('get_id', async (ctx) => {
//   await ctx.react('⚡')
//   await ctx.reply(`
//   ${ctx.me.username}.
//   id: <strong>${ctx.me.id}</strong>`,
//     {
//       parse_mode: 'HTML',
//       reply_parameters: { message_id: ctx.msg?.message_id },
//     });
// })

bot.hears(['🇻🇳', 'вьетнам', 'ветнам', 'гудморнинг'], async (ctx) => {
  await ctx.replyWithAudio(new InputFile('./src/assets/vtnm.mp3'), {
    reply_parameters: { message_id: ctx.msg?.message_id },
  })
})


// bot.command('mood', async ctx => {
//   const keyboard = new Keyboard();
//   keyboard.text('Good').resized();
//   keyboard.text('Not Bed');
//   keyboard.text('Bad')
//   await ctx.reply(`Шо ты?`, {
//     reply_markup: keyboard,
//   })
// })

bot.command('mood', async ctx => {
  const keyboard = new Keyboard();
  const buttons = ['Хорошо', "Норм", "Плохо"];
  buttons.map((b) => [keyboard.text(b).resized()]);
  await ctx.reply(`Шо ты?`, {
    reply_markup: keyboard,
    reply_parameters: { message_id: ctx.msg?.message_id },
  })
})

bot.hears('Хорошо', async (ctx) => {
  await ctx.reply('🍓', {
    reply_markup: {
      remove_keyboard: true
    }
  })
})


bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error with handling update ${ctx.update.update_id}`)
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error(`Error in request:`, e);
  } else if (e instanceof HttpError) {
    console.error(`Could not contact Telegram`, e);
  } else {
    console.error(`Unknown error: ${e}`);
  }
})

bot.start()