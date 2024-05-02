const chats = [
  {
    id: 1,
    title: "Chat 1",
    messages: [
      {
        id: 1,
        text: "Hello from Chat 1",
        createdAt: new Date(),
        user: {
          id: 1,
          name: "User 1",
          avatar: "./Assets/Images/Profile.jpg",
        },
      },
      {
        id: 2,
        text: "Hi from Chat 1",
        createdAt: new Date(),
        user: {
          id: 2,
          name: "User 2",
          avatar: "./Assets/Images/Profile.jpg",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Chat 2",
    messages: [
      {
        id: 1,
        text: "Hello from Chat 2",
        createdAt: new Date(),
        user: {
          id: 1,
          name: "User 1",
          avatar: "./Assets/Images/Profile.jpg",
        },
      },
      {
        id: 2,
        text: "Hi from Chat 2",
        createdAt: new Date(),
        user: {
          id: 2,
          name: "User 2",
          avatar: "./Assets/Images/Profile.jpg",
        },
      },
    ],
  },
];
export default chats;
