import OpenAI from "openai";
import readlineSync from 'readline-sync';
import colors from 'colors';

const openai = new OpenAI();

async function main() {
  //const username = readlineSync.question('May I have your name?');
  //console.log(`Hello ${username}`);
  //console.log(colors.bold.bgGreen('Newsest'));
  const chatHistory = [];


  while (true) {
    const userInput = readlineSync.question(colors.yellow('you: '))
  
    try {
      const messages = chatHistory.map(([role, content]) => ({
        role, 
        content
      }));

      // Add lates user input
      messages.push({ role: 'user', content: userInput});

      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
      });
      
      if(userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ') + completion.choices[0].message.content);
      }
        
      console.log(colors.green('Bot: ') + completion.choices[0].message.content);
      chatHistory.push([ 'user', userInput]);
      chatHistory.push([ 'assistant', completion.choices[0].message.content]);

    } catch (error) {
      console.error(colors.red(error));
    }
  } 
}

main();