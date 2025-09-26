interface Conversation {
  id?: number;
  title: string;
  participants: User[];
  owner: User;
}

interface Message {
  id?: number;
  content: string;
  conversation_id: number;
  sender: User;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export type { Conversation, Message, User };
