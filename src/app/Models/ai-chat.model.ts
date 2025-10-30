export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiResponse {
  content: string;
}
