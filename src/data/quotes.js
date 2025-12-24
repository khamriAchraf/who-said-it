export const people = ["Trump", "Kanye", "Hitler"];

export const quotes = [
  {
    id: 1,
    text: "Let's put her with a rifle standing there with nine barrels shooting at her, let's see how she feels about it. You know, when the guns are trained on her face.",
    correctAuthor: "Trump",
  },
  {
    id: 2,
    text: "Slavery was a choice.",
    correctAuthor: "Kanye",
  },
  {
    id: 3,
    text: "I think there's blame on both sides. You had some very bad people in that group, but you also had people that were very fine people, on both sides.",
    correctAuthor: "Trump",
  },
  {
    id: 4,
    text: "The press is the enemy of the people.",
    correctAuthor: "Trump",
  },
  {
    id: 5,
    text: "I think I am a god.",
    correctAuthor: "Kanye",
  },
  {
    id: 6,
    text: "I am a nationalist.",
    correctAuthor: "Trump",
  },
  {
    id: 7,
    text: "If you wish the sympathy of the broad masses, you must tell them the crudest and most stupid things.",
    correctAuthor: "Hitler",
  },
  {
    id: 8,
    text: "Let me control the textbooks, and I will control the state.",
    correctAuthor: "Hitler",
  },
  {
    id: 9,
    text: "Nothing drives people harder than a fear of sudden death.",
    correctAuthor: "Hitler",
  },
  {
    id: 10,
    text: "If you dont like a Rule. Just Follow it. Reach on the Top. and Change the Rule.",
    correctAuthor: "Hitler",
  },
  {
    id: 11,
    text: "What luck, for governments, that the people are stupid!",
    correctAuthor: "Hitler",
  },
  {
    id: 12,
    text: "A woman must be a cute, cuddly, naive little thing - tender, sweet, and stupid.",
    correctAuthor: "Hitler",
  },
  {
    id: 13,
    text: "I could stand in the middle Fifth Avenue and shoot somebody, and I wouldn't lose any voters.",
    correctAuthor: "Trump",
  },
  {
    id: 14,
    text: "Torture works.",
    correctAuthor: "Trump",
  },
  {
    id: 15,
    text: "When somebody challenges you, fight back. Be brutal.",
    correctAuthor: "Trump",
  },
  {
    id: 16,
    text: "I have a great body. I really do.",
    correctAuthor: "Trump",
  },
  {
    id: 17,
    text: "They are evil people, the press, the media, they are bad people",
    correctAuthor: "Trump",
  },
  {
    id: 18,
    text: "I am a proud nonreader of books.",
    correctAuthor: "Kanye",
  },
  {
    id: 19,
    text: "I don’t care about what people think, because people don’t think.",
    correctAuthor: "Trump",
  },
  {
    id: 20,
    text: "Fat bitches are sex offenders, I see them, and I'm sexually offended",
    correctAuthor: "Kanye",
  },
  {
    id: 17,
    text: "Heil Hitler",
    correctAuthor: "Kanye",
  },
];



export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
