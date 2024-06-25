import { Bot } from 'grammy';
import {config} from 'dotenv';


export const getBot = () => {
  try {
    const {parsed, error} = config();
    if (error) {
      throw new Error('Ошибка при поиске ключа')
    }
    if (!parsed || !parsed['BOT_KEY']) {
      throw new Error('Ошибка при получении ключа')
    }
    const apiKey = parsed['BOT_KEY'];
    return new Bot(apiKey);
  } catch (error) {
    console.error(error);
  }
}
