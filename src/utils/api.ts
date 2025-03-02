import axios from 'axios';
import config from '../../config.json';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Import Firestore instance

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  const { data } = await axios.get(config.readmeUrl);
  return data;
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuote = async () => {
  const { data } = await axios.get('https://api.quotable.io/random');
  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};

export const leaveMessage = async (message: string) => {
  try {
    // Add text to Firestore collection "entries"
    await addDoc(collection(db, 'message'), {
      message: message,
      timestamp: new Date(),
    });
    console.log("Text appended to Firestore!");
    return 'Message submitted successfully';
  } catch (error) {
    console.log(error.message);
    return `Ops, something goes wrong.`;
  }
};
